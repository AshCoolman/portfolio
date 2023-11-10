App.AshController = App.EslEntityController.extend({
	className: 'AshController',
	label: 'AshController',
	doHammer: function () {
		this.get('view').doHammer();
	},
	removeHammer: function () {
		this.get('view').removeHammer();
	}
});
App.register('controller:ash', App.AshController, {singleton: false }); 
