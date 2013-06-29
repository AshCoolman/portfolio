App.IndexRoute = Em.Route.extend({
	indexNavController: null,
	subtitleController: null,
	activate: function () {
		this._super();
		console.log('Route index', this)
		//App.eventMapper.addEventListener('indNav_start', this, this.doIndNav_start);
		App.eventMapper.addEventListener('indNav_end', this, this.doEnd);
		App.eventMapper.addEventListener('sub_finishedReading', this, this.doStopReading);
	},
	deactivate: function () {
		App.eventMapper.removeEventListener('indNav_start', this);
		App.eventMapper.removeEventListener('indNav_end', this);
		App.eventMapper.removeEventListener('sub_finishedReading', this);
	},
	tryStart: function () {
        if (this.subtitleController && this.indexNavController) {
            this.doStart()
        }
    },
    doStart: function (type, data) {
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
		console.log('dosub_finishedReading')
		if (subtitleController) {
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
		SubtitleView_InsertViewDone: function (achildview, another) {
			if ('Subtitle' == achildview.name) {
				subtitleView = achildview;
				subtitleController = subtitleView.get('controller');
				subtitleController.set('content', App.scriptModel);
                this.tryStart()
			}
		},
		IndexNavController_didInsertElement: function (inc) {
			this.indexNavController = inc;
            this.tryStart()
		},
		SmartController_didInsertElement: function(acontroller, alabel) {
			if (alabel == 'IndexNavController') {
				this.indexNavController = acontroller
                this.tryStart()
			}
		}
	}
})

