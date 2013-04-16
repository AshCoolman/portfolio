App.NavigationController = App.SmartController.extend({
	className:'NavigationController',
	isIndex:false,
	isDimension1:false,
	isDimension2:false,
	view_willDestroyElement: function(aview) {
	this.set('isIndex', undefined);
	this.set('isDimension1',  undefined);
	this.set('isDimension2', undefined);
	 this._super(aview);
	}
});