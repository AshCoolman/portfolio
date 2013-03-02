
console.log('PortfolioApp.IndexRoute.extend()');

PortfolioApp.IndexRoute = Em.Route.extend({
	model:function() {  console.log('PortfolioApp.IndexRoute.model()'); 	return []; },
	activate: function() { 	console.log('PortfolioApp.IndexRoute.activate()'); 	},
	render: function() { console.log('PortfolioApp.IndexRoute.render()'); },
	renderTemplate: function() { 	console.log('PortfolioApp.IndexRoute.renderTemplate()');
		/*	var controlller = App.SimpleBtnController.create({});
			var btn = App.SimpleBtnView.create({controller:controlller}).appendTo('.application-container');
			console.log('IndexRoute.renderTemplate()', btn.controller, controlller);
			*/
			
		var waveformModel = PortfolioApp.WaveformMODEL.create({ mediaFile: 'sound/heartbeat.wav' });
		
		var startBtnController = PortfolioApp.StartBtnCONTROLLER.create({ 	content: waveformModel });

		PortfolioApp.StartBtnVIEW.create({
			name:'start-btn', 
			controller: startBtnController
		}).appendTo('.portfolio-app-container');
		

		

	}
})
