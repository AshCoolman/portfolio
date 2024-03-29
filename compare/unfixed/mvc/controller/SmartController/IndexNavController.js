App.IndexNavController = App.SmartController.extend({
	isShowStart: true,
	isShowEnd: false,
	label: 'IndexNavController',
	view_didInsertElement: function (aview) {
		this._super(aview);
		this.send('IndexNavController_didInsertElement', this);
	},
	doStart: function () {
		App.eventMapper.triggerEvent(ragh.MEvt.create('indNav_start', {target:this}));
		
	},
	doEnd: function () {
		App.eventMapper.triggerEvent(ragh.MEvt.create('indNav_end', {target:this}));
	}
});

App.register('controller:index-nav', App.IndexNavController, {singleton: false }); //Yeah holy shit that was not obvious