/*jslint browser: true, nomen: true*/
/*global $, jQuery, App, Em, console*/
App.SmartController = Em.ObjectController.extend({
	label: 'App.SmartController',
	autoMappedEvents: [],
	isViewInserted: false,
	view_didInsertElement: function (aview) {
		
		if (!aview) throw 'SmartController.view_didInsertElement() did not recieve aview parameter';
		
		var meObj, me;
		this.set('view', aview);
		this.set('isViewInserted', true);
		 
 	
		for (me = 0; me < this.autoMappedEvents.length; me++) {
			meObj = this.autoMappedEvents[me];
			App.eventMapper.addEventListener(meObj.type, meObj.listener, meObj.callback);
		}
		
	},
	view_willDestroyElement: function () {
		for (var me=0; me < this.autoMappedEvents.length; me++) {
			App.eventMapper.removeEventListener(this.autoMappedEvents[me].type, this.autoMappedEvents[me].listener);
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

App.register('controller:smart-controller', App.SmartController, {singleton: false }); //Yeah holy shit that was not obvious