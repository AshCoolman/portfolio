App.World1dController = App.ActiveEaselStageController.extend({
	label: 'World1Controller',
	lineEE: null,
	init: function () {
		console.log('init World1Controller')
		return this._super();
	}
	
})
App.register('controller:world1d', App.World1dController, {singleton:false})