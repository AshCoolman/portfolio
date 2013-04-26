/*jslint browser: true, nomen: true*/
/*global $, jQuery, App, Em, Ember, console*/
App.HeartbeatFlashView = App.SmartView.extend({
	className: 'HeartbeatFlashView',
	templateName: 'heartbeat-flash',
	doHeartbeat: function () {
		this.$().removeClass('heartbeat-off');
		this.$().addClass('heartbeat-on');
		var scope = this;
		(function(){
			setTimeout((function(){
				scope.$().removeClass('heartbeat-on');
				scope.$().addClass('heartbeat-off');
			}), 1000);
		}());		

	}
});

