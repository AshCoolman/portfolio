App.Dimension2NavController = App.SmartController.extend({
	isShowStart: false,
	isShowEnd: false,
	label: 'Dimension2NavController'
});
App.register('controller:dimension2-nav', App.Dimension2NavController, {singleton: false });