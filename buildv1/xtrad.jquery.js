
var lastLoop = new Date;
 var fps,  fpsCounter, fpsCount=0;
// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function( callback ){

            window.setTimeout(callback, 1000 / 60);
          };
})();


 

/**
*	 v1.0
**/
	
var jQuery;
(function ($) {
 

	// Define console if it isn't (for older browsers)
	if (typeof console === "undefined") {
		this.console = {log: function () {}};
	}


	
	/**
	*	 Major property <code>me</code> holds plugin properties that are set at runtime
	**/
	var me = {
		},
	
	/**
	*	 Major property <code>settings</code> holds plugin properties that are set before runtime
	**/
		settings = {
		},
		
	/**
	*	Major property <code>data</code> holds plugin properties that are set before runtime
	*	 
	*	Not using jQuery.data() method because the function breaks call by reference to data object,
	*	and needs to be constantly "saved" using $(dom).data('key', value) - which is annoying.
	*
	*	This function is General use/frequently modified/"control"
	**/
		_domDataObjList = [
		],
		
		getDomData = function($dom) {
			var d;
			for (d=0; d < _domDataObjList.length; d++) {
				if (_domDataObjList[d]['$dom'] == $dom) break;
			}		
			return _domDataObjList[d];
		},
		setDomData = function($dom, dataObj) {
			if (typeof(dataObj['$dom']) != 'undefined') throw new Error('setDomData() ERROR: property "$dom" is already used to store reference to dom object');
		
			var d;
			for (d=0; d<_domDataObjList.length; d++) {
				if (_domDataObjList[d]['$dom'] == $dom) break;
			}
 
			dataObj['$dom'] = $dom;
			_domDataObjList[d] = dataObj;
			console.log('setDomData', _domDataObjList);
		},
		
	/**
	*	 Major property <code>plugin</code> holds descriptive information about this plugin
	**/
		plugin = {
			author: 'Ashley Coleman',
			version: 'a1.0',
			name: 'xtrad'
		},
		BRAIN='brain',
		LEFT_FACE='leftFace',
		LEFT_FACE_SQUARE='leftFaceSquare',
		LEFT_FACE_ALPHA='leftFaceAlpha',
		FACE_SQUARE_LEFT='faceSquareLeft',
		FACE_SQUARE_RIGHT='faceSquareRight',
		FACE_SQUARE_FRONT='faceSquareFront',
		RIGHT = 0, LEFT = 1, TOP = 2, BOTTOM = 3, FRONT = 4, BACK = 5;
		

	/**
	*	
	**/

		methods = {
			/* FUNCTION */
			init : function (options) {

				return this.each(function () {   
				console.log('xtrad init each', this);
					var $this = $(this); 
					setDomData($this, {});
					var data = getDomData($this);
					$.extend(data, me, settings, options);
					
					if (typeof options == 'undefined') 
						throw plugin.name+': no options passed';
				 

					$this.append($('p'));


					fpsCounter = $('<div></div>')
					$('body').append(fpsCounter); 
					
					me.methods.create3dWorld($this);
				});
			},
			create3dWorld: function($this) {
				
				var data = getDomData($this);
	        	// materials
		        data['materialDict'] = {};

				data['angularSpeed'] = 0.02; // revolutions per second
        		data['lastTime'] = 0;
        		data['scale'] = 6;

				data['$container'] = $this.append($('div'));

		 		//projector
				data['projector'] = new THREE.Projector();
		        data['checkMouseDownList']=[];
		        // renderer
		        data['renderer'] = new THREE.WebGLRenderer(); 
		        data.renderer.setSize(window.innerWidth, window.innerHeight);
		        $this.append($(data.renderer.domElement));
		
				//Camera
				//data['camera'] = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
				data['camera'] = new THREE.OrthographicCamera(
				    window.innerWidth / -2,   // Left
				    window.innerWidth / 2,    // Right
				    window.innerHeight / 2,   // Top
				    window.innerHeight / -2,  // Bottom
				    -2000,            // Near clipping plane
				    2000 );           // Far clipping plane
				data.camera.position.set( 0, 15*data['scale'], 200*data['scale'] );
				
				//scene
				data['scene'] = new THREE.Scene();
				data.scene.add( data.camera );

		        // add subtle ambient lighting
        		data['ambientLight'] = new THREE.AmbientLight(0x555555);
        		data.scene.add(data.ambientLight);

        		// add directional light source
		        data['directionalLight'] = new THREE.DirectionalLight(0xffffff);
		        data.directionalLight.position.set(1, 1, 1).normalize();
		        data.scene.add(data.directionalLight);
		
		        data['mainGroup'] = new THREE.Object3D();
				
				//data.mainGroup.add(me.methods.buildBrainCase($this));

				data['brain'] = me.methods.buildBrain($this, 5*data.scale, 'br', 'img/0.png');
				//data.mainGroup.add(data.brain);
				data.brain.position.set(0, 20*data.scale,0);


				data['questionMark'] = me.methods.buildQuestionMark($this, 5*data.scale, 'qa', 'img/lightblue.png');
				data.mainGroup.add(data.questionMark);
			   	data.questionMark.rotation.y = Math.PI*2*0.25;
			   	TweenMax.to(data.questionMark.rotation, 0.5, {y:Math.PI*2*0.5, delay:5, yoyo:true, repeatDelay:3, repeat:-1});

				
				//me.methods.createFaceGrid($this);
			   	data.scene.add(data.mainGroup);
			   	
			   	var childList = data.brain.children[0].children;
			   	/*	
			   	var ex=0.5, exr=0.7*Math.PI*2;
			   	for (var pxl =0; pxl < childList.length; pxl++) {
			   		pxlVal = childList[pxl];
			   		TweenMax.to(pxlVal.position, 5, {x: pxlVal.position.x*(2*ex+ex*Math.random())*data.scale, z:pxlVal.position.z*(ex+ex*Math.random())*data.scale, delay:5, yoyo:true, repeatDelay:2, repeat:-1});
			   		TweenMax.to(pxlVal.position, 5, {y:pxlVal.position.y*(ex+ex*Math.random())*data.scale, delay:5, yoyo:true, repeatDelay:2, repeat:-1});
			   		TweenMax.to(pxlVal.rotation, 5, {x:exr*Math.random(), y:exr*Math.random(), z:exr*Math.random(), delay:5, yoyo:true, repeatDelay:2, repeat:-1});
			   	}*/
			   	data.brain.rotation.y = Math.PI*2*0.25;
			   	TweenMax.to(data.brain.rotation, 0.5, {y:Math.PI*2*0.75, delay:5, yoyo:true, repeatDelay:3, repeat:-1});
			   	
			},
			createFaceGrid: function($this) {
				var data = getDomData($this);
		        data['brainGroup'] = new THREE.Object3D();//create an empty container
		      	data.materialDict[BRAIN] = new THREE.MeshBasicMaterial({map: me.methods.preloadImageUtilsLoadTexture($this, 'img/0.png')});

		        var sc=data.scale,
		        	sz = 10,
		        	mod=8,
		        	spc=sz,
		        	materials = [];

				for (var b=0; b<5; b++) materials.push(data.materialDict[BRAIN]);

		        for (var i=0; i<(mod*mod); i++) {
					var faceSquareTex = me.methods.preloadImageUtilsLoadTexture($this, 'img/leftSquareFace.jpg');
					faceSquareTex.offset.x = (i%mod)/(mod);
					faceSquareTex.offset.y = (i-(i%mod))/(mod*mod);
					faceSquareTex.repeat.x = faceSquareTex.repeat.y = 1/mod;
					var cubeMaterials = materials.slice(); //shallow copy
					cubeMaterials.splice(4, 0, new THREE.MeshLambertMaterial({map: faceSquareTex, transparent:true}));
					var brainGeo = new THREE.CubeGeometry(sz*sc, sz*sc, sz*sc,1,1,1, cubeMaterials);
					var brainMesh = data['cubeBrain'+i] = new THREE.Mesh(brainGeo, new THREE.MeshFaceMaterial());
			       	brainMesh.overdraw = true;
		        	brainMesh.position.set( 	(spc*sc*(i%mod))-(spc*sc*mod/2), 
	        											spc*sc*(Math.floor(i/mod))-(spc*sc*mod/2), 
		        										0);

					//me.methods.tweenCubeAmbientMovement(brainMesh.position, sc*sz*2, sc*((i%mod)*10));
					data.brainGroup.add( brainMesh );

		        }
	        
		        data.brainGroup.position.set(0,0,-30*sc);
			   	data.scene.add(data.brainGroup);
				me.methods.tweenGroupAmbientRotation(data.brainGroup.rotation);
			},
			checkMouseDownFaceGrid: function(ray, data) {
				var intersects = ray.intersectObjects( data.brainGroup.children );
				if ( intersects.length > 0 ) {
				console.log('check mouse down face grid', intersects)
					TweenMax.to(intersects[ 0 ].object.position, ex, { z:-100*data['scale']}); 
					TweenMax.to(intersects[ 0 ].object.position, 5, { z:0, delay:6}); 
				}
			},
			buildBrain:function($this, size, label, texImg) {
				var data = getDomData($this);
				size = (size||1);
		        data[label] = new THREE.Object3D();
				me.methods.createPixels($this, data[label], [
						[
						'',
						'..ŒŒŒŒ ',
						'.ŒŒŒŒŒŒ ',
						'.ŒŒ'
						],
						[
						'..ŒŒŒŒ',
						'.Œ----Œ',
						'Œ------Œ',
						'Œ--ŒŒŒŒŒ',
						'.ŒŒ',
						],
						[
						'.ŒŒŒŒŒ',
						'Œ-----Œ',
						'Œ------Œ',
						'Œ--ŒŒŒŒŒ',
						'Œ--Œ',
						' ŒŒ',
						],
						[
						'.ŒŒŒŒŒ',
						'Œ-----Œ',
						'Œ------Œ',
						'Œ--ŒŒŒŒŒ',
						'Œ--Œ',
						' ŒŒ',
						],
						[
						'..ŒŒŒŒ',
						'.Œ----Œ',
						'Œ------Œ',
						'Œ--ŒŒŒŒŒ',
						'.ŒŒ',
						],
						[
						'',
						'..ŒŒŒŒ ',
						'.ŒŒŒŒŒŒ ',
						'.ŒŒ'
						]
					],
					texImg, size, size, size);
			
			   	return data[label];
			},
			buildQuestionMark:function($this, size, label, texImg) {
				var data = getDomData($this);
				size = (size||1);
		        data[label] = new THREE.Object3D();
				me.methods.createPixels($this, data[label], [
						[
						'.ŒŒŒŒŒ',
						'ŒŒ---ŒŒ',
						'-----ŒŒ',
						'---ŒŒŒ',
						'..ŒŒ',
						'..ŒŒ',
						'',
						'..ŒŒ',
						]
					],
					texImg, size, size, size);
			
			   	return data[label];
			},
			
			createPixels: function($this, parent, pixelMap, texImg, lenX, lenY, lenZ, offsetX, offsetY, offsetZ) {

				offsetX = offsetX || 0;
				offsetY = offsetY || 0;
				offsetZ = offsetZ || 0; 		
				var maxLayer=0, 
					maxLine=0, 
					maxPxl=0,
					pixelHolder = new THREE.Object3D(),
					randMats = [];

				//mats[FRONT] = mats[BACK] = mats[TOP] = mats[BOTTOM] = mats[LEFT] = mats[RIGHT] = me.methods.createRepeatMaterial($this, texImg, 10, 10);

				for (var layer=0; layer < pixelMap.length; layer++){
					maxLayer = Math.max(maxLayer, layer);
					for (var line=0; line < pixelMap[layer].length; line++) {
						maxLine = Math.max(maxLine, line);
						pixelMap[layer][line] = pixelMap[layer][line].split('');
						for (var pxl in pixelMap[layer][line]) {
							maxPxl = Math.max(maxPxl, pxl);
						}
					}
				}

				var rand = Math.floor(Math.random()*maxPxl);
				console.log(rand, maxPxl);

				for (var rm=0; rm <20; rm++) randMats[rm] = me.methods.createSplitMaterial($this, Math.floor(Math.random()*maxPxl), Math.floor(Math.random()*maxPxl), maxPxl, maxPxl, texImg);

				for (var layer=0; layer < pixelMap.length; layer++){
					for (var line=0; line < pixelMap[layer].length; line++) {
						for (var pxl in pixelMap[layer][line]) {
 							if (pixelMap[layer][line][pxl] == 'Œ') {
 								var mats=[];

 								for (var m=0; m<7;m++) mats[m]=randMats[Math.floor(Math.random()*randMats.length)];
								pixelMap[layer][line][pxl] = new THREE.Mesh(new THREE.CubeGeometry(lenX, lenY, lenZ, 1,1,1, mats), new THREE.MeshFaceMaterial());
						       	pixelMap[layer][line][pxl].overdraw = true;
					        	pixelMap[layer][line][pxl].position.set(	offsetX+lenX*( layer - maxLayer/2 - 0.5), 
					        												offsetY-lenY*( line - maxLine/2 - 0.5), 
					        												offsetZ+lenZ*( pxl - maxPxl/2 - 0.5));
					        	pixelHolder.add(pixelMap[layer][line][pxl]);
				        	} else {
				        		pixelMap[layer][line][pxl]=null;
				        	}
						}
					}
				}
				parent.add(pixelHolder);
			},
			buildBrainCase: function($this, isHollow) {
				var data = getDomData($this);
		        // cube: Brain 
		        data['brainGroup'] = new THREE.Object3D();//create an empty container
		        var sc=data['scale'], 
					modX=2, modY=1, modZ=1,
					lengthX=100, lengthY=100, lengthZ=100,
					szX = lengthX/modX,
					szY = lengthY/modY,
					szZ = lengthZ/modZ,
					buffer = 
					offsetX=-lengthX/2+szX*0.5, offsetY=-lengthY/2+szY*0.5, offsetZ=-lengthZ/2+szZ*0.5,
					RIGHT = 0, LEFT = 1, TOP = 2, BOTTOM = 3, FRONT = 4, BACK = 5;

					var isOuterFaceNotAtOrigin=function (i, mod) {return (i%mod==mod-1)};
					var isOuterFaceAtOrigin=function (i, mod) {return (i%mod==0)};

		       	 	var materials = [];
					materials[BACK] =  materials[FRONT] = me.methods.createRepeatMaterial($this, 'img/0.png', modY, modX );
					materials[LEFT] = materials[RIGHT] 	= me.methods.createRepeatMaterial($this, 'img/0.png', modY, modZ );
					materials[TOP] =  materials[BOTTOM] = me.methods.createRepeatMaterial($this, 'img/0.png', modZ, modX );

				
		        for (var i=0; i<(modX*modY*modZ); i++) {

			       	var iZ = i%(modX*modY);
			       	var x = iZ%modX;
			       	var y = Math.floor(iZ/modX);
			       	var z = Math.floor(i/(modX*modY));
			       	console.log(i, iZ, ':', x, y, z);
					var cubeMaterials = materials.slice(); //shallow copy
					
					if (x==modX-1) cubeMaterials.splice(RIGHT, 1, me.methods.createSplitMaterial($this, modZ-1-z, y, modZ, modY, 'img/rightSquareFace.jpg'));
					if (x ==0 ) cubeMaterials.splice(LEFT, 1, me.methods.createSplitMaterial($this, z, y, modZ, modY, 'img/leftSquareFace.jpg'));
					if (x==Math.floor(modX/2)-1) cubeMaterials.splice(RIGHT, 1, me.methods.createSplitMaterial($this, modZ-1-z, y, modZ, modY, 'img/sideviewcavityleft.png', true));
					if (x==Math.floor(modX/2)) cubeMaterials.splice(LEFT, 1, me.methods.createSplitMaterial($this, z, y, modZ, modY, 'img/sideviewcavityright.png', true));

					if (y == modY-1) cubeMaterials.splice(TOP, 1, me.methods.createSplitMaterial($this, x, modZ-1-z, modX, modZ, 'img/texTop.png'));
					if (y == 0 ) cubeMaterials.splice(BOTTOM, 1, me.methods.createSplitMaterial($this, x, z, modX, modZ, 'img/texBottom.png'));

					if (z==modZ-1) cubeMaterials.splice(FRONT, 1, me.methods.createSplitMaterial($this, x, y, modX, modY, 'img/front.jpg', true));
					if (z==0) cubeMaterials.splice(BACK, 1, me.methods.createSplitMaterial($this, modX-1-x, y, modX, modY, 'img/texBack.png', true));
					
					var brainGeo = new THREE.CubeGeometry(szX*sc, szY*sc, szZ*sc,1,1,1, cubeMaterials);
					var cube = data['cubeBrain'+i] = new THREE.Mesh(brainGeo, new THREE.MeshFaceMaterial());
			       	cube.overdraw = true;
		        	cube.position.set( 	szX*sc*(iZ%modX) + sc*offsetX + 0*(iZ%modX)*sc, 
	        							szY*sc*Math.floor(iZ/modX) + sc*offsetY + 0*Math.floor(iZ/modX)*sc, 
		        						szZ*sc*Math.floor(i/(modX*modY)) + sc*offsetZ+ 0*Math.floor(i/(modX*modY))*sc);//sc*offsetZ + 

					//me.methods.tweenCubeAmbientMovement(data['cubeBrain'+i].position, sc*80, ((i%modZ)*100)/1000);
					//if (i%modX==0) console.log(data['cubeBrain'+i]);

					TweenMax.to(cube.position, 
	    			1.5, 
	    			{
						x:cube.position.x*2, 
	        			y:Math.PI*2, 
	        			z:cube.position.z*2, 
	        			repeatDelay:0.5, 
	        			yoyo:true,
	        			repeat:-1
	        		});

					data.brainGroup.add( cube );
		        } 
	        
		        data.brainGroup.position.set(0,10*sc,0*sc);
		        data.brainGroup.rotation.set(0, 0, Math.PI/2*0.0);
				//me.methods.tweenGroupAmbientRotation(data.brainGroup.rotation);
				//TweenMax.to(data.brainGroup.scale, 5, {x:0.1, yoyo:true, repeat:-1});
				return data['brainGroup'];
			},
			createSplitMaterial:function($this, x, y, modX, modY, img, isTransparent) {

				if (!isTransparent) isTransparent = false;
				var tex = me.methods.preloadImageUtilsLoadTexture($this, img);
				tex.offset.x = x/modX;
				tex.offset.y = y/modY;
				tex.repeat.x = 1/modX;
				tex.repeat.y = 1/modY;
				return new THREE.MeshLambertMaterial({map: tex, transparent:isTransparent})
			},
			createRepeatMaterial:function($this, img, modX, modY, isTransparent, scaleX, scaleY) {
				if (!scaleX) scaleX = 1;
				if (!scaleY) scaleY = 1;
				if (!isTransparent) isTransparent = false;
				var tex = me.methods.preloadImageUtilsLoadTexture($this, img);
				tex.repeat.x = (1/modY);
				tex.repeat.y = (1/modX);
				var mat = new THREE.MeshLambertMaterial({map: tex, transparent:isTransparent});
				//console.log(img, mat)
				return mat;
			},        
			//Calls ImageUtils.loadTexture and provides centralised tracking of when all textures have loaded.
			preloadImageUtilsLoadTexture: function($this, url, map, onLoad) {
				//console.log('$preloadImageUtilsLoadTexture', $this)
				var data = getDomData($this);
				//console.log('preloadImageUtilsLoadTexture', data);
				if (!data['preloadImages']) data['preloadImages'] = [];
				data.preloadImages[data.preloadImages.length] = url;
				return THREE.ImageUtils.loadTexture(url, map, function(texture) {
					me.methods.doImageUtilsLoadTexture($this, texture);
					if (onLoad) onLoad(texture);
				});
			},
			doImageUtilsLoadTexture:function($this, texture) { 
				var data = getDomData($this);
				var src = $(texture.image).attr('src'); 
				data.preloadImages.splice(data.preloadImages.indexOf(src), 1);
				if (data.preloadImages.length == 0 ) data = me.methods.preloadImageUtilsLoadTextureDone($this);
			},
			preloadImageUtilsLoadTextureDone:function($this) { 
				console.log('all images preloaded');
				var data = getDomData($this); 
		       	me.methods.animate(data.mainGroup, data.renderer, data.scene, data.camera, data.lastTime, data.angularSpeed);
			   	$this.click( function(event){
			   		me.methods.doThisMouseDown($this, event);
			   	});
		        data.renderer.render(data.scene, data.camera);
			},
			doThisMouseDown:function($this, event) {
				event.preventDefault();
				var data  = getDomData($this);
				var vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
				data.projector.unprojectVector( vector, data.camera );

				//PERSPECTIVE 
				var ray = new THREE.Ray( data.camera.position, vector.subSelf( data.camera.position ).normalize() );
				me.methods.checkMouseDownFaceGrid(ray, data);
			},
			animate: function(group, renderer, scene, camera, lastTime, angularSpeed){

		        // update
		        var date = new Date();
		        var time = date.getTime();
		        var timeDiff = time - lastTime;
		        var angleChange = angularSpeed * timeDiff * 2 * Math.PI / 500;
		        lastTime = time;
		 		//group.rotation.y-=angleChange;
		        // render
		        renderer.render(scene, camera);
		 
		        // request new frame
		        requestAnimFrame(function(){
				    if (fpsCounter && fpsCount > 25) {
		        		var thisLoop = new Date;
				   		fpsCounter.text(Math.round((10000 / (thisLoop - lastLoop))));
	    				lastLoop = thisLoop;
	    				fpsCount=0;
	    			}
		            fpsCount++;
			        me.methods.animate(group, renderer, scene, camera, lastTime, angularSpeed);
		        }); 
				return lastTime;
		    },
		    tweenCubeAmbientMovement: function(target, lattitude, delay) {
				if (!delay) delay = 0;
				var trans1 = 0.5,
				delay1 = 2+delay,
				trans2 = 0.5,
				delay2 = 2+delay1+trans2+trans1;

        		TweenMax.to(target, 
        			trans1, 
        			{
						delay:delay1,
	        			z:lattitude*0.5 - lattitude * Math.random()
	        		});
	
        		TweenMax.to(target, 
        			trans2, 
        			{
	        			z:0, 
	        			delay:delay2, 
	        			onComplete:me.methods.tweenCubeAmbientMovement,
	        			onCompleteParams:[target, lattitude]
	        		});
    		},
			tweenGroupAmbientRotation: function(target) {
	    		TweenMax.to(target, 
	    			2.5, 
	    			{
						x:(Math.random()*Math.PI/4) - Math.PI/8, 
	        			z:(Math.random()*Math.PI/8) - Math.PI/16, 
	        			delay:1.5, 
	        			onComplete:me.methods.tweenGroupAmbientRotation,
	        			onCompleteParams:[target]
	        		});
    		}
		};
	$.fn.xtrad = function (method) {
		me.methods = methods;
		me.settings = settings; 

		// Method calling logic
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist in '+plugin.name);
		}
	};
}(jQuery));