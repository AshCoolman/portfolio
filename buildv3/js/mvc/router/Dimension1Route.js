PortfolioApp.Dimension1Route = Em.Route.extend({
	containerView: null,
	activate: function() { 	
		containerView = Ember.ContainerView.create().appendTo('.portfolio-app-container');
		scriptModel = PortfolioApp.scriptModel = PortfolioApp.ScriptModel.create({});
	},
	deactivate: function() { 	  
		containerView.removeAllChildren().remove();
		scriptModel.destroy();
	},
	setupController: function(controller, model) { 
		controller.set('content', model);
	},
	renderTemplate: function() {
		
		
		//MODELS: Appllication State
		//Create Heatbeat Model
		//Create Script Model
		scriptModel = PortfolioApp.scriptModel =PortfolioApp.ScriptModel.create({});
		//this.setupController(this.controller, scriptModel);
		//UI
		if (true) {
			this.render('dimension1'); 
		} else {
			//UI: Controllers

			
			var scriptSubtitleController = PortfolioApp.ScriptSubtitleController.create({ 	content:scriptModel 	});	
			
			//UI: Views
			containerView.pushObject( PortfolioApp.ScriptSubtitleView.create({ controller:scriptSubtitleController }) );
			containerView.pushObject( PortfolioApp.D1BtnView.create() );

			//Create heartbeatSound VC
			//Create heartbeatPulse VC
			//Create ScriptSubtitle VC

			//Start session
			//heartbeatModel.
		}
	},
	events: {
		didInsertView: function(view) {
			if ('ScriptSubtitle' == view.name) {
				view.get('controller').set('content', scriptModel)
				Ember.bind(view.get('controller'), 'subtitleText', 'PortfolioApp.scriptModel.subtitleText').connect(this);
			}
		}
	}
})