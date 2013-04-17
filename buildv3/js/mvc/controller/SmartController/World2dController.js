
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
				me._view.addEaselEnt( eo.label, eo.view );
			}
		}(this));
		
		this._q = [];
	}
}




App.World2dController = App.SmartController.extend({
	eeMgr: App.EaselEntManager,
	init: function () {
		App.eventMapper.addEventListener( 'w2dE_AddCog', this, this.doW2dE_AddCog );
		App.eventMapper.addEventListener( 'W2dE_addPixel', this, this.doW2dE_addPixel );	
		
		App.eventMapper.addEventListener( 'viewAddedEasel', this, this.doViewAddedEasel);
		return 	this._super();
	},
	view_didInsertElement: function ( view ) {
		this._super( view );
		this.eeMgr.addView( this.view );
	}, 
	doViewAddedEasel: function ( atype, adata ) {
		this.eeMgr.queue({ label: adata.label, view: adata.view });
	},
	doW2dE_AddCog: function (atype, adata) {
		this.get('view').addCog();
	},
	doW2dE_addPixel: function  (atype, adata) {
		this.get('view').addPixel();
	}
})


