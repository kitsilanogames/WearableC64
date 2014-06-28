var Constants = {
	UTF8 : "UTF-8"
};

function onTizenHwKey(e) {
	if (e.keyName != "back")
		return;

	tizen.application.getCurrentApplication().exit();
}

function init() {
	console.log("init");

	document.addEventListener('tizenhwkey', onTizenHwKey);
	initWC64();
}

function initWC64() {
	console.log("WC64 init");
	var jsc64 = $('#c64_display').jsc64($(document));
	var jsc64Instance = jsc64.jsc64GetInstance();
	var percentageComplete = 0;

	var awaitBoot = function () {
		$('#loadingProgress .progress').text(percentageComplete++);
		
		if (percentageComplete > 100) {
			$('#loadingProgress').hide('slow');
			jsc64Instance._renderer.frameTimer.detachEvent('timer', awaitBoot);		
		}
	}
	
	jsc64Instance._renderer.frameTimer.addEventListener('timer', awaitBoot);

	$('#load_btn').click(function() {
		jsc64.loadPrg('roms/RALLYSPEEDWAYII.PRG');
	});
	
	var joystickCenter = function () {
		console.log('center');
	};
	
	var joystickFire = function () {
		console.log('fire');
	};
	
	var joystickUp = function () {
		console.log('up');
	};
	
	var joystickDown = function () {
		console.log('down');
	};
	
	var joystickLeft = function () {
		console.log('left');
	};
	
	var joystickRight = function () {
		console.log('right');
	};
	
	initJoystick (joystickCenter, joystickFire, joystickLeft, joystickRight, joystickUp, joystickDown)
	
	// $('#pauseButton').click(function() {
	// jsc64.jsc64Pause();
	// });
	// $('#romList a').click(function() {
	// jsc64.loadPrg($(this).attr('href'));
	// return false;
	// });
}
