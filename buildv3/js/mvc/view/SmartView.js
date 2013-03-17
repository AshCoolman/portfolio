PortfolioApp.SmartView = Ember.View.extend({
	className: 'HeartbeatView',
	templateName: 'heartbeat',
	init: function () {
		this._super();
		var classes = this.get('parentView').get('classesToAdd');
		classes += " ember-view ember-text-field";
		this.set('classNames', Ember.makeArray(classes));	
	},
	didInsertElement: function () {
  		console.log(this.className, 'didInsertElement');
		this.get('controller').send('view_didInsertElement', this);
	},	
	destroy: function () {
		console.log('!! destroying HeartbeatView');
		return this._super().destroy();
	},
	doBeat: function() {
		console.log('beat',this.get('childViews'));
	}
});

