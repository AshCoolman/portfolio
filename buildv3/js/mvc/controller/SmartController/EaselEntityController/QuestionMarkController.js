App.QuestionMarkController = App.EslEntityController.extend({
	className:'QuestionMarkController',
	label:'question-mark-controller',
	view_eslObjectCreated: function () {
		console.log('QM view_eslObjectCreated')
	}
});
App.register('controller:question-mark', App.QuestionMarkController, {singleton:false})