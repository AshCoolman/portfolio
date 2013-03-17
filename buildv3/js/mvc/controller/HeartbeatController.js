/*jslint browser: true, nomen: true*/
/*global $, jQuery, PortfolioApp, Em, console*/
(function () {
	'use strict';
	PortfolioApp.HeartbeatController = Em.Controller.extend({
		label: 'HeartbeatController',
		timeout: null,
		total: 0,
		myView:null,
		init: function () {
			this._super();
		},
		destroy: function () {
			if (this.timeout) {
				this.timeout.clearTimeout();
			}
			return this._super().destroy();
		},
		doStart: function () {
			this.myView.doBeat();
			PortfolioApp.eventMapper.triggerEvent('d1Start');
			this.createHeartbeat(this);
		},
		createHeartbeat: function (target) {
			if (this.total < 25) {
				this.total++;
				(function(){
					target.timeout = setTimeout(function () {
						PortfolioApp.eventMapper.triggerEvent('heartbeat');
						target.createHeartbeat(target);
					}, 2500);
				}());
			}
		},
		view_didInsertElement: function (aview) {
			this.myView = aview;
		}
	});
}());