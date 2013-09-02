App.Dimension2Route = Em.Route.extend({ 
	questionMarkController: null,
	init: function () {
		this._super();
		this.isStarted = false;
		App.eventMapper.addEventListener('sub_finishedReading', this, this.doStopReading);
		App.eventMapper.addEventListener('scriptD2ShowQuestion', this, function (me) {
			return function () {
				if (me.questionMarkController) {
					me.questionMarkController.get('view').eslObj.visible = true;
				}
			}
		}(this));
	},
	model: function () {
		return (App.dimension2Model) ? App.dimension2Model : App.Dimension2Model.create();
	},
	activate: function () { 
		//Application state 
	},
	
	deactivate: function () {
		this._super();
		this.subtitleController1.deactivate();
		this.subtitleController2.deactivate();
		this.subtitleController1 = null;
		this.subtitleController2 = null;
		this.questionMarkController = null;
		this.world2dController = null;
		this.isStart = null;
	},
	setupController: function (controller, model) {
		controller.set('content', model);
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
	
	doStart: function (type, data) {
		this.subtitleController1.set('content', App.scriptModel); 
        this.subtitleController1.setup();
        this.subtitleController1.startReading();
    },
	doStopReading: function (type, data) {
		//console.log('doStopReading', this.dimension2NavController);
		//this.dimension2NavController.set('isShowEnd', true);
	},
	events: {
		
		SmartController_didInsertElement: function(acontroller, alabel) {
			switch (alabel) {
				case 'World2dController': 
					this.world2dController = acontroller;
					break;
				case 'QuestionMarkController': 
					this.questionMarkController = acontroller; 
					break;
				case 'SubtitleController': 
					switch (acontroller.get('orderRead')) {
						case '1': this.subtitleController1 = acontroller; break;
						case '2': this.subtitleController2 = acontroller; break;
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
		doShowQuestion: function () {
			this.questionMarkController.setVisible();
		},
		doSecondSubtitle: function () {
			this.subtitleController1.set('isCursor', false);

			this.subtitleController2.set('content', App.scriptModel); 
	        this.subtitleController2.setup(this.subtitleController2.get("content").scriptD2);
	        this.subtitleController2.startReading();
		},
		doMosaicFinished: function () {
			//console.log('Route doMosaicFinished')
		}
	},
	tryStart: function () {
        if (!this.isStart && this.questionMarkController && this.world2dController && this.subtitleController1 && this.subtitleController2) {
			this.isStart = true;
            this.doStart();
		}
    }
})