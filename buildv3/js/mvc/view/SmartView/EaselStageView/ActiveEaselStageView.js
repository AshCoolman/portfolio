App.ActiveEaselStageView = App.EaselStageView.extend({
	tagName:'div',
	className: 'ActiveEaselStageView',
	templateName:'active-easel-stage-view',
	width: 800,
	height: 600,
	trails: 0,
	tmpbgColor: null, 
	tmpwinWidth: null,
	didInsertElement: function() {
		this._super();
		$(window).resize(function(me) {
		  	return function () {
				me.resize();
			}
		}(this));
		requestAnimationFrame(function(me) {
			var animloop = function (time) {
					var dur = (this.lastRequestAnimationFrame) ? time - this.lastRequestAnimationFrame : 0;
					this.lastRequestAnimationFrame = time;
					me.redraw(dur);
					requestAnimationFrame(animloop)
				};
			return animloop
		}(this));	
		this.resize();
		this.redraw();
	},
	resize: function() {
		this.tmpwinWidth = $(window).width();
		with (this) {	
			if (tmpwinWidth > 1000) {
				width = 1000;
				height = 800; 
				tmpbgColor = "rgba(200, 255, 200, " + (trails ? 1 / trails : 1) + ")";
			} else if (tmpwinWidth > 800) {
				width = 800;
				height = 800;
				tmpbgColor = "rgba(200, 200, 255, "+ (trails ? 1 / trails : 1) + ")";
			} else {
				width = 400;
				height = 300;
				tmpbgColor = "rgba(255, 200, 200, "+ (trails ? 1 / trails : 1) + ")";
			}
			$canvas.attr( { width: width , height: height  } ).css( 'background-color', tmpbgColor );
		}
	},	
	redraw: function(dur) {
		with (this) {
			for (var i = 0; i < easelEntities.length; i++) {
				easelEntities[i].override_redraw(dur);
			}	
			stage.update();
		}
	}

});
