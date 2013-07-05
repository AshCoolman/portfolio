App.Dimension2Route = Em.Route.extend({ 
	questionMarkController: null,
	init: function () {
		this._super();
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

	setupController: function (controller, model) {
		controller.set('content', model);
	},
	renderTemplate: function () {
		if ( App.static_preloader.isLoaded ) {
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
		this.subtitleController.set('content', App.scriptModel); 
        this.subtitleController.setup(this.subtitleController.get("content").scriptD2);
        this.subtitleController.doSetupDraw();
    },
	events: {
		
		SmartController_didInsertElement: function(acontroller, alabel) {
			console.log('Dimension2 route', alabel)
			switch (alabel) {
				case 'World2dController': 
					this.world2dController = acontroller;
					break;
				case 'QuestionMarkController': 
					this.questionMarkController = acontroller; 
					break;
				case 'SubtitleController': 
					this.subtitleController = acontroller; 
					break;
				default: /* console.log('++'+alabel);*/ break;
			}	
			this.tryStart();
		},
		SubtitleController_didInsertElement: function () {
		}
	},
	tryStart: function () {
        if (this.questionMarkController && this.world2dController && this.subtitleController) {
            this.doStart()
        }
    }
})