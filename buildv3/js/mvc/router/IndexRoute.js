PortfolioApp.IndexRoute = Em.Route.extend({
	connectOutlets: function(router) {
		console.log('indexRoute connectOutlets()')
		router.get('portfolioAppController')
		
		PortfolioApp.waveformMODEL = PortfolioApp.WaveformMODEL.create({ 
			mediaFile: 'sound/heartbeat.wav' });
			
		PortfolioApp.startBtnCONTROLLER = PortfolioApp.StartBtnCONTROLLER.create({
			content: PortfolioApp.waveformMODEL});
			
		PortfolioApp.startBtnVIEW = PortfolioApp.StartBtnVIEW.create({
			name:'start-btn', 
			templateName:'start-btn-template', 
			controller:PortfolioApp.startBtnCONTROLLER});
			
		PortfolioApp.startBtnVIEW.appendTo('.container');
	}
})