/*jslint browser: true, nomen: true*/
/*global $, jQuery, PortfolioApp, Em, console*/
(function () {
	'use strict';
	PortfolioApp.HeartbeatController = PortfolioApp.SmartController.extend({
		label: 'HeartbeatController',
		timeout: null,
		total: 0,
		myView:null,
		init: function () {
			this._super();
		},
		doStart: function (arg1, arg2, arg3, arg4) {
			this.myView.doStart();
			this.myView.doBeat();
			PortfolioApp.eventMapper.triggerEvent('d1Start');
			this.createHeartbeat(this);
		},
		createHeartbeat: function (target) {
			if (this.total < 1) {
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
		},
		view_willDestroyElement: function () {
			if (typeof this.timeout == 'number') {
				clearTimeout(this.timeout);
			}
		}
	});
}());