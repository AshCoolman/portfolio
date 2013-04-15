PortfolioApp.EaselEntityContainerController = Em.ObjectController.extend({
	
	init: function () {
		console.log('*****EaselEntityController.init()');
		return this._super();
	},
	view_didInsertElement: function (aview) {
		//putting this in purely make sure it is not passed to World 2d Controller :/
		console.log('****putting this in purely make sure it is not passed to World 2d Controller :/');
		
		this.set('view', aview);
	},
	easelDisplayObjectCreatedByChildView: function (label, aview) {
		console.log('***EaselEntityContainerController.easelDisplayObjectCreatedByChildView()', label, aview)
		console.log("this.get('view').get('parentView')._debugContainerKey")	
	}
});