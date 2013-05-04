App.World3dView = App.SmartView.extend({
	className: 'World3dView', 
	label: 'world-3d-view',
	tag: 'canvas',
	didInsertElement: function () {
		this._super();
		
		App.world3d = this;
		// set the scene size
		var WIDTH = 400,
		  HEIGHT = 300;

		// set some camera attributes
		var VIEW_ANGLE = 45,
		  ASPECT = WIDTH / HEIGHT,
		  NEAR = 0.1,
		  FAR = 10000;

		// get the DOM element to attach to
		// - assume we've got jQuery to hand


		// create a WebGL renderer, camera
		// and a scene
		var renderer = this.renderer = new THREE.WebGLRenderer();
		var camera =
		  new THREE.PerspectiveCamera(
		    VIEW_ANGLE,
		    ASPECT,
		    NEAR,
		    FAR);

		var scene = this.scene = new THREE.Scene();

		// add the camera to the scene
		scene.add(camera);

		// the camera starts at 0,0,0
		// so pull it back
		camera.position.z = 300;

		// start the renderer
		renderer.setSize(WIDTH, HEIGHT);

		// attach the render-supplied DOM element
		this.$el.append(renderer.domElement);
		
		
		
		
		
		
		
		
		// create a point light
		var pointLight =
		  new THREE.PointLight(0xFFFFFF);

		// set its position
		pointLight.position.x = 10;
		pointLight.position.y = 50;
		pointLight.position.z = 130;

		// add to the scene
		scene.add(pointLight);
		
		
		
		// draw!
		renderer.render(scene, camera);
	},
	addE3d: function (obj3d) {
		this.scene.add(obj3d);
		this.renderer.render(scene, camera);
	}
});