App.TransitionView = App.SmartView.extend({
	className: 'TransitionView',
	templateName: 'transition',
	tagName: 'div',
	didInsertElement: function() {
		this._super();
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
		
		this.doResize();
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
			tmpwinWidth = this.tmpwinWidth = $(window).width();
	
		if (tmpwinWidth > 1000) {
			w = 1000;
			h = 800; 
			tmpbgColor = "rgba(0, 255, 200, 0.75)";
		} else if (tmpwinWidth > 800) {
			w = 800;
			h = 800;
			tmpbgColor = "rgba(0, 200, 255, 0.75)";
		} else {
			w = 400;
			h = 300;
			tmpbgColor = "rgba(0, 200, 200, 0.75)";
		}

		$('.transition-canvas', this.$el).css( { width: w+'px' , height: h+'px', 'background-color': tmpbgColor} );
		
		console.log('resizing', $('.transition-canvas'));
	},

})