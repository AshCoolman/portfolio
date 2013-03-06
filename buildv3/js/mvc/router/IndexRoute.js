PortfolioApp.IndexRoute = Em.Route.extend({
	model:function() { return []; },
	activate: function() { 	},
	render: function() { },
	renderTemplate: function() {
		
		var waveformModel = PortfolioApp.WaveformMODEL.create({ mediaFile: 'sound/heartbeat.wav' });
		var startBtnController = PortfolioApp.StartBtnCONTROLLER.create({ 	content: waveformModel });

		PortfolioApp.StartBtnVIEW.create({
			name:'start-btn', 
			controller: startBtnController
		}).appendTo('.portfolio-app-container');
		

		

	}
})
