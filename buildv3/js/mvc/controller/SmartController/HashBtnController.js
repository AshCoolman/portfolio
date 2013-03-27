PortfolioApp.HashBtnController = PortfolioApp.SmartController.extend({
	content: undefined,
	urlhash: undefined,
	dammit: 'come on',
	label: 'first',
	view_didInsertElement: function () {
		this.set('label', this.label);
		this.set('urlhash', this.urlhash);
		console.log('didInsertElement label:', this.label);
	},
	doNavigate: function() {
		console.log('doNavigate label:', this.label);
		this.set('label', this.label);
		this.set('urlhash', this.urlhash);
		//window.location.hash = '/' + this.urlhash;
	}
});