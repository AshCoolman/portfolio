App.TransitionView = App.SmartView.extend({
	className: 'TransitionView',
	templateName: 'transition',
	tagName: 'div',
	$dst: undefined,
	didInsertElement: function() {
		this._super();
		this.$dst = $('canvas.transition-canvas', this.$el);
		$(window).bind('resize.TransitionView', function (me) {
			return function () {
				me.doResize();
			}
		}(this));
			
		this.$el.bind('click.TransitionView', function (me) {
			return function () {
				me.doClick();
			}
		}(this));
		//this.$el.css({ display: 'none' });
		App.transitionView = this;
		this.doResize();
		
	
		
		
	},
	draw: function ($src) {
		var $dst = this.$dst;
		var widthHeightObj = {width: $src.css('width'), height: $src.css('height')};
		$dst.css(widthHeightObj).attr(widthHeightObj);
		$dst[0].getContext('2d').clearRect( 0, 0, $dst[0].width,  $dst[0].height);
 		$dst[0].getContext('2d').drawImage($src[0], 0, 0);	
	
	},
	show: function() {
		//this.$el.css('opacity', 1)
			this.$el.fadeIn(0);
	},
	hide: function() {
		this.$el.fadeOut(1400);
	},
	clear: function () {
		this.$dst[0].getContext('2d').clearRect( 0, 0, this.$dst[0].width,  this.$dst[0].height);
	},
	willDestroyElement: function() {
		this._super();
		$(window).unbind('resize.TransitionView');
	},
	doClick: function (e) {
		var aparent = this.get('parentView');
		aparent.removeObject(this);
	},
	doResize: function (e) {
		
		var w, 
			h, 
			tmpbgColor,
			tmpwinWidth = $(window).width();
	
			if (tmpwinWidth > App.BREAKPOINT.WIDTH_2) {
				w = App.BREAKPOINT.WIDTH_2;
				h = App.BREAKPOINT.HEIGHT_2; 
				tmpbgColor = "rgba(0, 255, 200, 0.2)";
			} else if (tmpwinWidth > App.BREAKPOINT.WIDTH_1) {
				w = App.BREAKPOINT.WIDTH_1;
				h = App.BREAKPOINT.HEIGHT_1;
				tmpbgColor = "rgba(0, 200, 255, 0.2)";
			} else {
				w = App.BREAKPOINT.WIDTH_0;
				h = App.BREAKPOINT.HEIGHT_0;
				tmpbgColor = "rgba(0, 200, 200, 0.2)";
			}

		$('.transition-canvas', this.$el).css( { width: w+'px' , height: h+'px'} );
		
	},
	redraw: function () {
		
	}
})