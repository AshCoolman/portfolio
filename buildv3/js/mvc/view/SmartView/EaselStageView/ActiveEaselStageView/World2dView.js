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
			
			set('multiData', { index: 0, roundIndex: 0, needsRedraw: true, values: [256, 128, 64, 32, 24, 8, 1] });
			_super(); 
			//get('controller').send('view_didInsertElement', this); 
			src.$canvas = $('.esl-stage-canvas', $el).addClass('src-world-2d');
			src.$canvas.attr( { width: App.BREAKPOINT.WIDTH_2 , height: App.BREAKPOINT.HEIGHT_2 } );
			console.log('src.$canvas', src.$canvas);
			src.canvas=src.$canvas[0];
			src.context = src.canvas.getContext("2d");
			src.stage = stage;
			src.stage.mouseMoveOutside = true;
			src.stage.snapToPixelEnabled = true;
			if (get('isVis')) {			
				src.$canvas.parent().append('<canvas class="min-world-2d canvas-hero">');
				min.$canvas = $('.min-world-2d', $el);
				min.canvas = min.$canvas[0];
				min.context = min.canvas.getContext("2d");
				
				src.$canvas.parent().append('<canvas class="pix-world-2d canvas-hero">');
				pix.$canvas = $('.pix-world-2d', $el);
				pix.context = pix.$canvas[0].getContext("2d");
				
				pix.min = min;
				min.src = src;
			}
			
			src.$canvas.css({display:'none'});
			min.$canvas.css({display:'block'});
			pix.$canvas.css({display:'none'}); 
			
		}
		var multiData = this.get('multiData');
		this.set('multiTween', createjs.Tween
								.get(multiData, {})
								.to( { index:multiData.values.length}, 3000, createjs.Ease.getPowIn(2.2) )
								.addEventListener("change", function (e) {
									var multiData = e.target.target;
									if (Math.round( multiData.index) != multiData.roundIndex) {
										multiData.needsRedraw = true;
									}
									multiData.roundIndex = Math.round( multiData.index);
								}));
							
		this.resize();
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

	reDraw: function(dur) {

			
		with (this) {
			_super(dur);
			if (this.get('isVis') && pix.context) {
				var multiData = get('multiData'),
					multiIndex = Math.round( multiData.index),
					multiValues = multiData.values;
				
				if (multiData.needsRedraw) {
					multiData.needsRedraw = false;
					
					if (multiIndex < multiValues.length) {
						var multi = multiValues[ multiIndex ],
							invMulti = 1/multi,
							width = src.$canvas.attr('width'),
							height = src.$canvas.attr('height');
					
						
						with (min) {	
							context.webkitImageSmoothingEnabled = context.mozImageSmoothingEnabled = context.imageSmoothingEnabled = false;
							$canvas.attr({width: width/multi, height: height/multi});
							context.setTransform(invMulti,0,0,invMulti,0,0);
							context.drawImage(src.canvas, 0,0);
							$canvas.css({width: width, height: height});
							
							//context.fillRect(0, 0, width/2, height/2) 
							
							src.$canvas.css({display:'none'});
							min.$canvas.css({display:'block'});
							pix.$canvas.css({display:'none'});
							
						}
						with (pix) {
							$canvas.attr({width: width, height: height});
							context.webkitImageSmoothingEnabled = context.mozImageSmoothingEnabled = context.imageSmoothingEnabled = false;
							//context.clearRect(0, 0, width, height)
							context.setTransform(multi,0,0,multi,0,0);
							//context.fillStyle = context.createPattern(min.$canvas[0], 'repeat');
							//context.fillRect(0, 0, width, height);
							context.drawImage(min.canvas, 0,0);
						
							//min.context.clearRect(0, 0, width, height);
							
							
							src.$canvas.css({display:'none'});
							min.$canvas.css({display:'none'});
							pix.$canvas.css({display:'block'});
						}
						/*
						*/
						
						//App.transitionView.draw( pix.$canvas ); //should go in willDestroyElement callback, but does not work
					} else if ( this.get('isMosaic')) {	
						//console.log('multiIndex', multiIndex)
						src.$canvas.css({display:'block'});
						min.$canvas.css({display:'none'});
						pix.$canvas.css({display:'none'});
						//App.transitionView.draw( src.$canvas ); //should go in willDestroyElement callback, but does not work
						this.set('isMosaic', false);
						this.get('controller').send('doMosaicFinished');
					}
				}
			}
		}	
		
	},
	
	resize: function () {
		this._super();
		var $canvas = $('canvas', this.get('$el'))	,
			bp = App.BREAKPOINT,
			canvasHeroClass,
			canvasHeroHolderClass,
			tmpwinWidth = this.tmpwinWidth = $(window).width();

		if (tmpwinWidth > bp.WIDTH_2) {
			canvasHeroClass = 'canvas-hero';
			canvasHeroHolderClass = 'canvas-hero-holder';
		} else if (tmpwinWidth > bp.WIDTH_1) {
			canvasHeroClass = 'canvas-hero-med';
			canvasHeroHolderClass = 'canvas-hero-holder-med';
		} else {
			canvasHeroClass = 'canvas-hero-small';
			canvasHeroHolderClass = 'canvas-hero-holder-small';
		}

		$canvas.removeClass('canvas-hero canvas-hero-med canvas-hero-small');
		$canvas.addClass(canvasHeroClass);
		$canvas.parent().removeClass('canvas-hero-holder canvas-hero-holder-med canvas-hero-holder-small');
		$canvas.parent().addClass(canvasHeroHolderClass);	
	},
	willDestroyElement: function () {
		createjs.Tween.removeTweens( this.get('multiTween') );
		this._super();
	}
});
