PortfolioApp.World2dView = PortfolioApp.SmartView.extend({
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
	didInsertElement: function(scope) {
		this._super();
		console.log('World2dView.didInsertElement()', this);
		this.isVis=false;
		
		with (this) {
			
			get('controller').send('view_didInsertElement', this);
			$el.append('<canvas class="src-world-2d">');
			src.$canvas = $('.src-world-2d', $el);
			src.$canvas.css({position:'absolute'});
			src.context = src.$canvas[0].getContext("2d");
			src.stage = new createjs.Stage(src.$canvas[0]);
			//src.stage.scaleX=src.stage.scaleY=multi;
			src.stage.mouseMoveOutside = true;
			
			if (this.isVis) {
				$el.append('<canvas class="vis-world-2d">');
				vis.$canvas = $('.vis-world-2d', $el);
				vis.$canvas.css({display:'none'});
				vis.context = vis.$canvas[0].getContext("2d");
				vis.src = src;
				src.vis = vis;
			}
			resize();
			redraw();
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
	
	},
	addSquare: function () {
		var sqData = {
			x: 200,
			y: 10,
			class: PortfolioApp.SquareView
		},
		sqc, sqv;
			
		this.$el.append('<div class="container-view"></div>')
		var containerView = Em.ContainerView.create();
		containerView.append(	);//($('.container-view', this.$el));
		
		if (true) {
			sqc = PortfolioApp.SquareController.create();
			sqv = PortfolioApp.SquareView.create();
			sqv.set('controller', sqc)
			console.log('World2dView.addSquare() ', this.easelEntityContainerView);
			this.easelEntityContainerView.pushObject( sqv );
		}
			
			
			//this.easelEntities.push( sqv );
			//this.src.stage.addChild( sqv.get('easelObj') );
			//sqv.easelObj.x = sqData.x;
			//sqv.easelObj.y = sqData.y;
			//src.stage.addChild(sqv.easelObj);
			//this.src.stage.addChild(displayObjs[] = );
		
		
	},
	resize: function() {
		
		with (this) {	
			var winWidth = $(window).width();
			if (winWidth > 1000) {
				width = 1000;
				height = 800; 
				vis.bgcolor = "rgba(200, 255, 200, " + (trails ? 1 / trails : 1) + ")";
			} else if (winWidth > 800) {
				width = 800;
				height = 800;
				vis.bgcolor = "rgba(200, 200, 255, "+ (trails ? 1 / trails : 1) + ")";
			} else {
				width = 400;
				height = 300;
				vis.bgcolor = "rgba(255, 200, 200, "+ (trails ? 1 / trails : 1) + ")";
			}
			src.$canvas.attr( { width: width , height: height  } );
			
			if (this.isVis) vis.$canvas.attr( { width: width, height: height } );
		}
	},
	
	redraw: function() {
		with (this) {
			
			if (src.ashView){
				src.ashView.redraw();
			}
			
			
			for (var i = 0; i < this.easelEntities.length; i++) {
				this.easelEntities[i].redraw();
			}
			src.stage.update();

			
			if (this.isVis) {
				with (vis) {
					context.webkitImageSmoothingEnabled = 
					context.mozImageSmoothingEnabled = false;
					context.setTransform(1 * multi,0,0,1 * multi,0,0);
					vis.context.fillStyle = vis.bgcolor;
					vis.context.fillRect(0,0,width, height);
					context.fillStyle = context.createPattern(src.$canvas[0], 'repeat');
					context.fillRect(0, 0, width, height)
				}
			}
		}
	},
	easelDisplayObjectCreatedByChildView: function (label, childView) {
		console.log('easelDisplayObjectCreatedByChildView', label, childView.get('easelObj'));
		if (label === 'ash') {
			this.src.ashView = childView;
			this.src.stage.addChild( childView.get('easelObj') );
		} else {
			console.log('easelDisplayObjectCreatedByChildView', childView._debugContainerKey, childView.get('easelObj'));
			this.easelEntities.push( childView );
			this.src.stage.addChild( childView.get('easelObj') );
		}
	}

});
