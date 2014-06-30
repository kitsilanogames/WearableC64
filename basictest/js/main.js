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
	initJoystick ();
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
		$('#load_btn').hide('slow');
		jsc64.loadPrg('roms/COLOURGALAGA.PRG');
	});
}
