App.EaselEntityController = App.SmartController.extend({
	label: 'easel-entity',
	view_easelObjCreated: function () {
 		App.eventMapper.addEventListener('w2dE_GetPlans', this, this.override_doGetPlans);
		App.eventMapper.triggerEvent(ragh.MEvt.create('viewAddedEasel', {label: this.label, view: this.get('view')}));
	},
	override_doGetPlans: function () {
		throw 'EaselEntityController.override_doGetPlans() is an abstract stub function. Must be overridden without a this._super() call';
	}
});
App.register('easel-entity', App.EaselEntityController, {singleton: false }); //Yeah holy shit that was not obvious
