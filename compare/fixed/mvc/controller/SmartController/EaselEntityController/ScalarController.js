App.ScalarController = App.EaselEntityController.extend({
 	label: 'ScalarController',
	startDrawing: function() {
		this.view.startDrawing();
	}
})
App.register('controller:scalar', App.ScalarController, {singleton: false }); //Yeah holy shit that was not obvious