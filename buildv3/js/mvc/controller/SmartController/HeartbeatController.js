/*jslint browser: true, nomen: true*/
/*global $, jQuery, App, Em, console*/
(function () {
	'use strict';
	App.HeartbeatController = App.SmartController.extend({
		label: 'HeartbeatController',
		timeout: null,
		total: 0,
		myView:null,
		speedFactors: [],
		doStart: function () {
			this.myView.doStart();
			App.eventMapper.triggerEvent('d1Start');
			this.createHeartbeat(this);
		},
		createHeartbeat: function (target) {
			var min = 1000,
				max = 3000,
				sf = 0,
				total = 0,
				prc = 1,
				delay = 0;
				
			for (sf = 0; sf < speedFactors.length; sf++) {
				var speedFactor = speedFactors[sf]();
				Ember.assert('App.HeartbeatController.createHeartbeat() speedFactor function does not return 0 - 1:' + speedFactor, (0 <= speedFactor && 1 >= speedFactor))
			}
			
			prc = total / speedFactors.length;
			delay = min + (prc * (max - min))
			
			if (this.total < 1) {
				this.total++;
				(function(){
					target.timeout = setTimeout(function () {
						App.eventMapper.triggerEvent(ragh.MEvt.create('heartbeat'));
						target.createHeartbeat(target);
					}, delay);
				}());
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

