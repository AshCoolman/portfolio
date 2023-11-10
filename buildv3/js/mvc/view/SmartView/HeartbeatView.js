App.HeartbeatView = App.SmartView.extend({
	className:'HeartbeatView',
	templateName:'heartbeat',
	didInsertElement: function() {
 	
		this.get('controller').send('view_didInsertElement', this);
	},
	doStart: function () {
		this.$().find('.nav-btn').css('display', 'none');
	}
});
