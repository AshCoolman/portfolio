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
		camera.position.set(WIDTH / 2, 0, 1000);
		

		var scene = this.scene = new THREE.Scene();

		// add the camera to the scene
		scene.add(camera);

		// the camera starts at 0,0,0
		// so pull it back

		// start the renderer
		renderer.setSize(WIDTH, HEIGHT);

		// attach the render-supplied DOM element
		this.$el.append(renderer.domElement);
		$(renderer.domElement).addClass('world-3d-renderer')

		
		
		
		// create a point light
		var pointLight =
		  new THREE.AmbientLight(0xFFFFFF);

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
		
		
		$(window).resize(function(me) {
		  	return function () {
				me.resize();
			}
		}(this));
		this.resize();
		
		// draw!
	},
	
	
	resize: function() {
		var w, 
			h, 
			trails = 0,
			tmpbgColor,
			renderer = this.renderer,
			camera = this.camera;
			
		this.tmpwinWidth = $(window).width();
		
		with (this) {	
			if (tmpwinWidth > 1000) {
				w = 1000;
				h = 800; 
				tmpbgColor = "rgba(200, 255, 200, " + (trails ? 1 / trails : 1) + ")";
			} else if (tmpwinWidth > 800) {
				w = 800;
				h = 800;
				tmpbgColor = "rgba(200, 200, 255, "+ (trails ? 1 / trails : 1) + ")";
			} else {
				w = 400;
				h = 300;
				tmpbgColor = "rgba(255, 200, 200, "+ (trails ? 1 / trails : 1) + ")";
			}
			$(renderer.domElement).attr( { width: w , height: h  } ).css( 'background-color', tmpbgColor );
		}
		renderer.setSize( w, h )
		camera.left = -w/2;
		camera.right = w/2;
		camera.top = h/2;
		camera.bottom = -h/2;	
		camera.position.set(w / 2, -h/2, 1000);
	    camera.updateProjectionMatrix();
	},
	
	redraw: function(dur) {
		this.renderer.render(this.scene, this.camera);
	},
	addE3d: function (obj3d) {
		this.scene.add(obj3d);
	},
	willDestroyElement: function () {
		//this.isAnimating = false;
		this._super();
		window.cancelAnimationFrame(this.get('raf'));
	}
});