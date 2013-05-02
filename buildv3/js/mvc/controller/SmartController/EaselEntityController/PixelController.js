App.PixelController = App.EslEntityController.extend({
	label: 'pixel',
	className: 'PixelController', 
	override_doGetPlans: function () {
		var handle = this.get('view').handle;
		var shp = this.get('view').shp;
		console.log('{{ controlWithVars "'+this.label+'" '+this.label.split('-').join('')+' x='+handle.x+' y='+handle.y+' width='+shp.width+' height='+shp.height+'}}')
	}
});
App.register('controller:pixel', App.PixelController, {singleton: false }); //Yeah holy shit that was not obvious