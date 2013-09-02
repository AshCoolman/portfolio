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
		this.subtitle1Controller.deactivate();
		this.world3dController = null;
		this.subtitle1Controller = null;
	},
	setupController: function (controller, model) {
		controller.set('content', model);
		

	},
	renderTemplate: function () {
		if ( App.PRELOADER.isLoaded ) {
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
				case 'SubtitleController': 
					switch (acontroller.get('orderRead')) {
						case '1': this.subtitle1Controller = acontroller; break;
						case '2': this.subtitle2Controller = acontroller; break;
					}
					break;
				default: /* console.log('++'+alabel);*/ break;
			}
		
			this.tryStart();	
		},
		SubtitleController_didInsertElement: function (acontroller, alabel) { },
		
		doRotateQuestionMark: function () {
			console.log('ROTATE TIME');
			this.world3dController.doQuestionMarkRotate();
		},
		
		doQuestionMarkRotateDone: function () {
			this.subtitle1Controller.doRemoveClicked();
	        this.subtitle2Controller.startReading();
		}
	},
	tryStart: function () {
        if (this.world3dController && this.subtitle1Controller && this.subtitle2Controller) {
            this.doStart()
        }
    },
	doStart: function (type, data) {
		this.subtitle1Controller.set('content', App.scriptModel); 
		this.subtitle2Controller.set('content', App.scriptModel); 
        this.subtitle1Controller.setup();
        this.subtitle2Controller.setup();

        this.subtitle1Controller.startReading();
    }
})