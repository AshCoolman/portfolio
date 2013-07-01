App.World3dView = App.SmartView.extend({
	templateName: 'world-3d',
	className: 'World3dView', 
	label: 'world-3d-view',
	tag: 'canvas',
	materials: {},
	textures: {},
	VS: 10,
	isControls:false,
	didInsertElement: function () {
		
		this._super();
		this.tryIntersect = [];
		this.$el.css('display', 'none');

		App.world3d = this;
		
		// set the scene size
		var WIDTH = 400,
			HEIGHT = 300,
			// set some camera attributes
			VIEW_ANGLE = 45,
			ASPECT = WIDTH / HEIGHT,
			NEAR = 0.1,
			FAR = 10000;
			
			

		var scene = this.scene = new THREE.Scene();
		var renderer = this.renderer = new THREE.WebGLRenderer( {  antialias: true, preserveDrawingBuffer: true });
		this.$el.append(renderer.domElement);
		$(renderer.domElement).addClass('world-3d-renderer')
			
		var camera = this.camera = new THREE.OrthographicCamera( WIDTH / - 2, WIDTH / 2, HEIGHT / 2, HEIGHT / - 2, 1, 5000 );
		camera.position.set(WIDTH / 2, 0, 1000);
		scene.add(camera);	
		
		if (this.isControls) {
			var controls = this.controls = new THREE.TrackballControls( camera );
			controls.target.set( 0, 0, 0 )
			controls.rotateSpeed = 1.0;
			controls.zoomSpeed = 1.2;
			controls.panSpeed = 0.8;
			controls.noZoom = false;
			controls.noPan = false;
			controls.staticMoving = true;
			controls.dynamicDampingFactor = 0.0;
			controls.keys = [ 65, 83, 68 ]; //a s d
			controls.addEventListener( 'change', function(me) { return function() { this.redraw; } }(this) );
		}
		
		var light = new THREE.AmbientLight(0x333333).position.copy(new THREE.Vector3(0, 0, 50));
		scene.add( light );
		
		var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
		directionalLight.position.set( 0, 0, 1 );
		scene.add( directionalLight );
	
		
		if (App.DEBUG) {
			this.cursor3D = new THREE.Mesh(new THREE.SphereGeometry(15, 10, 10), new THREE.MeshNormalMaterial());
			cursor3D.add(new THREE.PointLight(0x00FF00));
		} else {
			this.cursor3D = new THREE.Object3D();
		}
		var cursor3D = this.cursor3D;
		cursor3D.overdraw = true;
		scene.add(cursor3D);
			
		var mouse2D = this.mouse2D = new THREE.Vector3( 0, 10000, 0.5 );
		var pickProjector = this.pickProjector = new THREE.Projector();
		
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
						
		$(window).bind('resize.world3d', function(me) {
		  	return function () {
				me.resize();
			}
		}(this));
		
		this.resize();

		var img = App.static_preloader.queue.getResult('face-ash-pixel');
		setTimeout( function (me) {
			return  function() {
					me.createFromImage(img);
					App.transitionView.hide();
			}
		}(this), 100);
	},
	
	
	createFromImage: function (img) {
		
		this.voxelPosition = new THREE.Vector3();
		this.tmpVec = new THREE.Vector3();
		this.normalMatrix = new THREE.Matrix3();
		this.$el.append('<canvas class="temp">');
		this.$tcanvas = $('canvas.temp', this.$el).css('display', 'none')
		this.tcanvas = this.$tcanvas[0];
		
		if (!this.tcanvas.getContext) {
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
				ctx=c.getContext("2d"),
				imgData,
				id;
		
			ctx.drawImage( img, 0, 0 );
			imgData = ctx.getImageData( 0, 0, w, h );
			id = imgData.data;
			for (var i = 0 ; i < id.length;i+=4) {
				pixel = i / 4;
				if (id[i+3] == 255) {
					var x = pixel % w;
					var y = Math.floor(pixel / w);
					if (!map[x]) map[x]=[];
					if (!map[x][y]) map[x][y]=[];
					var decColor = ( 65536 * id[i+0] + 256 * id[i+1] + id[i+2] ).toString(16);
					map[x][y][0] = {color: '#'+decColor};
				}
			}
			this.scene.add(this.cubeGroup = CubeGroup.createFromMap(map));
			this.$el.css('display', 'block');
		}	
	},
	
	/*
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
	*/
	
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
			camera = this.camera,
			tmpwinWidth = this.tmpwinWidth = $(window).width();

	
		if (tmpwinWidth > App.BREAKPOINT.WIDTH_2) {
			w = App.BREAKPOINT.WIDTH_2;
			h = App.BREAKPOINT.HEIGHT_2; 
			tmpbgColor = "rgba(200, 255, 200, " + (trails ? 1 / trails : 1) + ")";
		} else if (tmpwinWidth > App.BREAKPOINT.WIDTH_1) {
			w = App.BREAKPOINT.WIDTH_1;
			h = App.BREAKPOINT.HEIGHT_1;
			tmpbgColor = "rgba(200, 200, 255, "+ (trails ? 1 / trails : 1) + ")";
		} else {
			w = App.BREAKPOINT.WIDTH_0;
			h = App.BREAKPOINT.HEIGHT_0;
			tmpbgColor = "rgba(255, 200, 200, "+ (trails ? 1 / trails : 1) + ")";
		}

		$(renderer.domElement).attr( { width: w+'px' , height: h+'px'  } );
		if (App.DEBUG) {
			$canvas.css( 'box-shadow', 'inset -1px -1px '+ tmpbgColor );
		}
		renderer.setSize( w, h );
		camera.left = -w/2;
		camera.right = w/2;
		camera.top = h/2;
		camera.bottom = -h/2;	
		camera.position.set(200, -h/2, 1000);
	    camera.updateProjectionMatrix();
	
		this.w = w;
		this.h = h;
		if (this.isControls) {
			this.controls.handleResize();
		}
	},
	
	redraw: function(dur) {
		
		if (typeof this['cubeGroup'] != 'undefined') {
			with (this) {
				raycaster = pickProjector.pickingRay( mouse2D.clone(), camera )	;
				var intersects = raycaster.intersectObjects( cubeGroup.children, true );

				if ( intersects.length > 0 ) {
					intersector = getRealIntersector( intersects );
					if ( intersector ) {
						setVoxelPosition( intersector );
						this.cursor3D.position = voxelPosition;
						CubeGroup.show(intersector);
					}
				}
				renderer.render( scene, camera);
			}
		}			
		if (this.isControls) {	
			this.controls.update();
		}
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
		CubeGroup.cleanup();
		this.tryIntersect = [];
		
		console.log('0')
		//this.$el.detach($(this.renderer.domElement))
		console.log('1');
		this.renderer = null;
		this.camera = null;
		this.controls = null;
		this.cursor3D = null;
		this.mouse2D = null;
		this.pickProjector = null;
		this.scene = null;
		this.lastRequestAnimationFrame = null;
		window.cancelAnimationFrame(this.get('raf'));
		this.el.removeEventListener('mousemove');
		this.el.removeEventListener('mousedown');
		$(window).unbind('resize.world3d');
		

		this.voxelPosition = null;
		this.tmpVec = null;
		this.normalMatrix = null;
		this.tcanvas = null;
		this.cubeGroup = null;

		this._super();
		
		
	}
});



