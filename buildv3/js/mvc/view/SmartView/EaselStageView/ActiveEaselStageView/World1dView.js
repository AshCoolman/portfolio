App.World1dView = App.ActiveEslStageView.extend({
	tagName:'div',
	className: 'World1dView',
	templateName:'world-1d',
	init: function() {	
		console.log('World1dView.init(): ' + this.eslEntities.join(', '));	
		return this._super();
	},
	redraw: function(dur) {
		this._super();
	}
});