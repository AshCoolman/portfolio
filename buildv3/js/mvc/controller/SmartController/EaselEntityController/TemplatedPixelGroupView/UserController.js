App.UserController = App.TemplatedPixelGroupController.extend({
	className:'UserController',
	label:'UserController',
	doActivate: function () {
		this.get('view').doActivate();
	}
});
App.register('controller:user', App.UserController, {singleton: false});