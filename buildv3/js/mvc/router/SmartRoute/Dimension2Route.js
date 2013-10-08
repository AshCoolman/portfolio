App.Dimension2Route = App.SmartRoute.extend({ 
	questionController: null,
	model: function () {
		return (App.dimension2Model) ? App.dimension2Model : App.Dimension2Model.create();
	},
	activate: function () { 
		this._super();
		this.addEvents({
				SmartController_didInsertElement: function(acontroller, alabel) {
					switch (alabel) {
						case 'World2dController': 
							this.world2dController = acontroller;
							break;
						case 'QuestionController': 
							this.questionController = acontroller; 
							break;
						case 'MachineController':
							this.machineController = acontroller;
							break;
						case 'UserController':
							this.userController = acontroller;
							break;
						case 'SubtitleController': 
							switch (acontroller.get('orderRead')) {
								case '1': this.subtitleController1 = acontroller; break;
								case '1a': this.subtitleController1a = acontroller; break;
								case '2': this.subtitleController2 = acontroller; break;
								case 'instructionTurnOn': this.instructionTurnOnController = acontroller; break;
								case 'instructionTurnOff': this.instructionTurnOffController = acontroller; break;
							}
							break;
						case 'Dimension2NavController':
							this.dimension2NavController = acontroller;
						default: /* console.log('++'+alabel);*/ break;
					}	
					this.tryStart();
				},
				SubtitleController_didInsertElement: function () {
				},
				doGotoDimension3: function () {
					window.location.hash = 'd3';
				},
				doShowUser: function () {
					this.userController.doShowPixelInChildren(1200);
				},
				doHideUser:function () {
					this.userController.doShowPixelOutChildren(1200);
				},
				doShowQuestion: function () {
					this.questionController.doShowPixelInChildren(300);
				},
				doShowMachineCogs: function () {
					this.questionController.doCogOpenAndFadeOut(1200);
					this.machineController.setInteractive(false);
				},
				doShowMachine: function () {
					this.machineController.doShowLineInChildren(2000);
					
				},
				doInstructionTurnOnController: function () {
					this.machineController.setInteractive(true);
					this.instructionTurnOnController.startReading();
				},
				doMachineTurnOn: function () {
					if (!this.isFirstTurnOn) {
						this.isFirstTurnOn = true;
						this.instructionTurnOnController.doRemoveClicked();
						this.instructionTurnOffController.startReading();
					}
				},
				doMachineTurnOff: function () {
					if (!this.isFirstTurnOff) {
						this.isFirstTurnOff = true;
						this.instructionTurnOffController.doRemoveClicked();
						this.subtitleController1.set('isCursor', false);
						this.subtitleController1a.startReading();
					}
				},
				doSubtitle2: function () {
					this.subtitleController1a.set('isCursor', false);
			        this.subtitleController2.startReading();
				},
				doMosaicFinished: function () {
					//console.log('Route doMosaicFinished')
				}
			});
	},
	deactivate: function () {
		this._super();
		this.questionController = null;
		this.world2dController = null;
		this.subtitleController1 = null;
		this.subtitleController1a = null;
		this.subtitleController2 = null;
		this.machineController = null;
		this.userController = null;
		this.instructionTurnOnController = null;
		this.instructionTurnOffController= null;
		
	},
	renderTemplate: function () {
		if ( App.PRELOADER.isLoaded ) {
			this.render('dimension2');
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
        if (	!this.get('isStarted') && 
				this.questionController && 
				this.world2dController && 
				this.subtitleController1 && 
				this.subtitleController1a &&
				this.subtitleController2 && 
				this.machineController && 
				this.userController &&
				this.instructionTurnOnController && 
				this.instructionTurnOffController ) {
			this.machineController.setTarget(this.userController );
			this.set('isStarted', true);
            this.doStart();
		}
    },
	doStart: function (type, data) {
		this.subtitleController1.set('content', App.scriptModel); 
        this.subtitleController1.setup();
        this.subtitleController1.startReading();
		
    }
})