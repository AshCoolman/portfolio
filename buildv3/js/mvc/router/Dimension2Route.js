App.Dimension2Route = Em.Route.extend({ 
	questionMarkController: null,
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
		console.log('deactivate');
		App.eventMapper.triggerEvent(ragh.MEvt.create('doTransition')); 
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
							//var eslObjSettings = $.extend(App.QuestionMarkView.create().eslObjSettings, { x: 0, y: 0 });
							//App.static_eslEntityContainerView.pushObject( App.QuestionMarkView.create( { eslObjSettings: eslObjSettings } ) );
							
							/*
							Doesn't work as templates with render helpers fail to render:
							
							var controller = App.PixelController.create();
							var eslObjSettings = $.extend(App.PixelView.create().eslObjSettings, { x: 0, y: 0 });
							var view = App.PixelView.create( {controller: controller, eslObjSettings: eslObjSettings} 	);
							App.static_eslEntityContainerView.pushObject( view );
							*/
							console.log('me.questionMarkController', me)
							me.questionMarkController.get('view').eslObj.visible = true;
						}
					}(this), 1500)
					break;
				case 'question-mark-controller': 
					this.questionMarkController = acontroller; 
					
					break;
				default: /* console.log('++'+alabel);*/ break;
			}	
			



		}
	}
})