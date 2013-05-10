App.World3dView = App.SmartView.extend({
	templateName: 'world-3d',
	className: 'World3dView', 
	label: 'world-3d-view',
	tag: 'canvas',
	materials: {},
	textures: {},
	VS: 10,
	didInsertElement: function () {
		this.tryIntersect = [];
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
		var renderer = this.renderer = new THREE.WebGLRenderer( {  antialias: true, preserveDrawingBuffer: true });
		//var camera = this.camera =  new THREE.PerspectiveCamera( VIEW_ANGLE,  ASPECT, NEAR,  FAR);
		
		var camera = this.camera = new THREE.OrthographicCamera( WIDTH / - 2, WIDTH / 2, HEIGHT / 2, HEIGHT / - 2, 1, 5000 );
		var controls = this.controls = new THREE.TrackballControls( camera );
		controls.target.set( 0, 0, 0 )
		
		
		
		controls.rotateSpeed = 1.0;
		controls.zoomSpeed = 1.2;
		controls.panSpeed = 0.8;
		controls.noZoom = false;
		controls.noPan = false;
		controls.staticMoving = true;
		controls.dynamicDampingFactor = 0.3;
		controls.keys = [ 65, 83, 68 ];
		controls.addEventListener( 'change', function(me) {
			return function() {
				this.redraw;
			}
		}(this) );
		
		
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
		
		// picking
		var projector = this.projector = new THREE.Projector();
		
		// create a point light
		var light = new THREE.AmbientLight(0x333333);

		// set its position
		light.position.x = 0;
		light.position.y = 0;
		light.position.z = 50;

		// add to the scene
		//scene.add(light);
		
		var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
		directionalLight.position.set( 0, 0, 1 );
		scene.add( directionalLight );
		this.cubeGroup=null;
		//scene.add(this.cubeGroup = CubeGroup.createFromMap());
		//this.recursivelyGetChildren(this.cubeGroup.children, this.tryIntersect);
		// grid
		this.cursor3d = new THREE.Mesh(new THREE.SphereGeometry(15, 10, 10), new THREE.MeshNormalMaterial());
		this.cursor3d.add(new THREE.PointLight(0x00FF00));
		this.cursor3d.overdraw = true;
		this.scene.add(this.cursor3d);
						
						
		isAnimating = true;
		
		
		this.mouse2D = new THREE.Vector3( 0, 10000, 0.5 );
	
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
		
		this.el.addEventListener( 'mousemove', function(me) {
				return function (event) {
					me.onDocumentMouseMove(event);
				}
			}(this), false );
		this.el.addEventListener( 'mousedown', function (me) {
				return function (event) {
					me.onDocumentMouseDown(event);
				}
			}(this), false );
						
		$(window).resize(function(me) {
		  	return function () {
				me.resize();
			}
		}(this));
		this.resize();
		
		// draw!
		this.voxelPosition = new THREE.Vector3();
		this.tmpVec = new THREE.Vector3();
		this.normalMatrix = new THREE.Matrix3();
		
		
		this.$el.append('<canvas class="temp">');
		this.tcanvas = $('canvas.temp', this.$el)[0]
		console.log('this.tcanvas', this.tcanvas);

		var img = App.static_preloader.queue.getResult('face-ash-pixel');
		setTimeout( function (me) {
			return  function() {
					me.createFromImage(img);
			}
		}(this), 100);
	},
	
	
	createFromImage: function(img) {
		if (!this.tcanvas.getContext) {
			console.log('faail')
			setTimeout( function (me) {
				return  function() {
						me.createFromImage(img);
				}
			}(this), 1000);
		} else {		
			
			var map = [[[]]],
				w=12,
				h=12,
				pixel,
				c = this.tcanvas,
				ctx=c.getContext("2d");
		
			ctx.drawImage(img,0,0);

			var imgData=ctx.getImageData(0,0,w,h);
			var id = imgData.data;
			for (var i = 0 ; i < id.length;i+=4) {
				pixel = i / 4;
				if (id[i+3] == 255) {
					var x = pixel % w;
					var y = Math.floor(pixel / w);
					if (!map[x]) map[x]=[];
					if (!map[x][y]) map[x][y]=[];
					var r = id[i+0]
					var g = id[i+1]
					var b = id[i+2]

					var decColor = b + 256 * g + 65536 * r;
					decColor = decColor.toString(16);
					
					map[x][y][0] = {color: '#'+decColor};
					console.log(pixel, x, y, map[x][y][0])
				}
			}
			console.log(map)
			this.scene.add(this.cubeGroup = CubeGroup.createFromMap(map));
		
		}
				
	},
	
	 recursivelyGetChildren: function(sceneChild, list) {	
		
	  for (var i = 0, il = sceneChild.length; i < il; ++i) {
		
	    var obj = sceneChild[i];
	    list.push(obj);
	    if (obj.children.length > 0) {
			( function (me) {
				me.recursivelyGetChildren(obj.children, list);
			}(this) );
	    }
	  }
	},
	
	onDocumentMouseMove: function ( event ) {
		event.preventDefault();
		var perc = ( event.clientX / window.innerWidth )
			if (!window.evented) {
				window.evented = true;
			}
			this.mouse2D.x = ( event.layerX / this.w) * 2 - 1;
			this.mouse2D.y = - ( event.layerY / this.h ) * 2 + 1;
		
	},
	onDocumentMouseDown: function ( event ) {
		with (this) {
			event.preventDefault();
			
			var intersects = raycaster.intersectObjects( cubeGroup.children, true );
			if ( intersects.length > 0 ) {
				intersector = getRealIntersector( intersects );
				// delete cube
				if (false) {//if ( isCtrlDown ) {
					if ( intersector.object != plane ) {
						scene.remove( intersector.object );
					}
				// create cube
				} else {
					intersector = getRealIntersector( intersects );
					if ( intersector ) {
						CubeGroup.tryAddHere(intersector);
					}
					
				}
			}
		}
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
	
		this.w = w;
		this.h = h;
		
		this.controls.handleResize()
		
	},
	
	redraw: function(dur) {
		
		with (this) {
			if (cubeGroup) {
				raycaster = projector.pickingRay( mouse2D.clone(), camera )	;
				var intersects = raycaster.intersectObjects( cubeGroup.children, true );
	
				if ( intersects.length > 0 ) {
					intersector = getRealIntersector( intersects );
					if ( intersector ) {
						setVoxelPosition( intersector );
						this.cursor3d.position = voxelPosition;
						CubeGroup.show(intersector);
					}
				}
			}
			renderer.render( scene, camera);
		}				
		this.controls.update();
	},
	getRealIntersector: function( intersects ) {
		for( i = 0; i < intersects.length; i++ ) {
			intersector = intersects[ i ];
			if ( 	intersector.object != CubeGroup.rollOverMesh ) {
				return intersector;
			}
		}
		return null;
	},
	setVoxelPosition: function ( intersector ) {
		with (this) {	
			
			//normalMatrix was new Matrix3()
			normalMatrix.getNormalMatrix( intersector.object.matrixWorld );
			tmpVec.copy( intersector.face.normal );
			tmpVec.applyMatrix3( normalMatrix ).normalize();
			voxelPosition.addVectors( intersector.point, tmpVec );
			voxelPosition.x = Math.floor( voxelPosition.x / this.VS ) * this.VS + this.VS/2;
			voxelPosition.y = Math.floor( voxelPosition.y / this.VS ) * this.VS + this.VS/2;
			voxelPosition.z = Math.floor( voxelPosition.z / this.VS ) * this.VS + this.VS/2;

		}
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



