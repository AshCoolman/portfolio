App.World3dView = App.SmartView.extend({
	templateName: 'world-3d',
	className: 'World3dView', 
	label: 'world-3d-view',
	tag: 'canvas',
	materials: {},
	textures: {},
	VS: 10,
	FACE_ASH: 'face-ash',
	FACE_ASH_X:-420,
	FACE_ASH_Y:270,
	QUESTION_MARK: 'question-mark',
	QUESTION_MARK_X: 30,
	QUESTION_MARK_Y: 240,
	is3dCreated: false,
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
	
	observingIsQuestionMarkRotateHint: function () {
		if (this.get('controller.isQuestionMarkRotatingHint')) {
			var instanceVarObj = this.get('instanceVarObj'),
			pixelObjectList = instanceVarObj.pixelObjectList,
			camera = instanceVarObj.camera,
			tweened = pixelObjectList[this.QUESTION_MARK].group.rotation;
			createjs.Tween.get(tweened).to({y:Math.PI* 0.125}, 600).call(function (me, questionMark) {
				return function () {
					console.log('questionMark', questionMark);
					questionMark.setInteractive(true);
				}
			}(this, pixelObjectList[this.QUESTION_MARK]));
			
		}
	}.observes('controller.isQuestionMarkRotatingHint'),
	
	observingIsQuestionMarkRotate: function () {
		var val = this.get('controller.isQuestionMarkRotating'),
			instanceVarObj = this.get('instanceVarObj'),
			pixelObjectList = instanceVarObj.pixelObjectList,
			camera = instanceVarObj.camera;
			
		if (val && !this.isQuestionMarkRotate && camera && pixelObjectList[this.QUESTION_MARK] && this.el) {
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
	
	observingIs3dCreated: function (observed, val) {
		if (val) {
			$('.background-2d-to-3d-ash', this.get('$el')).css('display', 'none');
			$('.background-2d-to-3d-question-mark', this.get('$el')).css('display', 'none');
		}
	}.observes('is3dCreated'),
	
	didInsertElement: function () {
		this._super();
		var instanceVarObj = this.get('instanceVarObj')
			WIDTH = App.BREAKPOINT.WIDTH_2,
			HEIGHT = App.BREAKPOINT.HEIGHT_2,
			VIEW_ANGLE = 45,
			ASPECT = WIDTH / HEIGHT,
			NEAR = 0.1,
			FAR = 10000;
			
		App.world3d = this;
		
		with (instanceVarObj) {
			this._super(); 
			this.set('$canvasHeroHolder', $('.canvas-hero-holder', this.get('$el')));
			scene = new THREE.Scene();
			renderer = new THREE.WebGLRenderer( {  antialias: true, preserveDrawingBuffer: true });
			this.get('$canvasHeroHolder').append(renderer.domElement);
			
			var $canvas = $(renderer.domElement).addClass('world-3d-renderer canvas-hero');
			this.set('$canvas', $canvas);
			//rendererStats = tryCreateRenderStats();

			// +Camera	
			camera = new THREE.OrthographicCamera( -WIDTH/2, WIDTH/2, HEIGHT/2, -HEIGHT/2, 1, 5000 );
			camera.position.set(0, 0, 1000);
			scene.add(camera);

			// +Lighting
			scene.add( new THREE.AmbientLight(0x333333).position.copy(new THREE.Vector3(0, 0, 50)) );

			var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
			directionalLight.position.set( 0, 0, 1 );
			scene.add( directionalLight );
			//console.log('scene\n\n', scene, $(renderer.domElement).attr('width', '1200'));
			// +Cursor
			cursor3D = new THREE.Object3D();//new THREE.Mesh(new THREE.SphereGeometry(15, 10, 10), new THREE.MeshNormalMaterial());
			cursor3D.overdraw = true;
			ignoreList.push(cursor3D);
			scene.add(cursor3D);

			mouse2D = new THREE.Vector3( 0, 10000, 0.5 );
			pickProjector = new THREE.Projector();
			
			// Some temp variables 
			voxelPosition = new THREE.Vector3();
			normalMatrix = new THREE.Matrix3();
			tmpVec = new THREE.Vector3(); 
			
			

			/*
			var plane = new THREE.Mesh( new THREE.PlaneGeometry( WIDTH, HEIGHT, WIDTH/15, HEIGHT/15 ), new   THREE.MeshBasicMaterial( { color: 0xCCCCCC, wireframe: true } ) );
			plane.position.x = 0;
			scene.add(plane);
			*/
			
 		}
		
		// Pixel Group
		setTimeout( function (me, ainstanceVarObj) {
			return  function () {
				var plans = [ 
					{ imgMap: me.createFromImage(App.PRELOADER.queue.getResult('face-ash-pixel')), x: me.FACE_ASH_X+15, y:me.FACE_ASH_Y+15, label: me.FACE_ASH }, 
					{ imgMap: me.createFromImage(App.PRELOADER.queue.getResult('question-pixel')), x: me.QUESTION_MARK_X+15, y:me.QUESTION_MARK_Y+15, label: me.QUESTION_MARK }];
				
				for (var p = 0; p < plans.length; p++) {
					var pixelatedObj = Object.createFromPrototype(CubeGroup, plans[p]),
						pixelatedObjGroup = pixelatedObj.group;
					
					ainstanceVarObj.ignoreList.push(pixelatedObj.rollOverMesh);
					ainstanceVarObj.scene.add(pixelatedObjGroup);
					ainstanceVarObj.pixelObjectList[plans[p].label] = pixelatedObj;
				}
				
				me.tryStart(ainstanceVarObj);
			}
		}(this, instanceVarObj), 0);
		
		
		
		this.get('$canvasHeroHolder').append('<div class="canvas-hero background-2d-to-3d-ash"><div class="bg-ash"></div></div>');
		this.get('$canvasHeroHolder').append('<div class="canvas-hero background-2d-to-3d-question-mark"><div class="bg-question-mark"></div></div>');
		this.set('$bg2dto3dAsh', $('.background-2d-to-3d-ash', this.get('$canvasHeroHolder')));
		this.set('$bg2dto3dAshBg', $('.bg-ash', this.get('$canvasHeroHolder')));
		this.set('$bg2dto3dQuestionMark', $('.background-2d-to-3d-question-mark', this.get('$canvasHeroHolder')));
		this.set('$bg2dto3dQuestionMarkBg', $('.bg-question-mark', this.get('$canvasHeroHolder')));
		this.resize();
		
		
		$canvas.mouseleave( function(me) {
			return function (e) {
				var pixels = me.get('instanceVarObj').pixelObjectList;
				for (var p = 0; p < pixels.length; p++ ) {
					if (pixels[p].hoverOff()) {
						$canvas.removeClass('interactive');
					}
				}
			}
		}(this));
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
			this.get('$el').on('mousemove', function(me) {
				return function (event) {
					me.onDocumentMouseMove(event);
				}
			}(this));
			
			$(window).bind('resize.world3d', function(me) {
			  	return function () {
					me.resize();
				}
			}(this));
			
			this.set('is3dCreated', true);
			this.resize();
		}
	},
	createFromImage: function (img, groupName, pixelWidth, pixelHeight) {
		var group = new THREE.Object3D(),
			instanceVarObj = this.get('instanceVarObj');
		this.get('$el').append('<canvas class="temp">');
		this.$tcanvas = $('canvas.temp', this.get('$el')).css('display', 'none')
		this.tcanvas = this.$tcanvas[0];
		
		if (!this.tcanvas.getContext) {
			setTimeout( function (me) {
				return  function() {
						me.createFromImage(img);
				}
			}(this), 1000);
		} else {		
			
			var map = [[[]]],
				w=img.width,
				h=img.height,
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
					if (!map[x][y]) map[x][y]= [];
					var decColor = ( 65536 * id[i+0] + 256 * id[i+1] + id[i+2] ).toString(16);
					map[x][y][0] = {color: '#'+decColor};
				}
			}
			this.$tcanvas = this.tcanvas = null;
			$('canvas', this.get('$el')).remove('.temp');
			return map;
		}	
	},
	
	onDocumentMouseMove: function ( e ) {
		
		var instanceVarObj = this.get('instanceVarObj');
		var X = $('body').offset().left;
	    var Y = $('body').offset().top;
	    mouseX = e.pageX - X;
	    mouseY = e.pageY - Y;
		var perc = App.BREAKPOINT.WIDTH_2 / this.w;
		var offset = $('.world-3d-renderer', this.get('$el')).offset();
		var x = mouseX - offset.left;
		var y = mouseY - offset.top;
		instanceVarObj.mouse2D.x = perc*(x-this.w/2);
		instanceVarObj.mouse2D.y = perc*(-y+this.h/2);
		
		//console.log(instanceVarObj.mouse2D.x, instanceVarObj.mouse2D.y);
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
		var $canvas = $(this.get('instanceVarObj').renderer.domElement),
			w, 
			h,
			bp = App.BREAKPOINT,
			W = bp.WIDTH_2,
			H = bp.HEIGHT_2,
			canvasHeroClass,
			canvasHeroHolderClass,
			tmpwinWidth = this.tmpwinWidth = $(window).width(),
			tmpwinHeight = this.tmpwinHeight = $(window).height();

		if (tmpwinWidth > bp.WIDTH_2 && tmpwinHeight > bp.HEIGHT_2 ) {
			w = bp.WIDTH_2;
			h = bp.HEIGHT_2; 
			canvasHeroClass = 'canvas-hero';
			canvasHeroHolderClass = 'canvas-hero-holder';
		} else if (tmpwinWidth > bp.WIDTH_1 && tmpwinHeight > bp.HEIGHT_1 ) {
			w = bp.WIDTH_1;
			h = bp.HEIGHT_1;
			canvasHeroClass = 'canvas-hero-med';
			canvasHeroHolderClass = 'canvas-hero-holder-med';
		} else {
			w = bp.WIDTH_0;
			h = bp.HEIGHT_0;
			canvasHeroClass = 'canvas-hero-small';
			canvasHeroHolderClass = 'canvas-hero-holder-small';
		}
		this.w = w;
		this.h = h;
		
		if (this.get('is3dCreated')) {
			$canvas.removeClass('canvas-hero canvas-hero-med canvas-hero-small');
			$canvas.addClass(canvasHeroClass);
			$canvas.parent().removeClass('canvas-hero-holder canvas-hero-holder-med canvas-hero-holder-small');
			$canvas.parent().addClass(canvasHeroHolderClass);
			
			with (this.get('instanceVarObj')) {
				renderer.setSize( w, h );
				camera.left = -W/2;
				camera.right = W/2;
				camera.top = H/2;
				camera.bottom = -H/2;	
				camera.position.set(0, 0, 1000);
			    camera.updateProjectionMatrix();
				if (isControls) {
					controls.handleResize();
				}
			}
		} else {
			this.get('$bg2dto3dAsh').css({
				'margin-left': Math.round(this.FACE_ASH_X * (w/W))+'px ', 
				'margin-top': Math.round((270 - this.FACE_ASH_Y) * (h/H))+'px'
			});
			this.get('$bg2dto3dAshBg').css({
				'background-size': Math.round(100*w/W)+'%'
			});

			this.get('$bg2dto3dQuestionMark').css({
				'margin-left': Math.round(this.QUESTION_MARK_X * (w/W))+'px ', 
				'margin-top': Math.round((270 - this.QUESTION_MARK_Y) * (h/H))+'px'
			});
			this.get('$bg2dto3dQuestionMarkBg').css({
				'background-size': Math.round(100*w/W)+'%'
			});
		}
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
			cursor3D.position.x = mouse2D.x;
			cursor3D.position.y = mouse2D.y;
			var rayTouches,
				touched,
				pixelGroup;

			//Translates a 2D point from NDC (Normalized Device Coordinates) 
			//to a Raycaster that can be used for picking.
			// NDC range from [-1..1] in x (left to right) and [1.0 .. -1.0] in y (top to bottom).
			var amouse2D = mouse2D.clone();
			amouse2D.x = 2*amouse2D.x/App.BREAKPOINT.WIDTH_2;
			amouse2D.y = 2*amouse2D.y/App.BREAKPOINT.HEIGHT_2;
			ray = pickProjector.pickingRay( amouse2D.clone(), camera );
			var isAtLeastOneHover = false;
			for (var i in pixelObjectList) {
				
				pixelGroup = pixelObjectList[i]; 
				rayTouches = ray.intersectObjects( pixelGroup.group.children, true, [] )
				if ( touched = this.testIsIgnored( rayTouches ) ) {
					//if ( i == 0) { cursor3D.position = this.setVoxelPosition(instanceVarObj, touched ); }
					pixelGroup.show(touched);
					pixelGroup.hoverOn();
					isAtLeastOneHover = pixelGroup.getInteractive();
				} else {
					pixelGroup.hoverOff();
					if ( i == 0) {
						console.log('didnt touch');
					}
				}
			} 
			if (isAtLeastOneHover && !this.get('$el').hasClass('interactive')) {
				this.get('$el').addClass('interactive');
			} else if (!isAtLeastOneHover && this.get('$el').hasClass('interactive')) {
				this.get('$el').removeClass('interactive');
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

		
		
			/*
			*/
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
			

		}	
		for (var i = 0; i < instanceVarObj.length; i++) {
			this.set(instanceVarObj[i], null);
		}
		
		this.set('instanceVarObj', null);
		
		
		window.cancelAnimationFrame(this.get('raf'));
		this.set('raf', null);
		this.get('$el').unbind('mousemove');
		$(window).unbind('resize.world3d'); 
	}
});
