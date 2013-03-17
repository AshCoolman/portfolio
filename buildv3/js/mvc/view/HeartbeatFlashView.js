/*jslint browser: true, nomen: true*/
/*global $, jQuery, PortfolioApp, Em, Ember, console*/
PortfolioApp.HeartbeatFlashView = PortfolioApp.SmartView({
	name: 'HeartbeatFlashView',
	templateName: 'heatbeat-flash',
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

