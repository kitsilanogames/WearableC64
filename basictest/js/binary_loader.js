
function BinaryLoader (path, callback) {
	console.log ("Reading binary file: " + path);
	
	// successfully opened file stream
	onStreamOpened = function(stream) {
		console.log(path + " opened. Bytes: " + stream.bytesAvailable);

		callback (stream.readBytes(stream.bytesAvailable));
		stream.close();
	};

	// failed to open file stream
	onStreamFailed = function(e) {
		console.error(path + " failed. Error: " + e.message);
		throw new Error ('Could not open stream: ' + e.message);
	};

	// look in the widget package
	tizen.filesystem.resolve('wgt-package', 
			function(dir) { // directory resolved
				console.log('Resolved pacakge dir');
				// find the file and open a stream
				dir.resolve(path).openStream('r', onStreamOpened, onStreamFailed, Constants.UTF8);
	}, function(e) { // could not resolve dir
		console.error('Failed to resolve pacakge dir');
		throw new Error('Failed to resolve pacakge dir');
	}, 'r');
}