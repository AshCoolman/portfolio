App.ActiveEslStageView = App.EslStageView.extend({
	tagName:'div',
	className: 'ActiveEslStageView',
	templateName:'active-esl-stage-view',
	trails: 0,
	tmpbgColor: null, 
	tmpwinWidth: null,
	raf:null,
	isAnimating: false,
	didInsertElement: function() {
		this._super();
		$(window).resize(function(me) {
		  	return function () {
				me.resize();
			}
		}(this));
		isAnimating = true;
		
		var rafFunction = function(me) {
			var animloop = function (time) {
				var dur = (this.lastRequestAnimationFrame) ? time - this.lastRequestAnimationFrame : 0;
				this.lastRequestAnimationFrame = time;
				me.redraw(dur);
				me.set('raf', window.requestAnimationFrame(animloop));			
			};
			return animloop
		}(this);
		
		
		this.set('raf', window.requestAnimationFrame(rafFunction));	

		//
		this.resize();
		this.redraw();
	},
	resize: function() {
		this.tmpwinWidth = $(window).width();
		with (this) {	
			if (tmpwinWidth > App.BREAKPOINT.WIDTH_2) {
				width = App.BREAKPOINT.WIDTH_2;
				height = App.BREAKPOINT.HEIGHT_2; 
				tmpbgColor = "rgba(200, 255, 200, " + (trails ? 1 / trails : 1) + ")";
			} else if (tmpwinWidth > App.BREAKPOINT.WIDTH_1) {
				width = App.BREAKPOINT.WIDTH_1;
				height = App.BREAKPOINT.HEIGHT_1;
				tmpbgColor = "rgba(200, 200, 255, "+ (trails ? 1 / trails : 1) + ")";
			} else {
				width = App.BREAKPOINT.WIDTH_0;
				height = App.BREAKPOINT.HEIGHT_0;
				tmpbgColor = "rgba(255, 200, 200, "+ (trails ? 1 / trails : 1) + ")";
			}
			$canvas.attr( { width: width , height: height  } );
			if (App.DEBUG) {
				$canvas.css( {'box-shadow': 'inset -1px -1px '+ tmpbgColor, width: width , height: height } );
			}
		}
	},	
	redraw: function(dur) {
		var eslEntities = this.eslEntities;
		with (this) {
			for (var i = 0; i < eslEntities.length; i++) {
				if (!eslEntities[i].override_redraw) {
					console.log('entity lacks override_redraw\n\t', eslEntities[i]._debugContainerKey)
				} else { 
					//console.log('>>', eslEntities[i].x)
					eslEntities[i].override_redraw(dur);
					/*
					eslEntities[i].x -= 0.5;
					eslEntities[i].y -= 0.5;
					*/
				}
			}	
			stage.x = -1 + $canvas.attr('width')/2;
			stage.update();
		}
	},
	willDestroyElement: function () {
		//this.isAnimating = false;
		this._super();
		window.cancelAnimationFrame(this.get('raf'));
	}

});
App.register('view:active-esl-stage', App.ActiveEslStageView, {singleton: false})