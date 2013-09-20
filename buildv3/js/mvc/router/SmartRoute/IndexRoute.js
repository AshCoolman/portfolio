App.IndexRoute = App.SmartRoute.extend({
	indexNavController: null,
	subtitleController: null,
	activate: function () {
		this._super();
		this.addEvents({
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
		        this.subtitleController2.startReading();
			}
		});

			
		return this;
	},
	
	deactivate: function () {
		App.eventMapper.removeEventListener('indNav_end', this);
		this.subtitleController1 = null;
		this.subtitleController2 = null;
	},
    doStart: function (type, data) {
        this.subtitleController1.startReading();
    },
	doEnd: function (type, data) {
		if (this.indexNavController) {
			this.indexNavController.set('isShowEnd', false);		
			window.location.hash = 'd1';
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
	tryStart: function () {
        if (!this.get('isStarted') && this.subtitleController1 && this.subtitleController2) {
			this.get('isStarted', true);
            this.doStart()
        }
    },
});