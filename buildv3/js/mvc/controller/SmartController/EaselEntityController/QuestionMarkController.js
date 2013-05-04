App.QuestionMarkController = App.EslEntityController.extend({
	className:'QuestionMarkController',
	label:'question-mark-controller',
	view_eslObjectCreated: function (acontroller) {
		this._super(acontroller);
	}
});
App.register('controller:question-mark', App.QuestionMarkController, {singleton:false})