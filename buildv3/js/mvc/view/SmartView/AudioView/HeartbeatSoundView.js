/*jslint browser: true, nomen: true*/
/*global $, jQuery, PortfolioApp, Em, Ember, console*/
PortfolioApp.HeartbeatSoundView = PortfolioApp.AudioView.extend({
	name: 'Heartbeat Sound View',
	templateName: 'heartbeat-sound',
	src: 'sound/heartbeat.wav',
	didInsertElement: function() {
		this.get('controller').set('view', this);
	},
	doHeartbeat: function () {
		this.play();
	}
});
	