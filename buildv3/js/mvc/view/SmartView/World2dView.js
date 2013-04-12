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
		
		with (this) {
			_super();
			get('controller').send('view_didInsertElement', this);
			$el.append('<canvas class="src-world-2d">');
			src.$canvas = $('.src-world-2d', $el);
			src.$canvas.css({position:'absolute'});
			src.context = src.$canvas[0].getContext("2d");
			src.stage = new createjs.Stage(src.$canvas[0]);

			$el.append('<canvas class="vis-world-2d">');
			vis.$canvas = $('.vis-world-2d', $el);
			vis.$canvas.css({display:'none'});
			vis.context = vis.$canvas[0].getContext("2d");
			vis.src = src;
			src.vis = vis;
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
		with (this) {
			
			//this.src.stage.addChild(displayObjs[] = );
		
		}
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
			src.$canvas.attr( { width: width / multi, height: height / multi } );
			vis.$canvas.attr( { width: width, height: height } );
		}
	},
	
	redraw: function() {
		with (this) {
			
			if (src.ashView) {
				if (src.ashView.easelObj) {
					src.ashView.easelObj.x++;
					if (src.ashView.easelObj.x > 100)
						src.ashView.easelObj.x = -100;
				}
			}
			
			for (var i = 0; i < this.easelEntities.length; i++) {
				this.easelEntities[i].redraw();
			}
			
			src.stage.update();

			
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
	},
	view_createdEaselDisplayObject: function (label, childView) {
		if (label === 'ash') {
			this.src.ashView = childView;
			this.src.stage.addChild( childView.get('easelObj') );
		} else {
			console.log('view_createdEaselDisplayObject', childView._debugContainerKey, childView.get('easelObj'));
			this.easelEntities.push( childView );
			this.src.stage.addChild( childView.get('easelObj') );
		}
	}

});
