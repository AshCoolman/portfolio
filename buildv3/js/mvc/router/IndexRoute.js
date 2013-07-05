App.IndexRoute = Em.Route.extend({
	indexNavController: null,
	subtitleController: null,
	smartControllers: [],
	init: function () {
		this._super();
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
	},
    doStart: function (type, data) {
		this.subtitleController.set('content', App.scriptModel); 
        this.subtitleController.setup(this.subtitleController.get("content").scriptIndex);
        this.subtitleController.doSetupDraw();
        this.indexNavController.set("isShowStart", false)
    },
	doEnd: function (type, data) {
		if (this.indexNavController) {
			this.indexNavController.set('isShowEnd', false);		
			window.location.hash = 'd1';
		}
	},
	doStopReading: function (type, data) { 
		if (this.subtitleController) {
			this.indexNavController.set('isShowEnd', true);
		}
	},
	renderTemplate: function() { 
		if ( App.static_preloader ? App.static_preloader.isLoaded : false ) {
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
			this.subtitleController = acontroller; 
			this.subtitleView = acontroller.get('view');
			this.tryStart();
		},
		IndexNavController_didInsertElement: function (acontroller, alabel) {
			this.indexNavController = acontroller;
			this.tryStart();
		},
		SmartController_didInsertElement: function (acontroller, alabel) {
		}
		
	},
	tryStart: function () {
        if (this.subtitleController && this.indexNavController) {
            this.doStart()
        }
    },
});