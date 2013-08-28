App.World3dView = App.SmartView.extend({
	templateName: 'world-3d',
	className: 'World3dView', 
	label: 'world-3d-view',
	tag: 'canvas',
	materials: {},
	textures: {},
	VS: 10,
	isControls:false,
	scene:undefined,
	renderer:undefined,
	ignoreList: [],
	pixelGroupList: [],
	didInsertElement: function () {
		var WIDTH = 400,
			HEIGHT = 300,
			VIEW_ANGLE = 45,
			ASPECT = WIDTH / HEIGHT,
			NEAR = 0.1,
			FAR = 10000;
			
		App.world3d = this;
		with (this) {
			_super(); 
			scene = new THREE.Scene();
			renderer = new THREE.WebGLRenderer( {  antialias: true, preserveDrawingBuffer: true });
			$el.append(renderer.domElement);
			$(renderer.domElement).addClass('world-3d-renderer');
			rendererStats = tryCreateRenderStats();

			// +Camera	
			camera = new THREE.OrthographicCamera( WIDTH / - 2, WIDTH / 2, HEIGHT / 2, HEIGHT / - 2, 1, 5000 );
			camera.position.set(WIDTH / 2, 0, 1000);
			scene.add(camera);

			// +Controls
			controls = tryCreateControls();

			// +Lighting
			scene.add( new THREE.AmbientLight(0x333333).position.copy(new THREE.Vector3(0, 0, 50)) );

			var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
			directionalLight.position.set( 0, 0, 1 );
			scene.add( directionalLight );

			// +Cursor
			cursor3D = new THREE.Object3D();
			cursor3D.overdraw = true;
			scene.add(cursor3D);

			mouse2D = new THREE.Vector3( 0, 10000, 0.5 );
			pickProjector = new THREE.Projector();
 		}

		// Pixel Groups
		var faceImg = App.static_preloader.queue.getResult('face-ash-pixel');
		var qmImg = App.static_preloader.queue.getResult('qm-pixel');
		setTimeout( function (me) {
			return  function () {
				me.faceVoxelGroup = me.createFromImage(faceImg);
				me.faceGroup = me.faceVoxelGroup.group;
				me.faceGroup.position.x = 50;
				me.ignoreList.push(me.faceVoxelGroup.rollOverMesh);
				me.pixelGroupList.push(me.faceVoxelGroup);
				
				me.questionVoxelGroup = me.createFromImage(qmImg); 
				me.questionGroup = me.questionVoxelGroup.group;
				me.questionGroup.position.x = 450;
				me.ignoreList.push(me.questionVoxelGroup.rollOverMesh);
				me.pixelGroupList.push(me.questionVoxelGroup);
				me.tryStart();
			}
		}(this), 100);

		// Some temp variables 
		this.voxelPosition = new THREE.Vector3();
		this.normalMatrix = new THREE.Matrix3();
		this.tmpVec = new THREE.Vector3();
		
		this.resize();
		
	},
	
	tryCreateRenderStats: function () {
		if (!App.DEBUG) {
			return null;
		}
		var rendererStats  = new THREEx.RendererStats();
		rendererStats.domElement.style.position = 'absolute';
		rendererStats.domElement.style.left = '0px';
		rendererStats.domElement.style.bottom   = '0px';
		document.body.appendChild( rendererStats.domElement );
		return rendererStats;
	},
	
	tryCreateControls: function () {
		
		if (this.isControls) {
			return null
		}
		var controls = new THREE.TrackballControls( camera );
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
		return controls;
	},
	
	tryStart: function () {
		if (this.questionVoxelGroup && this.faceVoxelGroup) {
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
					//me.onDocumentMouseDown(event);
				}
			}(this), false );

			$(window).bind('resize.world3d', function(me) {
			  	return function () {
					me.resize();
				}
			}(this));

			this.resize();
			
			$('.world-3d-renderer', this.$el).css('background-image', 'none');
			
		}
	},
	createFromImage: function (img, groupName, pixelWidth, pixelHeight) {
		var group = new THREE.Object3D();
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
			this.$tcanvas = this.tcanvas = null;
			$('canvas', this.$el).remove('.temp');
			var voxelGroup = Object.create(CubeGroup);
			this.scene.add(group = voxelGroup.createFromMap(map));
			console.log('voxelGroup', voxelGroup)
			return voxelGroup;
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
			var intersects = ray.intersectObjects( questionGroup.children, true );

		
			console.log('intersects', intersects);
			if ( intersects.length > 0 ) {
				intersector = testIsIgnored( intersects );
				// delete cube
				if (false) {//if ( isCtrlDown ) {
					if ( intersector.object != plane ) {
						scene.remove( intersector.object );
					}
				// create cube
				} else {
					intersector = testIsIgnored(intersects);
					if ( intersector ) {
						//this.faceVoxelGroup.tryAddHere(intersector);
						this.questionVoxelGroup.tryAddHere(intersector);
 						//console.log('this.faceGroup', this.faceGroup);
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
		/*
		if (App.DEBUG) {
			$canvas.css( 'box-shadow', 'inset -1px -1px '+ tmpbgColor );
		}
		*/
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
	
	redraw: function (dur) {
		with (this) {
			var rayTouches,
				touched,
				pixelGroup;

			ray = pickProjector.pickingRay( mouse2D.clone(), camera );
			for (var i = 0; i < pixelGroupList.length; i++) {
				pixelGroup = pixelGroupList[i];
				if (typeof pixelGroup.group == 'null') {

				}
				rayTouches = ray.intersectObjects( pixelGroup.group.children, true )
				if ( touched = testIsIgnored( rayTouches ) ) {
					if ( i == 0) { cursor3D.position = setVoxelPosition( touched ); }
					pixelGroup.show(touched);
				}
			}
			renderer.render( scene, camera );
			if (isControls) { controls.update(); }
			if (App.DEBUG) { rendererStats.update(renderer); }
		}
	},
	testIsIgnored: function( arayTouches) {
		var isRollOver = false,
			touched;
		
		for( var i = 0; i < arayTouches.length; i++ ) {
			touched = arayTouches[ i ];	
			if ( this.ignoreList.indexOf(touched.object) == -1 ) {
				return touched; 
			}
		}
		return null;
	},
	setVoxelPosition: function ( aintersector ) {
		with (this) {	
			normalMatrix.getNormalMatrix( aintersector.object.matrixWorld );
			tmpVec.copy( aintersector.face.normal );
			tmpVec.applyMatrix3( normalMatrix ).normalize();
			voxelPosition.addVectors( aintersector.point, tmpVec );
			voxelPosition.x = Math.floor( voxelPosition.x / this.VS ) * this.VS + this.VS/2;
			voxelPosition.y = Math.floor( voxelPosition.y / this.VS ) * this.VS + this.VS/2;
			voxelPosition.z = Math.floor( voxelPosition.z / this.VS ) * this.VS + this.VS/2;
			return voxelPosition;
		}
	},			
	addE3d: function (obj3d) {
		this.scene.add(obj3d);
	},
	willDestroyElement: function () {
		//this.isAnimating = false;
		App.world3d = null;
		with (this) {
			
			_super();
			if (isControls) {
				controls.removeEventListener( 'change');
			}
			faceVoxelGroup.cleanup();
			questionVoxelGroup.cleanup(); 
			window.cancelAnimationFrame(get('raf'));
			el.removeEventListener('mousemove');
			el.removeEventListener('mousedown');
			$(window).unbind('resize.world3d');
			renderer.domElement.remove();
			console.log('pixelGroupList ******', pixelGroupList.length)
		}
		
		var cleanUpVars = [			
			'ignoreList',
			'pixelGroupList',
			'renderer',
			'camera',
			'controls',
			'cursor3D',
			'mouse2D',
			'pickProjector',
			'scene',
			'lastRequestAnimationFrame',
			'voxelPosition',
			'tmpVec',
			'normalMatrix',
			'tcanvas',
			'faceVoxelGroup',
			'questionVoxelGroup'
		];
		
		for (var v = 0; v < cleanUpVars.length; v++) {
			this.set(cleanUpVars[v], null)
		}
		
	}
});



