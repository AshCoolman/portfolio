
App.EaselEntManager = {
	addView: function(aview) {
		if ( this._view = aview) {
			this._createQ();
		}
		return this;
	},
	queue: function (info) {
		if (info)
			this._q.push(info);
			
		if (this._view) {			
			this._createQ();
		}
		return this;
	},
	_view: null,
	_q: [],
	_createQ: function () {
		this._q.forEach( function(me) {
			return function (eo, index, array) {
				console.log('hm', eo);
				me._view.addEaselEnt( eo.label, eo.childView );
			}
		}(this));
		
		this._q = [];
	}
}




App.World2dController = App.SmartController.extend({
	eeMgr: App.EaselEntManager,
	init: function () {
		App.eventMapper.addEventListener( 'world2dEditorAddCog', this, this.doWorld2dEditorAddCog );	
		App.eventMapper.addEventListener( 'easelCreatedByChildView', this, this.doEaselCreatedByChildView);
		return 	this._super();
	},
	view_didInsertElement: function ( childView ) {
		this._super( childView );
		this.eeMgr.addView( this.view );
	}, 
	doEaselCreatedByChildView: function ( atype, adata ) {
		console.log('doEaselCreatedByChildView type', atype);
			console.log('doEaselCreatedByChildView data	', adata);
		this.eeMgr.queue({ label: adata.label, childView: adata.childView });
	},
	doWorld2dEditorAddCog: function (atype, adata) {
		this.get('view').addCog();
	}
})


