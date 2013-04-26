/*jslint browser: true, nomen: true*/
/*global $, jQuery, App, Em, Ember, console*/
App.HeartbeatSoundController = App.AudioController.extend({
	label: 'HeartbeatSoundController',
	content: undefined,
	init: function () {
		this._super();
		this.addAutoMappedEvent('heartbeat', this, this.doHeartbeat);
	},
	destroy: function () {
		App.eventMapper.removeEventListener('heartbeat', this);
		return this._super().destroy();
	},
	view_didInsertElement: function (aview) {
		this.set('view', aview);
	},
	doHeartbeat: function (type, data) {
		this.get('view').doHeartbeat();
	}
})