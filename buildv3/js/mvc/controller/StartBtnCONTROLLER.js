PortfolioApp.StartBtnController = Ember.Controller.extend({
	content:undefined,
	doStart: function() {
		console.log('D1 btn pushed', this.content);
		window.location.hash = '/d1';
	}
});