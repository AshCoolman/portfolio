App.IndexNavController = App.SmartController.extend({
	isShowStart: true,
	isShowEnd: false,
	label: 'IndexNavController',
	view_didInsertElement: function (aview) {
		this._super(aview);
		console.log('view IndexNavController_didInsertElement');
		this.send('IndexNavController_didInsertElement', this);
	},
	doStart: function () {
		App.eventMapper.trigger('indNav_start', {target:this});
	},
	doEnd: function () {
		App.eventMapper.trigger('indNav_end', {target:this});
	}
});

App.register('controller:index-nav', App.IndexNavController, {singleton: false }); 