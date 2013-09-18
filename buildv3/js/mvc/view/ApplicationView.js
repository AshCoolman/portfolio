/*jslint browser: true, nomen: true*/
/*global $, jQuery, App, Em, Ember, console*/
App.ApplicationView = Ember.View.extend({
  templateName: 'application',
	el: null, 
	$el: null,
	didInsertElement: function () {
		this._super();
		
		this.set('el', this.get('element'));
		this.set('$el', $(this.el));

		
	},
	
	willDestroyElement: function () {
		this._super();
		$(window).unbind('resize.ApplicationView');
	}
});