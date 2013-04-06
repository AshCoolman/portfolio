PortfolioApp.NavigationController = PortfolioApp.SmartController.extend({
	className:'NavigationController',
	isIndex:false,
	isDimension1:false,
	isDimension2:false,
	view_willDestroyElement: function() {
	this.set('isIndex', undefined);
	this.set('isDimension1',  undefined);
	this.set('isDimension2', undefined);
	}
});