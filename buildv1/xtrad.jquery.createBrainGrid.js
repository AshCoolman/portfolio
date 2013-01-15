

/**
*	 v1.0
**/
	
var jQuery;
(function ($) {




	
	/**
	*	 Major property <code>me</code> holds plugin properties that are set at runtime
	**/
	var me = {
		},
	
	/**
	*	 Major property <code>settings</code> holds plugin properties that are set before runtime
	**/
		settings = {
			author: 'Ashley Coleman',
			layerName: 'createBrainGrid',
			layerLabel: 'Create brain grid'
		},
		


		methods = {
			/* FUNCTION */
			init : function (options) {
				return this.each(function () {        /*Note - this pluggin is should not be used on a collection of DOM objects*/
					$.extend(settings, options);
					me.$this = $(this);
					me.$this.xtrad('addLayer', settings.layerName, settings.layerLabel, 'create', 'update', 'destroy');
				});
			},
			create: function($this, data) {
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
				//me.methods.tweenGroupAmbientRotation(data.brainGroup.rotation);
			},
			update: function ($dom) {

			},
			destroy: function ($dom) {

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

			