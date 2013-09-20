App.Dimension3Route = App.SmartRoute.extend({ 
	activate: function () {
		this._super();
		this.addEvents({

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

			doRotateQuestionMarkHint: function () {
				console.log('ROTATE TIME HINT');
				this.world3dController.doRotateQuestionMarkHint();
			},



			doRotateQuestionMark: function () {
				console.log('ROTATE TIME');
				this.world3dController.doQuestionMarkRotate();
			},


			doQuestionMarkRotateDone: function () {
				this.subtitle1Controller.doRemoveClicked();
		        this.subtitle2Controller.startReading();
			}
		});
	},
	model: function () {
		return (App.dimension3Model) ? App.dimension3Model : App.Dimension3Model.create();
	},
	deactivate: function () {  
		this._super();
		this.world3dController = null;
		this.subtitle1Controller = null;
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
	

	tryStart: function () {
        if (!this.get('isStarted') && /*this.world3dController && */this.subtitle1Controller && this.subtitle2Controller) {
			this.set('isStarted', true);
			this.doStart();
        }

    },
	doStart: function (type, data) {
        this.subtitle1Controller.startReading();
    }
})