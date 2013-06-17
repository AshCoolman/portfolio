App.NavListController = Em.Controller.extend({
 	className: 'NavListController',
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
App.register('controller:nav-list', App.NavListController, {singleton: false });