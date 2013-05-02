App.AshController = App.EslEntityController.extend({
	className: 'AshController',
	label: 'ash'
});
	App.register('controller:ash', App.AshController, {singleton: false }); //Yeah holy shit that was not obvious
