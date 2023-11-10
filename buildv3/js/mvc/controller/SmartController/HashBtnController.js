App.HashBtnController = App.SmartController.extend({
 	className: 'HashBtnController',
	label: undefined,
	urlhash: undefined,
	routePath: undefined,
	view_didInsertElement: function (aview) {
		this._super(aview);
		Em.assert('Variable "label" needs to be set on HashBtnController \ne.g. via Handlebars helper:\n\n\t{{controlWithVars \'hash-btn\' hashBtn urlhash="d1" label="Dimension 1" routePath="dimension1"}}', this.label);
		Em.assert('Variable "urlhash" needs to be set on HashBtnController \ne.g. via Handlebars helper:\n\n\t{{controlWithVars \'hash-btn\' hashBtn urlhash="d1" label="Dimension 1" routePath="dimension1"}}', this.urlhash);
		Em.assert('Variable "routePath" needs to be set on HashBtnController \ne.g. via Handlebars helper:\n\n\t{{controlWithVars \'hash-btn\' hashBtn urlhash="d1" label="Dimension 1" routePath="dimension1"}}', this.routePath);
		
		this.set('label', this.label);
		this.set('urlhash', this.urlhash);
		
		App.eventMapper.addEventListener('doRoute', this, this.doRoute);
		
//		console.log('controller:application', Em.lookup('controller:application'))
	},
	
	doRoute: function(type, data) { 
		if (this.routePath == data.routePath) {
			this.get('view').doHide();
		} else {
			this.get('view').doShow();
		}
	},
	
	doNavigate: function() {
		this.set('label', this.label);
		this.set('urlhash', this.urlhash);
		window.location.hash = this.urlhash;
	},
	view_willDestroyElement: function () {
		this._super();
		App.eventMapper.removeEventListener('doRoute', this);
	}
});
App.register('controller:hash-btn', App.HashBtnController, {singleton: false }); 