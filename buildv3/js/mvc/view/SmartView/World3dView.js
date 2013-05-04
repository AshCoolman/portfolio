App.World3dView = App.SmartView.extend({
	templateName: 'world-3d',
	className: 'World3dView', 
	label: 'world-3d-view',
	tag: 'canvas',
	materials: {},
	textures: {},
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
		//var camera = this.camera =  new THREE.PerspectiveCamera( VIEW_ANGLE,  ASPECT, NEAR,  FAR);
		
		var camera = this.camera = new THREE.OrthographicCamera( WIDTH / - 2, WIDTH / 2, HEIGHT / 2, HEIGHT / - 2, 1, 1000 );
		

		var scene = this.scene = new THREE.Scene();

		// add the camera to the scene
		scene.add(camera);

		// the camera starts at 0,0,0
		// so pull it back
		camera.position.z = 1000;

		// start the renderer
		renderer.setSize(WIDTH, HEIGHT);

		// attach the render-supplied DOM element
		this.$el.append(renderer.domElement);
		$(renderer.domElement).addClass('world-3d-renderer')
		
		
		
		
		
		
		
		// create a point light
		var pointLight =
		  new THREE.PointLight(0xFFFFFF);

		// set its position
		pointLight.position.x = 0;
		pointLight.position.y = 0;
		pointLight.position.z = -50;

		// add to the scene
		scene.add(pointLight);
		
		
		isAnimating = true;
		
		var rafFunction = function(me) {
			var animloop = function (time) {
		
						var dur = (this.lastRequestAnimationFrame) ? time - this.lastRequestAnimationFrame : 0;
						this.lastRequestAnimationFrame = time;
						me.redraw(dur);
						
						me.set('raf', window.requestAnimationFrame(animloop));	
					
				};
			return animloop
		}(this);
		
		
		this.set('raf', window.requestAnimationFrame(rafFunction));
		
		
		// draw!
	},
	redraw: function(dur) {
	this.renderer.render(this.scene, this.camera);
	},
	addE3d: function (obj3d) {
		this.scene.add(obj3d);
	}
});