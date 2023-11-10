App.ExamplesRoute = App.SmartRoute.extend({
	examplesNavController: null,
	activate: function () {
		console.log('activated example route')
		this._super();
		this.addEvents({
			SmartController_didInsertElement: function (acontroller, alabel) { 
				this.tryStart();
			},
			SubtitleController_didInsertElement: function (acontroller, alabel) { 
				this.tryStart();
			},
			ExamplesNavController_didInsertElement: function (acontroller, alabel) {
				this.indexNavController = acontroller;
				this.tryStart();
			}
		});
		return this;
	},
	
	deactivate: function () {
	},
    doStart: function (type, data) {
    },
	doEnd: function (type, data) {
	},
	renderTemplate: function() { 
		if ( App.PRELOADER ? App.PRELOADER.isLoaded : false ) {
			this.render('examples');
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
        if (!this.get('isStarted') && this.indexNavController) {
			this.get('isStarted', true);
            this.doStart()
        }
    },
});