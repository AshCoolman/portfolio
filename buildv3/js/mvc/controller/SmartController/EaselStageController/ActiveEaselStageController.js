App.ActiveEslStageController = App.EslStageController.extend({
	className: 'ActiveEslStageController',
	
	view_willDestroyElement: function () {
		this._super();
	}
});

App.register('controller:active-esl-stage', App.ActiveEslStageController, {singleton:false})