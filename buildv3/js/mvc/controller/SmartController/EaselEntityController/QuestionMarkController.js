App.QuestionMarkController = App.EslEntityController.extend({
	className:'QuestionMarkController',
	label:'QuestionMarkController',
	view_eslEntityCreated: function (acontroller) {
		this._super(acontroller);
	},
	setVisible: function (val) {
		this.get('view').doShowPixelInChildren();
	}
});
App.register('controller:question-mark', App.QuestionMarkController, {singleton:false})