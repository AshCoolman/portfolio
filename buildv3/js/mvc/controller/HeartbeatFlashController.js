/*jslint browser: true, nomen: true*/
/*global $, jQuery, PortfolioApp, Em, console*/
PortfolioApp.HeartbeatFlashController = PortfolioApp.SmartController.extend({
	label: 'HeartbeatFlashController', 
	content: undefined,
	init: function () {
		this._super(); 
		PortfolioApp.eventMapper.addEventListener('heartbeat', this, this.doHeartbeat);
	},
	destroy: function () {
		PortfolioApp.eventMapper.removeEventListener('heartbeat', this);
		return this._super().destroy();
	},
	doHeartbeat: function (type, target) {
		target.get('view').doHeartbeat();
	}	
})