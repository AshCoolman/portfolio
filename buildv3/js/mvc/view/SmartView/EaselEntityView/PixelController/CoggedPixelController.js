App.CoggedPixelController = App.PixelController.extend({
	label: 'CoggedPixelController',
	view_didInsertElement: function (aview) {
		this._super(aview);
		this.send('CoggedPixelControllerCreated', this); //todo this doesn't work?
 		//console.log('parentController', this.get('parent'));
		//this.get('parentController').CoggedPixelControllerCreated(this)
	},
	doOpen: function () {
		this.get('view').doOpen();
	}
})
App.register('controller:cogged-pixel', App.CoggedPixelController, {singleton:false});