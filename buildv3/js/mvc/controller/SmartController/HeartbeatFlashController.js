/*jslint browser: true, nomen: true*/
/*global $, jQuery, PortfolioApp, Em, console*/
PortfolioApp.HeartbeatFlashController = PortfolioApp.SmartController.extend({
	label: 'HeartbeatFlashController', 
	content: undefined,
	init: function () {
		this.autoMappedEvents.push( {type: 'heartbeat', listener: this, callback: this.doHeartbeat} );
		//this.addMappedEvent('heartbeat', this, this.doHeartbeat);
		return this._super();
	},
	doHeartbeat: function (type, target) {
		this.get('view').doHeartbeat();
	}
})