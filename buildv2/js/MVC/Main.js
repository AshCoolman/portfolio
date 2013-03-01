(function($){
	var $root=$('.container'),
		me = { 
		MVCFiles: [
			'js/MVC/AutoRouter.js',
			'js/MVC/CONTROLLER/WaveplayerCONTROLLER.js',
			'js/MVC/MODEL/AudioMODEL.js',
			'js/MVC/VIEW/StartBtnVIEW.js',
			'js/MVC/MODEL/WaveformMODEL.js'
		]
	},
	methods = {
		startMVC: function() {
			console.info('Main.js> startMVC()')
			var wavePlayerCONTROLLER = new WavePlayerCONTROLLER({el:$('.container')[0]});
			var waveformMODEL = new WaveformMODEL({el:$('.container')[0]});
			waveformMODEL.set({'mediaFile':'sound/heartbeat.wav'});
			var startBtnVIEW = new StartBtnVIEW({ el: $root, waveformMODEL: waveformMODEL})
		},
		tryStartMVC: function() {
			console.info('Main.js > tryStartMVC()', me.MVCFiles.length)
		if (me.MVCFiles.length == 0 ) {
				me.methods.startMVC();
			}
		}
	};
	
	me.methods = methods;

	for (var c = 0; c < me.MVCFiles.length; c++) {
		(function(aclassName, aMVCFiles, acompleteFunc) {
			$.getScript(aclassName)
			.done(function(script, text){
				console.log('Main.js> Javascript $.getScript().done() > ', aclassName);
				aMVCFiles.splice(aMVCFiles.indexOf(aclassName), 1);
				acompleteFunc();
			})
			.fail(function(jqxhr, settings, exception) {
				console.error('$.getScript().fail() > ', jqxhr, settings, exception);
			})
		})(''+me.MVCFiles[c], me.MVCFiles, me.methods.tryStartMVC);
	}
})(jQuery);





