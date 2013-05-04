App.Dimension3Route = Em.Route.extend({ 
	init: function () {
		this._super();
	},
	model: function () {
		return (App.dimension3Model) ? App.dimension3Model : App.Dimension3Model.create();
	},
	activate: function () { 
		//Application state 
	},
	deactivate: function () { 
	},
	setupController: function (controller, model) {
		controller.set('content', model);
	},
	renderTemplate: function () {
		if ( App.static_preloader.isLoaded ) {
			this.render('dimension3');
		} else {
			App.eventMapper.addEventListener('preloaderIsLoaded', this, function(me){
				return function() {
					me.renderTemplate();
				}
			}(this));
		}
	},
	
	events: {
		
		SmartController_didInsertElement: function(acontroller, alabel) {
			switch (alabel) {
				case 'World3dController': this.world2dController = acontroller;  break;
				
				default: /* console.log('++'+alabel);*/ break;
			}	
			



		}
	}
})