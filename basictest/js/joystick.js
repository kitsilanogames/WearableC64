// http://stackoverflow.com/questions/15240946/retrieving-touchstart-coordinates-in-a-touchend-event

var JoystickEvents = {
	FIRE: 32,
	LEFT: 100,
	UP: 104,
	RIGHT: 102,
	DOWN: 98,
	TRESHOLD: 5
};

var X,Y;

function onTouchStart (ev) {
	X = -1;
	Y = -1;
}

function triggerKeypress (code) {
	console.log ('joystick: ' + code);	
	var keypress = document.createEvent('KeyboardEvent');
	
	$.event.trigger({type: 'keypress', which: code});
	
//	(keypress.initKeyEvent || keypress.initKeyboardEvent)("keypress", true, true, window,
//            0, 0, 0, 0,
//            0, code) 
//	var canceled = !body.dispatchEvent(keypress);
//	if(canceled) {
//		console.log('A handler called preventDefault');
//	} 
}

function onTouchMove (ev) {
	ev.preventDefault();
	
	var touch = ev.touches.item(0);
	
	var fromX = X;
	var fromY = Y;
	
	X = touch.screenX;
	Y = touch.screenY;
	
	var distX = X - fromX;
	var distY = Y - fromY;
	console.log ('touchmove x,y: ' + distX + ', ' + distY);
	
	if (fromX >= 0) { // there was movement in the X direction
		if (distX > JoystickEvents.TRESHOLD) triggerKeypress(JoystickEvents.RIGHT);
		else if (distX < -JoystickEvents.TRESHOLD) triggerKeypress(JoystickEvents.LEFT);
	}
	
	if (fromY >= 0) { // there was movement in the Y direction
		if (distY > JoystickEvents.TRESHOLD) triggerKeypress(JoystickEvents.DOWN);
		else if (distY < -JoystickEvents.TRESHOLD) triggerKeypress(JoystickEvents.UP);
	}
}

function onClick (ev) {
	ev.preventDefault();
	triggerKeypress(JoystickEvents.FIRE);
}

function initJoystick () {
	var joystick = document.getElementById('joystick');
	if (null == joystick) throw new Error ('joystick touch area not found');
	
	joystick.addEventListener('touchmove', onTouchMove);
	joystick.addEventListener('touchstart', onTouchStart);
	joystick.addEventListener('click', onClick);
	
	console.log ('Joystick emulator initialized');	
}