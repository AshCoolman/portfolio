App.Dimension2Route = Em.Route.extend({ 
	questionMarkController: null,
	model: function () {
		return (App.dimension2Model) ? App.dimension2Model : App.Dimension2Model.create();
	},
	activate: function () { 
		//Application state 
	},
	deactivate: function () {
		this._super();
		this.questionMarkController = null;
		this.world2dController = null;
		this.isStart = null;
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
		doSubtitle2: function () {
			this.subtitleController1.set('isCursor', false);
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
    },
	doStart: function (type, data) {
		this.subtitleController1.set('content', App.scriptModel); 
        this.subtitleController1.setup();
        this.subtitleController1.startReading();
    }
})