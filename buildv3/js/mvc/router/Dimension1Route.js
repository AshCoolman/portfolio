PortfolioApp.Dimension1Route = Em.Route.extend({
	model:function() { return []; },
	activate: function() { 	},
	deactivate: function() { 	console.log('deactivate Dimension') },
	setupController: function(controller, model) {
		console.log('setupController', controller)
	},
	renderTemplate: function() {
		
		this.render('dimension1');
		//Appllication State: Models
		//Create Heatbeat Model
		
		//Create Script Model
		/*
		var scriptModel = PortfolioApp.scriptModel =PortfolioApp.ScriptModel.create({});
		*/

		//UI: Controllers
		/*
		var scriptSubtitleController = PortfolioApp.ScriptSubtitleController.create({ 	model:scriptModel 	});	
		Ember.bind(scriptSubtitleController, 'subtitleText', 'PortfolioApp.scriptModel.subtitleText').connect(this);
		*/
		
		//UI: Views
		/*
		var scriptSubtitleView = PortfolioApp.ScriptSubtitleView.create({ controller:scriptSubtitleController }).appendTo('.portfolio-app-container');
		*/
		
		//Create heartbeatSound VC
		//Create heartbeatPulse VC
		//Create ScriptSubtitle VC

		//Start session
		//heartbeatModel.
		
		
	}
})