/*jslint browser: true, nomen: true*/
/*global $, jQuery, PortfolioApp, Em, console*/
PortfolioApp.SmartController = Em.ObjectController.extend({
	label: 'PortfolioApp.SmartController',
	autoMappedEvents: [],
	view_didInsertElement: function (aview) {
		var meObj, me;
		this.set('view', aview);
		
		for (me = 0; me < this.autoMappedEvents.length; me++) {
			meObj = this.autoMappedEvents[me];
			PortfolioApp.eventMapper.addEventListener(meObj.type, meObj.listener, meObj.callback);
		}
		
	},
	view_willDestroyElement: function () {
		for (var me=0; me < this.autoMappedEvents.length; me++) {
			PortfolioApp.eventMapper.removeEventListener(this.autoMappedEvents[me].type, this.autoMappedEvents[me].listener);
		}
		//this.autoMappedEvents = [];
	},
	addAutoMappedEvent: function (type, listener, callback) {
		Ember.assert('addAutoMappedEvents: "type" not string', (typeof type == 'string'));
		Ember.assert('addAutoMappedEvents: "listener" not string', (typeof listener == 'object'));
		Ember.assert('addAutoMappedEvents: "callback" not string', (typeof callback == 'function'));
		this.autoMappedEvents.push( {type:type, listener: listener, callback: callback} );
	}
});