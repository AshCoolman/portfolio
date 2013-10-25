App.NavTabsController = Em.Controller.extend({
 	className: 'NavTabsController',

	doIndex: function() {
		window.location.hash = '';
	},

	doDimension1: function() {
		window.location.hash = 'd1';
	},

	doDimension2: function() {
		window.location.hash = 'd2';
	},
	
	doDimension3: function() {
		window.location.hash = 'd3';
	}
	
});
App.register('controller:nav-tabs', App.NavTabsController, {singleton: false });