App.ScalarController = App.EslEntityController.extend({
 	label: 'ScalarController',
	className: 'ScalarController',
	startDrawing: function() {
		this.view.startDrawing();
	}
})
App.register('controller:scalar', App.ScalarController, {singleton: false }); //Yeah holy shit that was not obvious