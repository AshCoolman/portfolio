App.World2dView = App.ActiveEslStageView.extend({
	tagName:'div',
	className: 'World2dView',
	templateName:'world-2d',
	isMosaic: true,
	multiData: {},
	src: {},
	pix: {},
	min: {},
	scale: 30,
	isVis: true,
	multiTween: undefined,
	didInsertElement: function(scope) {
		with (this) {
			set('multiData', { index: 0, values: [360, 256, 128, 64, 32, 24, 16, 8, 4, 1] });
			_super();
			//get('controller').send('view_didInsertElement', this);
			src.$canvas = $canvas.addClass('src-world-2d');
			src.context = src.$canvas[0].getContext("2d");
			src.stage = stage;
			src.stage.mouseMoveOutside = true;
			src.stage.snapToPixelEnabled = true;
			if (get('isVis')) {			
				$el.append('<canvas class="min-world-2d">');
				min.$canvas = $('.min-world-2d', $el);
				min.context = min.$canvas[0].getContext("2d");
				
				$el.append('<canvas class="pix-world-2d">');
				pix.$canvas = $('.pix-world-2d', $el);
				pix.context = pix.$canvas[0].getContext("2d");
				
				pix.min = min;
				min.src = src;
			}
			
			src.$canvas.css({display:'none'});
			min.$canvas.css({display:'none'});
			pix.$canvas.css({display:'block'}); 
		}
		var multiData = this.get('multiData');
		this.set('multiTween', createjs.Tween.get(multiData, {}).to( { index:multiData.values.length}, 5000, createjs.Ease.getPowIn(4.2) ));
	},
	addCog: function () {
		console.log('adding cog')
		App.static_eslEntityContainerView.pushObject( App.CogView.create( {controller: App.CogController.create() }));
	},
	addPixel: function () {
		console.log('adding pixel')
		var controller = App.PixelController.create();
		var eslObjSettings = $.extend(App.PixelView.create().eslObjSettings, { x: 0, y: 0 });
		var view = App.PixelView.create( {controller: controller, eslObjSettings: eslObjSettings} 	);
		App.static_eslEntityContainerView.pushObject( view );
	}, 
	addQuestionMark: function () {
		console.log('view.addQuestionMark()')	
	},
	resize: function() {
		with (this) {	
			_super();

		}
	},
	reDraw: function(dur) {
		with (this) {
			_super(dur);
			if (this.get('isVis') && pix.context) {
				var multiData = get('multiData'),
					multiIndex = Math.round( multiData.index);
					multiValues = multiData.values
				
				if (multiIndex < multiValues.length) {
					var multi = multiValues[ multiIndex ],
						widtht = src.$canvas.attr('width'),
						height = src.$canvas.attr('height');
					
					with (min) {
						$canvas.attr({width: width/multi, height: height/multi});
						context.setTransform(1 / multi,0,0,1 / multi,0,0);
						context.fillStyle = context.createPattern(src.$canvas[0], 'repeat');
						context.fillRect(0, 0, width, height) 
					}
					with (pix) {
						$canvas.attr({width: width, height: height});
						context.webkitImageSmoothingEnabled = context.mozImageSmoothingEnabled = context.imageSmoothingEnabled = false;
						context.clearRect(0, 0, width, height)
						context.setTransform(1 * multi,0,0,1 * multi,0,0);
						try {
							context.fillStyle = context.createPattern(min.$canvas[0], 'repeat');
						} catch (e) {
							console.log('no image data::failed to create pattern')
						}
						context.fillRect(0, 0, width, height) 
						min.context.clearRect(0, 0, width, height);
					}
					//App.transitionView.draw( pix.$canvas ); //should go in willDestroyElement callback, but does not work
				} else if ( this.get('isMosaic')) {	
					console.log('multiIndex', multiIndex)
					src.$canvas.css({display:'block'});
					min.$canvas.css({display:'none'});
					pix.$canvas.css({display:'none'});
					//App.transitionView.draw( src.$canvas ); //should go in willDestroyElement callback, but does not work
					this.set('isMosaic', false);
				}
			}
		}
	},
	willDestroyElement: function () {
		if (this.get('isMosaic')) {
			App.transitionView.draw( this.pix.$canvas ); //should go in willDestroyElement callback, but does not work
		} else {
			App.transitionView.draw( this.src.$canvas ); //should go in willDestroyElement callback, but does not work
		}
		createjs.Tween.removeTweens( this.get('multiTween') );
		this._super();
	}
});
