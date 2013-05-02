App.Dimension2Route = Em.Route.extend({ 
	init: function () {
		this._super();
	},
	model: function () {
		return (App.dimension2Model) ? App.dimension2Model : App.Dimension2Model.create();
	},
	activate: function () { 
		//Application state 
	},
	deactivate: function () { 
	},
	setupController: function (controller, model) {
		controller.set('content', model);
	},
	renderTemplate: function () {
		if ( App.static_preloader.isLoaded ) {
			this.render('dimension2');
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
				case 'Dimension1NavController': this.dimension1NavController = acontroller; break;
				case 'World2dController': 
					this.world2dController = acontroller; 
					setTimeout( function(me) {
						return function () {
							//me.world2dController.addQuestionMark();
							var eslObjSettings = $.extend(App.QuestionMarkView.create().eslObjSettings, { x: 0, y: 0 });
							App.static_eslEntityContainerView.pushObject( App.QuestionMarkView.create( { eslObjSettings: eslObjSettings } ) );
						}
					}(this), 1500)
					break;
				default:  break;
			}	
			



		}
	}
})