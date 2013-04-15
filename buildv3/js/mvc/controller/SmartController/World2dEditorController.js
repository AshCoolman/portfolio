PortfolioApp.World2dEditorController = PortfolioApp.SmartController.extend({
	addSquare: function() {
		PortfolioApp.eventMapper.triggerEvent('world2dEditorAddSquare');
	}
})
