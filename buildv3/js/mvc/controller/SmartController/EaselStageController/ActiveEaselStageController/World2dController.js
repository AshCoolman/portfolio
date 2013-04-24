App.World2dController = App.ActiveEaselStageController.extend({
	label: 'World2dController',
	init: function () {
		App.eventMapper.addEventListener( 'w2dE_AddCog', this, this.doW2dE_AddCog );
		App.eventMapper.addEventListener( 'W2dE_addPixel', this, this.doW2dE_addPixel );	
		return 	this._super();
	},
	doW2dE_AddCog: function (atype, adata) {
		this.get('view').addCog();
	},
	doW2dE_addPixel: function  (atype, adata) {
		this.get('view').addPixel();
	}
})
App.register('controller:world2d', App.World2dController, {singleton:false})

