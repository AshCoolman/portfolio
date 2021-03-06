App.World2dController = App.ActiveEslStageController.extend({
	label: 'World2dController',
	className: 'World2dController',
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
	},
	view_willDestroyElement: function () {
		this._super();
		App.eventMapper.removeEventListener( 'w2dE_AddCog', this );
		App.eventMapper.removeEventListener( 'W2dE_addPixel', this );
	},
	addQuestionMark: function () {
		this.get('view').addQuestionMark();
	}
})
App.register('controller:world2d', App.World2dController, {singleton:false})

