(function($){
	
	var startMVC = function() {
		console.info('startMVC()')
		var wavePlayerCONTROLLER = new WavePlayerCONTROLLER();
		var waveformMODEL = new WaveformMODEL();
		waveformMODEL.set({'mediaFile':'sound/heartbeat.wav'});
		
	};
	
	var classFiles = [
		//'js/MVC/CONTROLLER/StartBtnCONTROLLER.js',
		'js/MVC/CONTROLLER/WaveplayerCONTROLLER.js',
		'js/MVC/MODEL/AudioMODEL.js',
		'js/MVC/MODEL/WaveformMODEL.js'//,
		//'js/MVC/VIEW/StartBtnVIEW.js'
	];

	var className;
	for (var c = 0; c < classFiles.length; c++) {
		className = classFiles[c];
		(function(aclassName, aclassFiles, acompleteFunc) {
			
			$.getScript(aclassName)
			.done(function(script, text){
				console.log('$.getScript().done() > ', aclassName);
				aclassFiles.splice(classFiles.indexOf(aclassName,1));
				if (aclassFiles.length == 0) {
					startMVC();
					console.log('loaded')
				}
			})
			.fail(function(jqxhr, settings, exception) {
				console.error('$.getScript().error() > ', jqxhr, settings, exception);
			})
		})(''+classFiles[c], classFiles, startMVC);

	}
	
})(jQuery);





