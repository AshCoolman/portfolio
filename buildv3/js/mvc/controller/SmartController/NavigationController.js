App.NavigationController = App.SmartController.extend({
	className:'NavigationController',
	view_willDestroyElement: function(aview) {
	 this._super(aview);
	}
});

App.register('controller:navigation', App.NavigationController, {singleton:false})