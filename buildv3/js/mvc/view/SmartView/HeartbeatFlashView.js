/*jslint browser: true, nomen: true*/
/*global $, jQuery, PortfolioApp, Em, Ember, console*/
PortfolioApp.HeartbeatFlashView = PortfolioApp.SmartView.extend({
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

