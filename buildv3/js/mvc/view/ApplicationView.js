/*jslint browser: true, nomen: true*/
/*global $, jQuery, App, Em, Ember, console*/
App.ApplicationView = Ember.View.extend({
  templateName: 'application',
	didInsertElement: function () {
		this._super();
		
		this.el = this.get('element');
		this.$el = $(this.el);
		
		
		
	},
	
	willDestroyElement: function () {
		this._super();
		$(window).unbind('resize.ApplicationView');
	}
});