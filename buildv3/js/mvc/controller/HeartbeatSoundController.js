/*jslint browser: true, nomen: true*/
/*global $, jQuery, PortfolioApp, Em, Ember, console*/
PortfolioApp.HeartbeatSoundController = PortfolioApp.AudioController.extend({
	label: 'HeartbeatSoundController',
	content: undefined,
	init: function () {
		this._super();
		PortfolioApp.eventMapper.addEventListener('heartbeat', this, this.doHeartbeat);
	},
	destroy: function () {
		PortfolioApp.eventMapper.removeEventListener('heartbeat', this);
		return this._super().destroy();
	},
	view_didInsertElement: function (aview) {
		this.set('view', aview);
	},
	doHeartbeat: function (type, target) {
		target.get('view').doHeartbeat();
	}
})