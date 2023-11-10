App.EaselStageController = App.SmartController.extend({
	pendingEE: [],
	init: function () {
		this.pendingEE=[]
		App.eventMapper.addEventListener( 'viewAddedEasel', this, this.doViewAddedEasel);
		return 	this._super();
	},
	view_didInsertElement: function ( view ) {
		this._super( view );
		this.tryProcessPendingEE();
	}, 
	doViewAddedEasel: function ( atype, adata ) {
		this.pendingEE.push({ label: adata.label, view: adata.view });
		this.tryProcessPendingEE();
	},
	tryProcessPendingEE: function () {
		if (this.view) {
			if (!this.view.addEaselEnt)  throw "EaselStageController._processQ() the view ( subclass ) does not implememnt addEaselEnt()"
			this.pendingEE.forEach( function(me) { return function (eo, index, array) {
					me.view.addEaselEnt( eo.label, eo.view );
			}}(this));
			this.pendingEE = [];
		}
	}
});
	App.register('controller:easel-stage', App.EaselStageController, {singleton: false }); //Yeah holy shit that was not obvious