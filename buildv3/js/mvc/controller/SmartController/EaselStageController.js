App.EaselStageController = App.SmartController.extend({
	pendingEE: [],
 	className: 'EaselStageController',
	init: function () {
		return 	this._super();
	},
	view_didInsertElement: function ( view ) {
		console.log('Stage.inserted() Processing')
		this.pendingEE = [];
		App.eventMapper.addEventListener( 'viewAddedEasel', this, this.doViewAddedEasel);
		App.eventMapper.addEventListener( 'viewRemovedEasel', this, this.doViewRemovedEasel);
		this._super( view );
		this.tryProcessPendingEE();
	}, 
	view_willDestroyElement: function() {
		console.log('Stage willDestroy() unlistening');
		this._super();
		App.eventMapper.removeEventListener( 'viewAddedEasel', this);
		App.eventMapper.removeEventListener( 'viewRemovedEasel', this);
		this.pendingEE = [];
	},
	doViewAddedEasel: function ( atype, adata ) {
		console.log('Stage.adding() Processing', adata);
		this.pendingEE.push({ label: adata.label, view: adata.view });
		this.tryProcessPendingEE();
	},
	doViewRemovedEasel: function (atype, data) {
		this.pendingEE.filter(function(el) {
			return ( data.view != el.view );
		});
	},
	tryProcessPendingEE: function () {
		if (this.view) {
			if (!this.view.addEaselEnt)  throw "EaselStageController._processQ() the view ( subclass ) does not implememnt addEaselEnt()"
			this.pendingEE.forEach( function(me) { return function (eo, index, array) {
					me.view.addEaselEnt( eo.label, eo.view );
			}}(this));
			this.pendingEE = [];
		} else {
			throw 'tryProcessPendingEE() view not set'
		}
	}
});
App.register('controller:easel-stage', App.EaselStageController, {singleton: false})