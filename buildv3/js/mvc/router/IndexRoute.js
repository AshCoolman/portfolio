App.IndexRoute = Em.Route.extend({
	indexNavController: null,
	subtitleController: null,
	smartControllers: [],
	init: function () {
		this._super();
		this.isStarted = false;
		this.smartControllers = this.get('smartControllers');
		return this;
	},
	
	activate: function () {
		this._super();
		App.eventMapper.addEventListener('indNav_end', this, this.doEnd);
		App.eventMapper.addEventListener('sub_finishedReading', this, this.doStopReading);
	},
	deactivate: function () {
		App.eventMapper.removeEventListener('indNav_end', this);
		App.eventMapper.removeEventListener('sub_finishedReading', this);
		this.subtitleController1.deactivate();
		this.subtitleController2.deactivate();
		this.subtitleController1 = null;
		this.subtitleController2 = null;
		this.isStarted = null;
	},
    doStart: function (type, data) {
		this.subtitleController1.set('content', App.scriptModel); 
        this.subtitleController1.setup();
        this.subtitleController1.doSetupDraw();
    },
	doEnd: function (type, data) {
		if (this.indexNavController) {
			this.indexNavController.set('isShowEnd', false);		
			window.location.hash = 'd1';
		}
	},
	doStopReading: function (type, data) { 
		if (this.subtitleController1) {
			//this.indexNavController.set('isShowEnd', true);
		}
	},
	renderTemplate: function() { 
		if ( App.PRELOADER ? App.PRELOADER.isLoaded : false ) {
			this.render('index');
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
		SubtitleController_didInsertElement: function (acontroller, alabel) { 
			if (acontroller.get('readOrder') == '1') { this.subtitleController1 = acontroller; }
			if (acontroller.get('readOrder') == '2') { this.subtitleController2 = acontroller; }
			this.tryStart();
		},
		IndexNavController_didInsertElement: function (acontroller, alabel) {
			this.indexNavController = acontroller;
			this.tryStart();
		},
		SmartController_didInsertElement: function (acontroller, alabel) {
		},
		doGotoDimension1: function () {	
			window.location.hash = 'd1';
		},
		doSecondSubtitle: function () {
			this.subtitleController1.set('isCursor', false);
			this.subtitleController2.set('content', App.scriptModel); 
	        this.subtitleController2.setup();
	        this.subtitleController2.doSetupDraw();
		}
		
	},
	tryStart: function () {
        if (this.subtitleController1 && this.subtitleController2) {
            this.doStart()
        }
    },
});