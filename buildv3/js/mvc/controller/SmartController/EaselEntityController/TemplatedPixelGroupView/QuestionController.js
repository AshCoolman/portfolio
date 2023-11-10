App.QuestionController = App.TemplatedPixelGroupController.extend({
	className:'QuestionController',
	label:'QuestionController'
});
App.register('controller:question', App.QuestionController, {singleton: false});