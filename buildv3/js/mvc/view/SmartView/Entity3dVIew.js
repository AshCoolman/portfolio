App.Entity3dView = App.SmartView.extend({
	templateName: 'entity-3d',
	didInsertElement: function () {
		this._super();
		
		
		
		// create the sphere's material
		var sphereMaterial =
		  new THREE.MeshLambertMaterial(
		    {
		      color: 0xCC0000
		    });
		
		
		
		
		// set up the sphere vars
		var radius = 50,
		    segments = 16,
		    rings = 16;

		// create a new mesh with
		// sphere geometry - we will cover
		// the sphereMaterial next!
		var sphere = new THREE.Mesh(

		  new THREE.SphereGeometry(
		    radius,
		    segments,
		    rings),

		  sphereMaterial);

		// add the sphere to the scene
		App.world3d.addE3d(sphere);
		
		this.override_3dCreate();
	},
	override_3dCreate: function () {
		var map = [
		'__XXXXXX',
		'_XXX____',
		'_XX_____',
		'X_______',
		];
		
	
		for (var p=0; p<map.length; p++) {
			map[p] = map[p].split('');
		}
		console.log(map)
	},
	override_3dUpdate: function () {
		
	}
	
})