/*jslint browser: true, nomen: true*/
/*global $, jQuery, PortfolioApp, Em, console*/
PortfolioApp.SmartController = Em.Controller.extend({
	label: 'PortfolioApp.SmartController', 
	view_didInsertElement: function (aview) { 
		this.set('view', aview);
	}
})