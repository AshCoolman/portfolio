/*jslint browser: true, nomen: true*/
/*global $, jQuery, App, Em, Ember, console*/
App.ApplicationView = Ember.View.extend({
  templateName: 'application',
	didInsertElement: function () {
		this._super();
		
		this.el = this.get('element');
		this.$el = $(this.el);
		
		$(window).bind('resize.ApplicationView', function (me) {
			return function () {
				me.doResize();
			}
		}(this));
		
		
	},
	
	willDestroyElement: function () {
		this._super();
		$(window).unbind('resize.ApplicationView');
	},
	
	doResize: function (e) {
		var w, 
			h, 
			tmpbgColor,
			tmpwinWidth = $(window).width();
	
			if (tmpwinWidth > App.SIZE.W2) {
				w = App.SIZE.W2;
				h = App.SIZE.H2; 
				tmpbgColor = "rgba(200, 255, 200, 0.2)";
			} else if (tmpwinWidth > App.SIZE.W1) {
				w = App.SIZE.W1;
				h = App.SIZE.H1;
				tmpbgColor = "rgba(200, 200, 255, 0.2)";
			} else {
				w = App.SIZE.W0;
				h = App.SIZE.H0;
				tmpbgColor = "rgba(255, 200, 200, 0.2)";
			}

		$('.transition-canvas', this.$el).css( { width: w+'px' , height: h+'px', 'background-color': tmpbgColor} );

	}
});