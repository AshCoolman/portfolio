App.World1dController = App.ActiveEslStageController.extend({
	label: 'World1Controller',
	lineEE: null,
	className: 'World1Controller'
})
App.register('controller:world1d', App.World1dController, {singleton:false})