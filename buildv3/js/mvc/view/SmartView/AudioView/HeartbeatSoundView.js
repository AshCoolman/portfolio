/*jslint browser: true, nomen: true*/
/*global $, jQuery, App, Em, Ember, console*/
App.HeartbeatSoundView = App.AudioView.extend({
	name: 'Heartbeat Sound View',
	templateName: 'heartbeat-sound',
	src: 'sound/heartbeat.wav',
	didInsertElement: function() {
		this.get('controller').set('view', this);
	},
	doHeartbeat: function () {
		
		this.play();k
	}
});
	