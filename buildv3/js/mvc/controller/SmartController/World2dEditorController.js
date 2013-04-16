App.World2dEditorController = App.SmartController.extend({
	addCog: function() {
		App.eventMapper.triggerEvent(ragh.MEvt.create('world2dEditorAddCog'));
	},	
	getAddedStaticPlans: function() {
		App.eventMapper.triggerEvent(ragh.MEvt.create('world2dEditorGetAddedStaticPlans'));
	}
})
