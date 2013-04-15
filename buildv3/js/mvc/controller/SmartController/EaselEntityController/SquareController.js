PortfolioApp.SquareController = PortfolioApp.EaselEntityController.extend({
	init: function() {
		console.log('SquareController.init()')
		return this._super();
	},
	easelDisplayObjectCreatedByChildView: function (label, aview) {
		console.log('SquareController.easelDisplayObjectCreatedByChildView()', label, aview, this)
	}
});