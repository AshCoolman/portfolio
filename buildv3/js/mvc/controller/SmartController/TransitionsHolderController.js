App.TransitionsHolderController = App.SmartController.extend({
	init: function () {
		
		App.eventMapper.addEventListener('doTransition', this, function (me) {
			return function (atype, adata) {
				me.doTransition(adata.$canvas);
			}
		}(this));
		
		return this._super();
	},
	
	doTransition: function ($acavas) {
		this.view.doTransition($acavas);
	}
});