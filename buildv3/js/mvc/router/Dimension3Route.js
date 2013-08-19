App.Dimension3Route = Em.Route.extend({ 
	init: function () {
		this._super();
		this.isStarted = false;
	},
	model: function () {
		return (App.dimension3Model) ? App.dimension3Model : App.Dimension3Model.create();
	},
	activate: function () { 
		//Application state 
	},
	deactivate: function () { 
		this.subtitleController.deactivate();
		this.world3dController = null;
		this.subtitleController = null;
	},
	setupController: function (controller, model) {
		controller.set('content', model);
	},
	renderTemplate: function () {
		if ( App.static_preloader.isLoaded ) {
			this.render('dimension3');
	     	this.render("nav-list", {outlet: "nav-list"});
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
				case 'World3dController': this.world3dController = acontroller;  break;
				case 'SubtitleController': this.subtitleController = acontroller; break;
				default: /* console.log('++'+alabel);*/ break;
			}
		
			this.tryStart();	
		},
		SubtitleController_didInsertElement: function (acontroller, alabel) { }
	},
	tryStart: function () {
        if (this.world3dController && this.subtitleController) {
            this.doStart()
        }
    },
	doStart: function (type, data) {
		this.subtitleController.set('content', App.scriptModel); 
        this.subtitleController.setup(this.subtitleController.get("content").scriptD3);
        this.subtitleController.doSetupDraw();
    },
})