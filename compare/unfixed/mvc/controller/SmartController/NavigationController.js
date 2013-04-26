App.NavigationController = App.SmartController.extend({
	className:'NavigationController',
	isShowIndex:false,
	isDimension1:false,
	isDimension2:false,
	view_willDestroyElement: function(aview) {
	this.set('isShowIndex', undefined);
	this.set('isDimension1',  undefined);
	this.set('isDimension2', undefined);
	 this._super(aview);
	}
});

App.register('controller:navigation', App.NavigationController, {singleton:false})