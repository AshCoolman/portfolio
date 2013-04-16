App.CogController = App.EaselEntityController.extend({
	label:'cog',
	x: 0,
	y: 0,
	view_didInsertElement: function (aview) {
		this._super(aview);
		console.log('----');
		App.eventMapper.addEventListener('world2dEditorGetAddedStaticPlans', this, this.doGetAddedStaticPlans);
	},
	doGetAddedStaticPlans: function () {
		console.log('{{ renderWithVars "'+this.label+'" x="'+this.x+'"}}')
	},
	view_easelObjectCreated: function (aview) {
		var data = {label:this.label, childView:aview};
		console.log('CogController.view_easelObjectCreated()', data);
		App.eventMapper.triggerEvent(ragh.MEvt.create('easelCreatedByChildView', data));
	}	
});		
