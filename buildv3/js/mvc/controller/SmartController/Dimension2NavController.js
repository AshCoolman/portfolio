App.Dimension2NavController = App.SmartController.extend({
	isShowStart: false,
	isShowEnd: false,
	label: 'Dimension2NavController',
	doEnd: function () {
		App.eventMapper.triggerEvent(ragh.MEvt.create('dim1Nav_end'));
	}
});
App.register('controller:dimension2-nav', App.Dimension2NavController, {singleton: false });