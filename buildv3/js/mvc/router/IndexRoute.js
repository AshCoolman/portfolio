PortfolioApp.IndexRoute = Em.Route.extend({
	activate: function() { 	
		destroys=[];
		destroyEls=[];
	},
	deactivate: function() { 
		for (var de=0; de<destroyEls.length; de++) 	destroyEls[de].destroyElement();
		for (var d=0; d<destroys.length; d++) destroys[d].destroy();
		destroys=[];
		destroyEls=[];
	},
	renderTemplate: function() { 
		this.render('index');
		/*
		
		audioController = destroys[destroys.length] = PortfolioApp.AudioController.create({content:[]});
		audioView = destroys[destroys.length] = destroyEls[destroyEls.length] = PortfolioApp.AudioView.create({
			name:'audio-template',
			controller: audioController,
			src: 'sound/heartbeat.wav'
		}).appendTo('.portfolio-app-container');
                                                                                                                   
		startBtnController = destroys[destroys.length] = PortfolioApp.StartBtnController.create({});
		startButton = destroys[destroys.length] = destroyEls[destroyEls.length] = PortfolioApp.StartBtnView.create({
			name:'start-btn', 
			controller: startBtnController
		}).appendTo('.portfolio-app-container');
		*/
		

	}
})
