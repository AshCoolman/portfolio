App.World2dEditorController = App.SmartController.extend({
	addCog: function() {
		App.eventMapper.triggerEvent(ragh.MEvt.create('w2dE_AddCog'));
	},	
	addPixel: function() {
		App.eventMapper.triggerEvent( ragh.MEvt.create('W2dE_addPixel'));
	},
	getAddedStaticPlans: function() {
		App.eventMapper.triggerEvent(ragh.MEvt.create('w2dE_GetPlans'));
	},
	renderTemplate: function () {
     	this.render("nav-list", {outlet: "nav-list"});
	}
})
