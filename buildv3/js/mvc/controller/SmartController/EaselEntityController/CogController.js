App.CogController = App.EaselEntityController.extend({
	label:'cog',
	view_didInsertElement: function (aview) {
		this._super(aview);
		App.eventMapper.addEventListener('w2dE_GetPlans', this, this.doGetPlans);
	},
	doGetPlans: function () {
		console.log('{{ renderWithVars "'+this.label+'" "'+this.label.camelize()+'" x="'+this.get('view').easelObj.x+'" y="'+this.get('view').easelObj.y+'"}}')
	}
});		
