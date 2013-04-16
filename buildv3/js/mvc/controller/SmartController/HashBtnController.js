App.HashBtnController = App.SmartController.extend({
 	className: 'HashBtnController',
	label: undefined,
	urlhash: undefined,
	view_didInsertElement: function (aview) {
		this._super(aview);
		Em.assert('Variable "label" needs to be set on HashBtnController \ne.g. via Handlebars helper:\n\n\t{{controlWithVars \'hash-btn\' hashBtn urlhash="d1" label="Dimension 1"}}', this.label);
		Em.assert('Variable "urlhash" needs to be set on HashBtnController \ne.g. via Handlebars helper:\n\n\t{{controlWithVars \'hash-btn\' hashBtn urlhash="d1" label="Dimension 1"}}', this.urlhash);
		this.set('label', this.label);
		this.set('urlhash', this.urlhash);
		//console.log('didInsertElement label:', this.label);
	},
	doNavigate: function() {
		console.log('doNavigate label:', this.label, 'to', this.get('urlhash'));
		this.set('label', this.label);
		this.set('urlhash', this.urlhash);
		window.location.hash = this.urlhash;
	}
});
App.register('controller:hash-btn', App.HashBtnController, {singleton: false }); //Yeah holy shit that was not obvious