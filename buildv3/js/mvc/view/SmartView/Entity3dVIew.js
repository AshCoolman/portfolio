App.Entity3dView = App.SmartView.extend({
	templateName: 'entity-3d',
	didInsertElement: function () {
		this._super();
		this.override_3dCreate();
	},
	override_3dCreate: function () {
		var map = [
			'__XXXXXX',
			'_XXX____',
			'_XX_____',
			'X_______',
		];

		for (var p=0; p<map.length; p++) {
			map[p] = map[p].split('');
		}
		
		for (var r = 0; r < map.length; r++) {
		}
		 
		var sz = 30,
    		mod=rows =12,
    		spc=sz,
    		materials = [],
			data = this.data = {},
			w3d = App.world3d,
			grp = this.grp = new THREE.Object3D(),
			faceTex = w3d.textures['face'],
			brainTex = w3d.textures['brain'] = THREE.ImageUtils.loadTexture('img/brain.png'),
			brainMat = w3d.materials['brain'] =  new THREE.MeshBasicMaterial({map: brainTex}),
			greenMat = new THREE.MeshLambertMaterial({map: brainTex, transparent:true}),
			faceMat;
		
		console.log("THREE.ImageUtils.loadTexture('img/brain.png')", faceTex, THREE.ImageUtils.loadTexture('img/brain.png'))
		for (var b=0; b<5; b++) {
			materials.push( brainMat) ;//new THREE.MeshLambertMaterial({map: faceTex}) );
		}

        for (var i=0; i<(mod*mod); i++) {
			var faceTex = THREE.ImageUtils.loadTexture('img/face-ash.png');
			faceTex.offset.x = (i%mod)/(mod);
			faceTex.offset.y = (i-(i%mod))/(mod*mod);
			faceTex.repeat.x = faceTex.repeat.y = 1/mod;
			faceMat = new THREE.MeshLambertMaterial({map: faceTex, transparent:true});
			
			var cubeMaterials = materials.slice();
			cubeMaterials.splice(4, 0, faceMat);
			var brainGeo = new THREE.CubeGeometry(sz, sz, sz,1,1,1);
			var brainMesh = data['cubeBrain'+i] = new THREE.Mesh(brainGeo, new THREE.MeshFaceMaterial(cubeMaterials));
			brainMesh.overdraw = false;
			
			var row = Math.floor( i / mod );
        	brainMesh.position.set( 	(spc*(i%mod))-(spc*(mod-1)/2), 
    									spc * ( row - (rows-1)/2) , 
        								0);
			grp.add( brainMesh );
			
        }
		var light = new THREE.PointLight(0xFFFFFF);
		//grp.add( light );
		var offset = 100
		light.position.set(0, 0, offset);
		createjs.Tween.get(grp.rotation).to({y:Math.PI}, 1500).wait(1500).to({y:0}, 1500);
        grp.position.set(sz * mod / 2, sz * -mod / 2,0);
		App.world3d.addE3d(grp);
	
	},
	override_3dUpdate: function () {
		
	},
	willDestroyElement: function () {
		this._super();
		window.cancelAnimationFrame(this.get('raf'));
	}
	
})