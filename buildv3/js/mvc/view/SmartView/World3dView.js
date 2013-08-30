App.World3dView = App.SmartView.extend({
	templateName: 'world-3d',
	className: 'World3dView', 
	label: 'world-3d-view',
	tag: 'canvas',
	materials: {},
	textures: {},
	VS: 10,
	FACE_ASH: 'face-ash',
	QUESTION_MARK: 'question-mark',
	isQuestionMarkRotate: false,
	instanceVarNameArr: [			
		'renderer',
		'camera',
		'isControls',
		'controls',
		'cursor3D',
		'mouse2D',
		'pickProjector',
		'ray',
		'rayCaster',
		'scene',
		'lastRequestAnimationFrame',
		'voxelPosition',
		'tmpVec',
		'normalMatrix',
		'tcanvas',
		'ignoreList',
		'pixelObjectList'
	],  		
	instanceVarObj: {},
	init: function () {
		this._super();
		
		console.log('init');
		this.set('isControls', false);
		this.set('scene', null);
		this.set('renderer', null);
		this.set('rendererStats', null);
		this.set('camera', null);
		this.set('controls', null);
		this.set('cursor3D',  null);
		this.set('mouse2D', null);
		this.set('pickProjector', null);
		this.set('voxelPosition',  null);
		this.set('normalMatrix',  null);
		this.set('tmpVec',  null);
		this.set('ignoreList',  []);
		this.set('pixelObjectList',  {});
		
		var instanceVarNameArr = this.get('instanceVarNameArr'),
			instanceVarObj = this.get('instanceVarObj');
		for (var n = 0; n < instanceVarNameArr.length; n++) {
			instanceVarObj[instanceVarNameArr[n]] = this.get(instanceVarNameArr[n]);
		}
		this.set('instanceVarObj', instanceVarObj);
		return this;
	},
	
	
	observingDoQuestionMarkRotate: function () {
		var val = this.get('controller.isQuestionMarkRotating'),
			instanceVarObj = this.get('instanceVarObj'),
			pixelObjectList = instanceVarObj.pixelObjectList,
			camera = instanceVarObj.camera;
			
		if (val && !this.isQuestionMarkRotate && camera && pixelObjectList[this.QUESTION_MARK] && this.el) {
			console.log('OBSERVED', val, this.el);
			this.isQuestionMarkRotate = Object.createFromPrototype(
					ragh.THREE.Dragger, 
					{	camera:camera, 
						dragged: pixelObjectList[this.QUESTION_MARK].group, 
						el: this.el});
			
		} else if (!val && this.isQuestionMarkRotate) {
			this.isQuestionMarkRotate.destroy();
			this.isQuestionMarkRotate = false;
		}
		
	}.observes('controller.isQuestionMarkRotating'),

	didInsertElement: function () {
		this._super();
		var instanceVarObj = this.get('instanceVarObj')
			WIDTH = 400,
			HEIGHT = 300,
			VIEW_ANGLE = 45,
			ASPECT = WIDTH / HEIGHT,
			NEAR = 0.1,
			FAR = 10000;
			
		App.world3d = this;
		
		with (instanceVarObj) {
			this._super(); 
			scene = new THREE.Scene();
			renderer = new THREE.WebGLRenderer( {  antialias: true, preserveDrawingBuffer: true });
			this.$el.append(renderer.domElement);
			$(renderer.domElement).addClass('world-3d-renderer');
			//rendererStats = tryCreateRenderStats();

			// +Camera	
			camera = new THREE.OrthographicCamera( WIDTH / - 2, WIDTH / 2, HEIGHT / 2, HEIGHT / - 2, 1, 5000 );
			camera.position.set(WIDTH / 2, 0, 1000);
			scene.add(camera);


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
			
			// Some temp variables 
			voxelPosition = new THREE.Vector3();
			normalMatrix = new THREE.Matrix3();
			tmpVec = new THREE.Vector3();
			
 		}
		
		// Pixel Group
		setTimeout( function (me, ainstanceVarObj) {
			return  function () {
				var plans = [ 
					{ imgMap: me.createFromImage(App.PRELOADER.queue.getResult('face-ash-pixel')), x: 50, label: me.FACE_ASH }, 
					{ imgMap: me.createFromImage(App.PRELOADER.queue.getResult('question-pixel')), x: 450, label: me.QUESTION_MARK }];
				
				for (var p = 0; p < plans.length; p++) {
					var pixelatedObj = Object.createFromPrototype(CubeGroup, plans[p]),
						pixelatedObjGroup = pixelatedObj.group;
					
 					console.log('pixelatedObj', plans[p].label,  pixelatedObj);
					ainstanceVarObj.ignoreList.push(pixelatedObj.rollOverMesh);
					ainstanceVarObj.scene.add(pixelatedObjGroup);
					ainstanceVarObj.pixelObjectList[plans[p].label] = pixelatedObj;
				}
					console.log('pushed voxel groups', ainstanceVarObj);
				me.tryStart(ainstanceVarObj);
			}
		}(this, instanceVarObj), 0);
		this.resize();
		
	},
	
	tryCreateRenderStats: function () {
		if (!App.DEBUG) {
			return null;
		}
		var rendererStats = new THREEx.RendererStats();
		rendererStats.domElement.style.position = 'absolute';
		rendererStats.domElement.style.left = '0px';
		rendererStats.domElement.style.bottom = '0px';
		document.body.appendChild( rendererStats.domElement );
		return rendererStats;
	},
	
	
	createControls: function (acamera) {

		var controls = new THREE.TrackballControls( acamera );
		controls.target.set( 0, 0, 0 )
		controls.rotateSpeed = 1.0;
		controls.zoomSpeed = 1.2;
		controls.panSpeed = 0.8;
		controls.noZoom = false;
		controls.noPan = false;
		controls.staticMoving = true;
		controls.dynamicDampingFactor = 0.0;
		controls.keys = [ 65, 83, 68 ]; //a s d
		controls.addEventListener( 'change.world3d', function(me) { return function() { this.redraw; } }(this) );	
		return controls;
	},
	
	tryStart: function (ainstanceVarObj) {
		console.log('tryStart', ainstanceVarObj.pixelObjectList[this.FACE_ASH], ainstanceVarObj.pixelObjectList[this.QUESTION_MARK], ainstanceVarObj.pixelObjectList);
		
		if (ainstanceVarObj.pixelObjectList[this.FACE_ASH] && ainstanceVarObj.pixelObjectList[this.QUESTION_MARK]) {
			var rafFunction = function (me) {
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
		var group = new THREE.Object3D(),
			instanceVarObj = this.get('instanceVarObj');
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
			console.log(img)
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
			return map;
		}	
	},
	
	onDocumentMouseMove: function ( event ) {
		event.preventDefault();
		
		var instanceVarObj = this.get('instanceVarObj');
		var perc = ( event.clientX / window.innerWidth )
			if (!window.evented) {
				window.evented = true;
			}
		instanceVarObj.mouse2D.x = ( event.layerX / this.w) * 2 - 1;
		instanceVarObj.mouse2D.y = - ( event.layerY / this.h ) * 2 + 1;
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
		
		var instanceVarObj = this.get('instanceVarObj');
		
		with (instanceVarObj) {
			$(renderer.domElement).attr( { width: w+'px' , height: h+'px'  } );
			renderer.setSize( w, h );
			camera.left = -w/2;
			camera.right = w/2;
			camera.top = h/2;
			camera.bottom = -h/2;	
			camera.position.set(200, -h/2, 1000);
		    camera.updateProjectionMatrix();
			if (isControls) {
				controls.handleResize();
			}
		}

	
		this.w = w;
		this.h = h;

	},
	
	redraw: function (dur) {
		var instanceVarObj = this.get('instanceVarObj');
		
		if (this.isQuestionMarkRotate && this.isQuestionMarkRotate.dragged && this.isQuestionMarkRotate.dragged.rotation) {
			var a180 = 1 * Math.PI,
				a360 = 2 * Math.PI,
				tolerance = 0.01,
				targetRot = 2 * Math.PI * 0.75,
				targetDif = this.isQuestionMarkRotate.dragged.rotation.y - targetRot;

	        while (targetDif < -a180) targetDif += a360;
	        while (targetDif > a180) targetDif -= a360;
			targetDif = Math.round(1000*targetDif)/1000;
			
			
			
			if (Math.min(tolerance, targetDif) == tolerance) {
				this.isQuestionMarkRotate.animate();
			} else {
				this.isQuestionMarkRotate.dragged.rotation.y = targetRot;
				this.get('controller').send('view_doQuestionMarkRotateDone');
			}
			
		}
		
		with (instanceVarObj) {
			var rayTouches,
				touched,
				pixelGroup;

			ray = pickProjector.pickingRay( mouse2D.clone(), camera );
			for (var i in pixelObjectList) {
				
				pixelGroup = pixelObjectList[i]; 
				rayTouches = ray.intersectObjects( pixelGroup.group.children, true )
				if ( touched = this.testIsIgnored( rayTouches ) ) {
					if ( i == 0) { cursor3D.position = this.setVoxelPosition(instanceVarObj, touched ); }
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
	setVoxelPosition: function ( ime, aintersector ) {
		with (ime) {	
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
		console.log('willDestroyElement 1', this.get('instanceVarObj'));
		var instanceVarObj = this.get('instanceVarObj');
		App.world3d = null;
		console.log('willDestroyElement 2');

		
		with (instanceVarObj) {
			console.log('scene', scene);
			
			
			for (var pg = 0; pg < pixelObjectList.length; pg++) {
				pixelObjectList[pg].cleanUp();
				scene.remove(pixelObjectList[pg].group);
			}
			
			for (var sc = 0; sc < scene.__objects.length; sc++) {
				var obj = scene.__objects.length;
			    scene.remove(obj);                                                                                     
			    if (obj.geometry) {                                                                                    
			      obj.geometry.dispose();                                                                              
			    }                                                                                                      
			    if (obj.material) {                                                                                    
			      if (obj.material instanceof THREE.MeshFaceMaterial) {                 
			        $.each(obj.material.materials, function(idx, obj) {                 
			          obj.dispose();                                                                                   
			        });                                                                                                
			      } else {                                                                                             
			        obj.material.dispose();                                                                            
			      }                                                                                                    
			    }                                                                                                      
			    if (obj.dispose) {                                                                                     
			      obj.dispose();                                                                                       
			    }
			}
 
			
			if (controls) {
				controls.removeEventListener( 'change.world3d');
			}
			renderer.domElement.remove();
		}	
		for (var i = 0; i < instanceVarObj.length; i++) {
			this.set(instanceVarObj[i], null);
		}
		
		
		this.set('instanceVarObj', null);
		
		window.cancelAnimationFrame(this.get('raf'));
		this.set('raf', null)
		this.el.removeEventListener('mousemove');
		this.el.removeEventListener('mousedown');
		$(window).unbind('resize.world3d');
		console.log('pixelObjectList ******', this.get('pixelObjectList'))
	}
});
