App.TransitionsHolderController = App.SmartController.extend({
	init: function () {
		
		App.eventMapper.addEventListener('doTransition', this, function (me) {
			return function () {
				me.doTransition();
			}
		}(this));
		
		return this._super();
	},
	
	doTransition: function () {
		this.view.doTransition();
	}
});