/*jslint browser: true, nomen: true*/
/*global $, jQuery, App, Em, console*/
App.HeartbeatFlashController = App.SmartController.extend({
	label: 'HeartbeatFlashController', 
	content: undefined,
	init: function () {
		this.autoMappedEvents.push( {type: 'heartbeat', listener: this, callback: this.doHeartbeat} );
		//this.addMappedEvent('heartbeat', this, this.doHeartbeat);
		return this._super();
	},
	doHeartbeat: function (atype, adata) {
		this.get('view').doHeartbeat();
	}
})