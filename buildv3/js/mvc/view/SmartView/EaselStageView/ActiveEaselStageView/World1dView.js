App.World1dView = App.ActiveEslStageView.extend({
	tagName:'div',
	className: 'World1dView',
	templateName:'world-1d',
	didInsertElement: function () {
		this._super();
	},
	redraw: function(dur) {
		this._super();
	},
	resize: function () {


		var width = 2400;
		this.$canvas.attr( { width: width } ).css( {width: width} );
		this.$el.css( { width: width, 'margin-left': -width/2} );

		this.tmpwinHeight = $(window).height();
		with (this) {	
			if (tmpwinHeight > App.BREAKPOINT.HEIGHT_2) {
				height = App.BREAKPOINT.HEIGHT_2; 
				tmpbgColor = "rgba(200, 255, 200, " + (trails ? 1 / trails : 1) + ")";
			} else if (tmpwinHeight > App.BREAKPOINT.HEIGHT_1) {
				height = App.BREAKPOINT.HEIGHT_1;
				tmpbgColor = "rgba(200, 200, 255, "+ (trails ? 1 / trails : 1) + ")";
			} else {
				height = App.BREAKPOINT.HEIGHT_0;
				tmpbgColor = "rgba(255, 200, 200, "+ (trails ? 1 / trails : 1) + ")";
			}
			$canvas.attr( { height: height  } ).css( {height: height} );
			if (App.DEBUG) {
				$canvas.css('box-shadow', 'inset -1px -1px '+tmpbgColor);
			}
		}
	}
});