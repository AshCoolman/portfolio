PortfolioApp.HeartbeatView = Ember.View.extend({
	className:'HeartbeatView',
	templateName:'heartbeat',
	didInsertElement: function() {
  		console.log(this.className, 'didInsertElement');
		this.get('controller').send('view_didInsertElement', this);
	},	
	destroy: function () {
		console.log('!! destroying HeartbeatView');
		return this._super().destroy();
	},
	doBeat:function() {
		console.log('beat',this.get('childViews'));
	}
});
