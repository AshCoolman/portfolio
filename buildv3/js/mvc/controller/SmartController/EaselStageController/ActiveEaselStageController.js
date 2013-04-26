App.ActiveEaselStageController = App.EaselStageController.extend({
	className: 'ActiveEaselStageController',
	
	view_willDestroyElement: function () {
		this._super();
	}
});

App.register('controller:active-easel-stage', App.ActiveEaselStageController, {singleton:false})