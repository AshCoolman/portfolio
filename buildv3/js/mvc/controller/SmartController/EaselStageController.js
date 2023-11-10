App.EslStageController = App.SmartController.extend({
	pendingEE: [],
 	className: 'EslStageController',
	init: function () {
		return 	this._super();
	},
	view_didInsertElement: function ( view ) {
		this.pendingEE = [];
		App.eventMapper.addEventListener( 'eslViewAddedEsl', this, this.doEslViewAddedEsl);
		App.eventMapper.addEventListener( 'viewRemovedEsl', this, this.doViewRemovedEsl);
		this._super( view );
		this.tryProcessPendingEE();
	}, 
	view_willDestroyElement: function() {
		this._super();
		App.eventMapper.removeEventListener( 'eslViewAddedEsl', this);
		App.eventMapper.removeEventListener( 'viewRemovedEsl', this);
		this.pendingEE = [];
	},
	doEslViewAddedEsl: function ( atype, adata ) {
		this.pendingEE.push(adata);
		this.tryProcessPendingEE();
	},
	doViewRemovedEsl: function (atype, data) {
		this.pendingEE.filter(function(el) {
			return ( data.view != el.view );
		});
	},
	tryProcessPendingEE: function () {
		if (this.view) {
			if (!this.view.addEslEnt)  throw "EslStageController._processQ() the view ( subclass ) does not implememnt addEslEnt()"
			this.pendingEE.forEach( function(me) { 
				return function (eo, index, array) {
					me.view.addEslEnt( eo.label, eo.view, eo.parentEslObj );
				}
			}(this));
			this.pendingEE = [];
		} else {
			throw 'tryProcessPendingEE() view not set'
		}
	}
});
App.register('controller:esl-stage', App.EslStageController, {singleton: false})