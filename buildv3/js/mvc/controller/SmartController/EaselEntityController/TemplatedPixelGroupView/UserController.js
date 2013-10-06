App.UserController = App.TemplatedPixelGroupController.extend({
	className:'UserController',
	label:'UserController'
});
App.register('controller:user', App.UserController, {singleton: false});