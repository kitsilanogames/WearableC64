/**
 * BinFileReader.js
 * You can find more about this function at
 * http://nagoon97.com/reading-binary-files-using-ajax/
 *
 * Copyright (c) 2008 Andy G.P. Na <nagoon97@naver.com>
 * The source code is freely distributable under the terms of an MIT-style license.
 */
function BinFileReader(fileURL){

	var filePointer = 0;
	var fileSize = -1;
	var fileContents;

	this.getFileSize = function(){
		return fileSize;
	}

	this.getFilePointer = function(){
		return filePointer;
	}

	this.movePointerTo = function(iTo){
		if(iTo < 0) filePointer = 0;
		else if(iTo > this.getFileSize()) throw new Error('EOF: requested ' + iTo + ' size: ' + this.getFileSize());
		else filePointer = iTo;

		return filePointer;
	};

	this.movePointer = function(iDirection){
		this.movePointerTo(filePointer + iDirection);

		return filePointer;
	};

	this.readNumber = function(iNumBytes, iFrom){
		iNumBytes = iNumBytes || 1;
		iFrom = iFrom || filePointer;

		this.movePointerTo(iFrom + iNumBytes);

		var result = 0;
		for(var i=iFrom + iNumBytes; i>iFrom; i--){
			result = result * 256 + this.readByteAt(i-1);
		}

		return result;
	};

	this.readString = function(iNumChars, iFrom){
		iNumChars = iNumChars || 1;
		iFrom = iFrom || filePointer;

		this.movePointerTo(iFrom);

		var result = "";
		var tmpTo = iFrom + iNumChars;
		for(var i=iFrom; i<tmpTo; i++){
			result += String.fromCharCode(this.readNumber(1));
		}

		return result;
	};

	this.readUnicodeString = function(iNumChars, iFrom){
		iNumChars = iNumChars || 1;
		iFrom = iFrom || filePointer;

		this.movePointerTo(iFrom);

		var result = "";
		var tmpTo = iFrom + iNumChars*2;
		for(var i=iFrom; i<tmpTo; i+=2){
			result += String.fromCharCode(this.readNumber(2));
		}

		return result;
	};

	function BinFileReaderImpl(fileURL){
		var req = new XMLHttpRequest();

		req.open('GET', fileURL, false);

		//XHR binary charset opt by Marcus Granado 2006 [http://mgran.blogspot.com]
		req.overrideMimeType('text/plain; charset=x-user-defined');
		req.send(null);

		if (req.status != 200 && req.status != 0) {
			console.log('failing because of '+req.status);
			throw new Error ('load failed with status ' + req.status);
		}

		fileContents = req.responseText;
		fileSize = fileContents.length;

		if (0 == fileSize) throw new Error ('Empty file');
		
		this.readByteAt = function(i){
			return fileContents.charCodeAt(i) & 0xff;
		}
	}

		BinFileReaderImpl.apply(this, [fileURL]);
}