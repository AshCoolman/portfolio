App.EslEntityController = App.SmartController.extend({
	label: 'esl-entity',
	className: 'EslEntityController',
	view_eslEntityCreated: function (eslEntityController) {
 		App.eventMapper.addEventListener('w2dE_GetPlans', eslEntityController, eslEntityController.override_doGetPlans);
		App.eventMapper.triggerEvent(ragh.MEvt.create('eslViewAddedEsl', {label: eslEntityController.label, view: eslEntityController.get('view'), parentEslObj: eslEntityController.get('view').parentEslObj}));

	},
	view_willDestroyElement: function () {
	//	App.eventMapper.triggerEvent(ragh.MEvt.create('viewRemoveEsl', {label: this.label, view: this.get('view')}));
	},
	override_doGetPlans: function () {
		throw 'EslEntityController.override_doGetPlans() is an abstract stub function. Must be overridden without a this._super() call';
	}
});
App.register('esl-entity', App.EslEntityController, {singleton: false }); 
