App.World2dEditorController = App.SmartController.extend({
	addCog: function() {
		App.eventMapper.trigger('w2dE_AddCog');
	},	
	addPixel: function() {
		App.eventMapper.trigger('W2dE_addPixel');
	},
	getAddedStaticPlans: function() {
		App.eventMapper.trigger('w2dE_GetPlans');
	}
})
