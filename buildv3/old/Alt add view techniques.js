PortfolioApp.Dimension1Route = Em.Route.extend({
	containerView: null,
	init: function() { 
		this._super(); 
		//ModelS: Appllication State of router
		//
	},
	model:function() {
		if (!PortfolioApp.dimension1Model) PortfolioApp.dimension1Model = PortfolioApp.Dimension1Model.create();
		return PortfolioApp.dimension1Model;
	},
	activate: function() { 	
		containerView = Ember.ContainerView.create().appendTo('.portfolio-app-container');
		//Start session
		//...nothing ATM
	},
	deactivate: function() { 	  
		if (containerView) containerView.removeAllChildren();
		this.scriptSubtitleController.destroy();
		this.scriptModel.destroy();
		PortfolioApp.set('scriptModel', null);
	},
	setupController: function(controller, model) { 
		controller.set('content', model);
	},
	renderTemplate: function() {
		//UI
		if (true) {
			this.render('dimension1');
	
		} else if (true) {
			if (!PortfolioApp.get('scriptModel')) 
				this.scriptModel = PortfolioApp.ScriptModel.create({});
			PortfolioApp.set('scriptModel', this.scriptModel);
				
			this.scriptSubtitleController = PortfolioApp.ScriptSubtitleController.create({ 	content:this.scriptModel 	});
			this.render('dimension1'); 
			this.render('script-subtitle', 	{  into:'dimension1', outlet: 'oscriptsubtitle', controller:this.scriptSubtitleController});
			this.render('d1-btn', 			{  into:'dimension1', outlet: 'od1btn'});
			//Ember.bind(this.get('controller'), 'boundScript', 'PortfolioApp.scriptModel.script').connect(this);
			
		} else {
			//UI: Controllers
			var scriptSubtitleController = PortfolioApp.ScriptSubtitleController.create({ 	content:this.scriptModel 	});	
			//UI: Views
			containerView.pushObject( PortfolioApp.ScriptSubtitleView.create({ controller:scriptSubtitleController }) );
			containerView.pushObject( PortfolioApp.D1BtnView.create() );

		}
	},
	events:{
		InsertViewDone: function(achildview, another) {
			console.log('didInsertView event')
			if ('ScriptSubtitle' == achildview.name) {
				console.log('dynamic bind', this.scriptModel)
				achildview.get('controller').set('content', PortfolioApp.ScriptModel.create({}))
				//Ember.bind(achildview.get('controller'), 'script', 'PortfolioApp.scriptModel.script').connect(achildview);
			}
		}
	}
})