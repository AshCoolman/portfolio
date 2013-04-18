App.PixelController = App.EaselEntityController.extend({
	label: 'pixel',
	view_easelObjCreated: function () {
		App.eventMapper.addEventListener('w2dE_GetPlans', this, this.doGetPlans);
		App.eventMapper.triggerEvent(ragh.MEvt.create('viewAddedEasel', {label: this.label, view: this.get('view')}));
	},
	view_didInsertElement: function (aview) {
		this._super(aview);
		App.eventMapper.addEventListener('w2dE_GetPlans', this, this.doGetPlans);
	},
	doGetPlans: function () {
		var handle = this.get('view').handle;
		var shp = this.get('view').shp;
		console.log('{{ controlWithVars "'+this.label+'" '+this.label.split('-').join('')+' x='+handle.x+' y='+handle.y+' width='+shp.width+' height='+shp.height+'}}')
	}
});
App.register('controller:pixel', App.PixelController, {singleton: false }); //Yeah holy shit that was not obvious