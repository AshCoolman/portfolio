App.World2dView = App.SmartView.extend({
	tagName:'div',
	className: 'World2dView',
	templateName:'world-2d',
	width: 800,
	height: 600,
	multi: 10,
	src: {},
	vis: {},
	$editorBtn: null,
	$editor: null,
	scale: 1,
	trails:0,
	easelEntities: [],
	init: function() {
		return this._super();
	},
	didInsertElement: function(scope) {
		with (this) {
			_super();
			isVis=false;
			get('controller').send('view_didInsertElement', this);
			
			$el.append('<canvas class="src-world-2d">');
			src.$canvas = $('.src-world-2d', $el);
			src.context = src.$canvas[0].getContext("2d");
			src.stage = new createjs.Stage(src.$canvas[0]);
			//src.stage.scaleX=src.stage.scaleY=multi;
			src.stage.mouseMoveOutside = true;
			
			$el.append('<canvas class="vis-world-2d">'); 
			vis.$canvas = $('.vis-world-2d', $el);
			vis.$canvas.css({display:'none'});
			vis.context = vis.$canvas[0].getContext("2d");
			vis.src = src;
			src.vis = vis;
		
		}
		
		$(window).resize(function(me) {
		  	return function () {
				me.resize();
			}
		}(this));
		
		requestAnimationFrame(function(me) {
			var animloop = function (time) {
					var src =  me.get('src'),
						vis =  me.get('vis'); 
					me.redraw();
					requestAnimationFrame(animloop)
				};
			return animloop
		}(this));	
		
		this.resize();
		this.redraw();
	
	},
	addCog: function () {
		console.log('adding cog')
		App.static_easelEntityContainerView.pushObject( App.CogView.create( {controller: App.CogController.create() }));
	},
	addPixel: function () {
		console.log('adding pixel')
		var controller = App.PixelController.create();
		var easelObjSettings = $.extend(App.PixelView.create().easelObjSettings, { x: 0, y: 0 });
		var view = App.PixelView.create( {controller: controller, easelObjSettings: easelObjSettings} 	);
		App.static_easelEntityContainerView.pushObject( view );
	}, 
	resize: function() {
		
		with (this) {	
			var winWidth = $(window).width();
			if (winWidth > 1000) {
				width = 1000;
				height = 800; 
				src.bgcolor = vis.bgcolor = "rgba(200, 255, 200, " + (trails ? 1 / trails : 1) + ")";
			} else if (winWidth > 800) {
				width = 800;
				height = 800;
				src.bgcolor = vis.bgcolor = "rgba(200, 200, 255, "+ (trails ? 1 / trails : 1) + ")";
			} else {
				width = 400;
				height = 300;
				src.bgcolor = vis.bgcolor = "rgba(255, 200, 200, "+ (trails ? 1 / trails : 1) + ")";
			}
			src.$canvas.attr( { width: width , height: height  } );
			
			if (this.isVis) vis.$canvas.attr( { width: width, height: height } );
			src.$canvas.css( 'background-color', src.bgcolor );
		}
	},
	
	redraw: function() {
		with (this) {
			
			if (src.ashView){
				src.ashView.redraw();
			}
			
			
			for (var i = 0; i < this.easelEntities.length; i++) {
				this.easelEntities[i].override_redraw();
			}	
			
			src.stage.update();

			
			if (this.isVis) {
				with (vis) {
					context.webkitImageSmoothingEnabled = 
					context.mozImageSmoothingEnabled = false;
					context.setTransform(1 * multi,0,0,1 * multi,0,0);
					vis.context.fillStyle = vis.bgcolor;
					vis.context.fillRect( 0, 0, width, height);
					context.fillStyle = context.createPattern(src.$canvas[0], 'repeat');
					context.fillRect(0, 0, width, height)
				}
			}
		}
	},
	addEaselEnt: function (label, childView) {
		if (label === 'ash') {
			this.src.ashView = childView;
			this.src.stage.addChild( childView.get('easelObj') );
		} else {
			this.easelEntities.push( childView );
			this.src.stage.addChild( childView.get('easelObj') );
		}
	}

});
