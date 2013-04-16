App.Dimension1Route = Em.Route.extend({
	containerView: null,
	init: function() { 
		this._super(); 
		//ModelS: Appllication State of router
		//
	},
	model:function() {
		if (!App.dimension1Model) App.dimension1Model = App.Dimension1Model.create();
		return App.dimension1Model;
	},
	activate: function() { 	
		containerView = Ember.ContainerView.create().appendTo('.app-container');
		//Start session
		//...nothing ATM
	},
	deactivate: function() { 	  
		if (containerView) containerView.removeAllChildren();
		this.scriptSubtitleController.destroy();
		this.scriptModel.destroy();
		App.set('scriptModel', null);
	},
	setupController: function(controller, model) { 
		controller.set('content', model);
	},
	renderTemplate: function() {
		//UI
		if (true) {
			this.render('dimension1');
	
		} else if (true) {
			if (!App.get('scriptModel')) 
				this.scriptModel = App.ScriptModel.create({});
			App.set('scriptModel', this.scriptModel);
				
			this.scriptSubtitleController = App.ScriptSubtitleController.create({ 	content:this.scriptModel 	});
			this.render('dimension1'); 
			this.render('script-subtitle', 	{  into:'dimension1', outlet: 'oscriptsubtitle', controller:this.scriptSubtitleController});
			this.render('d1-btn', 			{  into:'dimension1', outlet: 'od1btn'});
			//Ember.bind(this.get('controller'), 'boundScript', 'App.scriptModel.script').connect(this);
			
		} else {
			//UI: Controllers
			var scriptSubtitleController = App.ScriptSubtitleController.create({ 	content:this.scriptModel 	});	
			//UI: Views
			containerView.pushObject( App.ScriptSubtitleView.create({ controller:scriptSubtitleController }) );
			containerView.pushObject( App.D1BtnView.create() );

		}
	},
	events:{
		InsertViewDone: function(achildview, another) {
			console.log('didInsertView event')
			if ('ScriptSubtitle' == achildview.name) {
				console.log('dynamic bind', this.scriptModel)
				achildview.get('controller').set('content', App.ScriptModel.create({}))
				//Ember.bind(achildview.get('controller'), 'script', 'App.scriptModel.script').connect(achildview);
			}
		}
	}
})