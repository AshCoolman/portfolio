/*jslint browser: true, nomen: true*/
/*global $, jQuery, App, Em, console*/
(function () {
	'use strict';
	App.HeartbeatController = App.SmartController.extend({
		label: 'HeartbeatController',
		timeout: null,
		totalHeartbeats: 0,
		MAX_HEARTBEATS: 20,
		myView:null,
		speedFactors: [],
		createHeartbeat: function () {
			
				
			var min = 1000,
				max = 3000,
				sf = 0,
				prc = 1,
				delay = 1000,
				speedFactors = this.speedFactors;
				
				App.eventMapper.trigger('heartbeat', {target: this});
				
			for (sf = 0; sf < speedFactors.length; sf++) {
				var speedFactor = speedFactors[sf]();
				Ember.assert('App.HeartbeatController.createHeartbeat() speedFactor function does not return 0 - 1:' + speedFactor, (0 <= speedFactor && 1 >= speedFactor))
			}
			
			prc = (speedFactors.length == 0) ? 1 : totalHeartbeats / speedFactors.length;
			delay = min + (prc * (max - min))
			
			if (this.totalHeartbeats < this.MAX_HEARTBEATS) {
				this.totalHeartbeats++;		
				this.timeout = setTimeout(function (me) {
						return function () {
							me.createHeartbeat(me);
						}
				}(this), delay);
				
			}
		},
		view_didInsertElement: function (aview) {
			this._super(aview);
			this.myView = aview;
		},
		view_willDestroyElement: function () {
			if (typeof this.timeout == 'number') {
				clearTimeout(this.timeout);
			}
		}
	});
}());

