PortfolioApp.EaselEntityView = PortfolioApp.SmartView.extend({
	easelObj: null,
	tag: 'div',
	className: 'EaselEntityView',
	init: function () {
		return this._super();
		//this.__defineGetter__"easelObj", function
	},
	didInsertElement: function () {
		PortfolioApp.eventMapper
	},
	redraw: function () {
		
	}
});