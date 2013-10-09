App.Dimension3Route = App.SmartRoute.extend({ 
	activate: function () {
		this._super();
		this.addEvents({

			SmartController_didInsertElement: function(acontroller, alabel) {
				switch (alabel) {
					case 'World3dController': this.world3dController = acontroller;  break;
					case 'SubtitleController': 
						switch (acontroller.get('orderRead')) {
							case 'instruction': this.subtitleInstructionController = acontroller; break;
							case 'heading': this.subtitleHeadingController = acontroller; break;
							case '1': this.subtitle1Controller = acontroller; break;
							case '2': this.subtitle2Controller = acontroller; break;
							case 'art': this.subArtController = acontroller; break;
							case 'award': this.subAwardController = acontroller; break;
						}
						break;
					default: /* console.log('++'+alabel);*/ break;
				}

				this.tryStart();	
			},
			
			SubtitleController_didInsertElement: function (acontroller, alabel) { },

			doSubtitle1: function () {
			},
			
			doRotateQuestionMarkHint: function () {
				this.world3dController.doRotateQuestionMarkHint();
			},

			doRotateQuestionMarkInstruction: function () {
				this.subtitleInstructionController.startReading();
			},

			doRotateQuestionMark: function () {
				this.world3dController.doQuestionMarkRotate();
			},


			doQuestionMarkRotateDone: function () {
				this.subtitleInstructionController.doRemoveClicked();
		        this.subtitle2Controller.startReading();
				setTimeout(function (me ) {
					return function () {
						me.subArtController.startReading();
					}
				}(this), 2400);

				setTimeout(function (me ) {
					return function () {
						me.subAwardController.startReading();
					}
				}(this), 3200);
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
		this.subAwardController = null;
		this.subArtController = null;
		this.subtitleHeadingController = null;
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
        if (!this.get('isStarted') && 
				this.subtitleHeadingController &&
				this.subtitle1Controller && 
				this.subtitleInstructionController && 
				this.subtitle2Controller &&
				this.subArtController &&
				this.subAwardController) {
			this.set('isStarted', true);
			this.doStart();
        }

    },
	doStart: function (type, data) {
		
        this.subtitleHeadingController.startReading();
		this.subtitleHeadingController.set('isCursor', false);
	
		setTimeout(function (me ) {
			return function () {
				me.subtitle1Controller.startReading();
			}
		}(this), 1800);
			

		
    }
})