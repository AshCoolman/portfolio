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
	didInsertElement: function(scope) {
		
		with (this) {
			_super();
			
			//$el.append('<button label="editor" class=".editor-btn"></button>');
			//$editorBtn = $('.editor-btn', $el);
			
			get('controller').send('view_didInsertElement', this);
			$el.append('<canvas class="src-world-2d">');
			src.$canvas = $('.src-world-2d', $el);
			src.$canvas.css({display:'none'});
			src.context = src.$canvas[0].getContext("2d");
			src.stage = new createjs.Stage(src.$canvas[0]);

			$el.append('<canvas class="vis-world-2d">');
			vis.$canvas = $('.vis-world-2d', $el);
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
	resize: function() {
		
		with (this) {	
			var winWidth = $(window).width();
			if (winWidth > 1000) {
				width = 1000;
				height = 800;
				vis.bgcolor = "rgba(0, 255, 0, 0.5)";
			} else if (winWidth > 800) {
				width = 800;
				height = 800;
				vis.bgcolor = "rgba(0, 0, 255, 0.5)";
			} else {
				width = 400;
				height = 300;
				vis.bgcolor = "rgba(255, 0, 0, 0.5)";
			}
			src.$canvas.attr( { width: width / multi, height: height / multi } );
			vis.$canvas.attr( { width: width, height: height } );
			vis.context.fillStyle = vis.bgcolor;
			vis.context.fillRect(0,0,width, height);
		}
	},
	
	redraw: function() {
		with (this) {
			src.stage.update();

			if (src.ash) {
				src.ash.view.redraw( src.context, width / multi, height / multi );
			}

			with (vis) {
				context.webkitImageSmoothingEnabled = 
				context.mozImageSmoothingEnabled = false;
				context.setTransform(1 * multi,0,0,1 * multi,0,0);
				context.fillStyle = context.createPattern(src.$canvas[0], 'repeat');
				context.fillRect(0, 0, width, height)
			}
		}
	},
	view_createdEaselDisplayObject: function (label, easelObj, childView) {

		if (label === 'ash') {
			console.log('added ash')
			var ash = this.src['ash']={easelObj:null, view: null};
			ash.view = childView;
			ash.easelObj = easelObj
			this.src.stage.addChild(ash.easelObj);
		}
	}

});
