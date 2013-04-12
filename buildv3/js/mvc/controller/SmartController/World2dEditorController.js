PortfolioApp.World2dEditorController = PortfolioApp.SmartController.extend({
	addSquare: function() {
		console.log('+square');
		PortfolioApp.eventMapper.triggerEvent('heartbeat');
	}
})
