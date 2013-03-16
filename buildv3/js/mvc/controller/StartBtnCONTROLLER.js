PortfolioApp.StartBtnController = Ember.Controller.extend({
	content:undefined,
	doStart: function() {
		console.log('Start btn pushed', this.content);
		window.location.hash = '/d1';
	}
});