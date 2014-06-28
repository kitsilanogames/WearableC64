// http://stackoverflow.com/questions/15240946/retrieving-touchstart-coordinates-in-a-touchend-event

function onTouchCancel (ev) {
	ev.preventDefault();
	
	console.log ('touchcancel: ' + ev + ' id: ' + ev.id);
	onJoystickCentered();
}

function onTouchMove (ev) {
	ev.preventDefault();
	console.log ('touchmove: ' + ev);
}

function initJoystick (onJoystickCentered, onJoystickFire, onJoystickLeft, onJoystickRight, onJoystickUp, onJoystickDown) {
	var joystick = document.getElementById('joystick');
	if (null == joystick) throw new Error ('joystick touch area not found');
	
	joystick.addEventListener('touchmove', onTouchMove);
	joystick.addEventListener('touchcancel', onTouchCancel);
	joystick.addEventListener('click', function(ev) {
		ev.preventDefault();
		onJoystickFire();
	});
	
	console.log ('Joystick emulator initialized');	
	onJoystickCentered();
}