


//http://stackoverflow.com/questions/5078913/html5-canvas-performance-calculating-loops-frames-per-second
var fps = 0, fdur=5, now, timePassed=0, samplestart = firstUpdate = lastUpdate = (new Date)*1 - 1, samplesize = 1000, sampleframes=0, samplefps=-1;

// The higher this value, the less the FPS will be affected by quick changes
// Setting this to 1 will show you the FPS of the last sampled frame only
var fpsFilter = 50;

$('body').append('<div id="fps"></div>');

var fpsOut = document.getElementById('fps');
setInterval(function(){
	

  fpsOut.innerHTML = fps.toFixed(0) + "fps<br>" +Math.round(timePassed*1000/fdur) + '<br/>' + Math.round(timePassed)+'s<br/>' + samplefps + 'sfps';

	
}, 1000);





PortfolioApp.World2dView = PortfolioApp.SmartView.extend({
	tagName:'div',
	className: 'World2dView',
	templateName:'world-2d',
	width: 800,
	height: 600,
	multi: 5,
	src: {},
	vis: {},
	scale: 1,
	didInsertElement: function(scope) {
		
		with (this) {
			_super();
			get('controller').send('view_didInsertElement', this);
			$el.append('<canvas class="src-world-2d">');
			src.$canvas = $('.src-world-2d', $el);
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
		
		/*8888888 fps 8888888*/
		with (window) {
			var thisFrameFPS = 1000 / ((now=new Date) - lastUpdate);
			fps += (thisFrameFPS - fps) / fpsFilter;
			lastUpdate = now;
			timePassed = (now - firstUpdate ) / 1000;
			var sampledif = now - samplestart;
			if (sampledif > samplesize) {
				var perc = 1 - ( (sampledif - samplesize) / samplesize );
				samplefps = Math.round( (sampleframes / samplesize ) *1000 * perc );
				sampleframes=0;
				samplestart = now;
			}
			sampleframes++;
		}
		/*8888888 fps 8888888*/
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
