
var CubeGroup = {
	isMerge: false,
	rollOver: null,
	SIZE: 30,
	materialsDict: {},
	tryAddHere: function (intersector) {
		var v0 = this.getFacePoint(intersector);
		this.rollOverMesh.position.copy(v0);
		this.createCube(v0.x, v0.y, v0.z, {});
		this.getMap();
	},

	show: function (intersector) {
		var v0 = this.getFacePoint(intersector);
		this.rollOverMesh.position.copy(v0);
	},
	
	getFacePoint: function ( intersector ) {
		var v0 = new THREE.Vector3(),
			v1 = new THREE.Vector3();
		v0.copy( intersector.object.position );
		v1.copy(intersector.face.centroid).normalize();
		v1.multiplyScalar(this.SIZE);
		v0.add(v1);
		return v0;
	},

	createFromMap: function (amap) {
		if (!amap) {
			throw 'CubeGroup.createFromMap() passed "amap" parameter is falsey';
		}
		var sz = this.SIZE,
			grp = this.grp = new THREE.Object3D(),
			maxX = 0, 
			maxY = 0, 
			maxZ = 0.
			map = (amap ? amap : this.defaultMap);
			
		if (this.isMerge) {
			this.materials=[];
			this.geo = new THREE.Geometry();
		}
		
		for (var xs = 0; xs < map.length; xs++) {
			if (!map[xs]) map[xs] = []
			for (var ys = 0; ys < map[xs].length; ys++) {
				if (!map[xs][ys]) map[xs][ys] = []
				for (var zs = 0; zs < map[xs][ys].length; zs++) {
					if (map[xs][ys][zs]) {
						maxX = Math.max(maxX, xs);
						maxY = Math.max(maxY, ys);
						maxZ = Math.max(maxZ, zs);
						this.createCube( xs*sz, -ys*sz, zs*sz, map[xs][ys][zs] );
					}
				}
			}
		} 
		if (this.isMerge) {
		  
		  this.mesh = new THREE.Mesh( this.geo, new THREE.MeshFaceMaterial(this.materials));
			this.mesh.matrixAutoUpdate = false;
			this.mesh.updateMatrix();
			this.mesh.overdraw = false;
			this.mesh.name = 'cubeGroup';
	        grp.add(this.mesh);
	
		}
		grp.position.set(sz*(0.5), sz*(-0.5), 0);
		grp.updateMatrix()
		window.grp = grp
		grp.add( this.rollOverMesh = this.createRollOver() );
		//grp.add( this.plane = this.createPlane() ); 
		//var tween = createjs.Tween.get(this.rollOverMesh.rotation, {  loop: true }).to( { y:2 * Math.PI}, 2000 );		

		//var tween = createjs.Tween.get(grp.rotation, { loop: true }).to( { y: 2 * Math.PI,  z: Math.random()*2 * Math.PI }, 60000 );
		
		//grp.add( this.plane );
		return grp;
	},
	createPlane: function () {
		var plane = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000, 20, 20 ), new THREE.MeshBasicMaterial( { color: 0x555555, wireframe: true } ) );
		plane.rotation.z = Math.PI / 2;
		return plane
	},
	createRollOver: function () {
		
		if (!this.isMerge) {
			var rollOverGeo =  new THREE.CubeGeometry( this.SIZE, this.SIZE, this.SIZE, 1, 1, 1 ),
				rollOverMesh = new THREE.Mesh( rollOverGeo, new THREE.MeshLambertMaterial( { color: 0x0000ff, opacity: 0.25, transparent: true} )),
				rollOverLight = new THREE.PointLight(0x333399);

			rollOverMesh.matrixAutoUpdate = true;
			rollOverMesh.add( rollOverLight );
			rollOverLight.intensity = 2;
			return rollOverMesh 
		}
		
		var rollOverLight = new THREE.PointLight(0x333399);
		rollOverLight.intensity = 2;
		return rollOverLight;
	},
	
	createCube: function (x, y, z, data) {
		var mesh, 
			sz = this.SIZE,
			geo = new THREE.CubeGeometry( sz, sz, sz, 1, 1, 1 ),
			//geo = new THREE.SphereGeometry( sz, 1, 1 ),
			color = this.materialsDict[data.color];
			
		if (!this.materialsDict[data.color]) {
			this.materialsDict[data.color] = color = new THREE.MeshLambertMaterial({color: data.color});
		}
		if (!this.isMerge) {	
			
			THREE.GeometryUtils.merge(geo, new THREE.Geometry());
			mesh = new THREE.Mesh( geo, color);
			mesh.position = new THREE.Vector3( x, y, z);
			this.grp.add( mesh );
		} else {
			for(var i = 0 ; i < geo.vertices.length; i++) {
				geo.vertices[i].add (new THREE.Vector3( x, y, z));
			}
			THREE.GeometryUtils.merge(this.geo, geo, this.materials.length);
			for (var b=0; b<6; b++) {
				this.materials.push( color);
			}
		}
		return mesh;
	},
	
	getMap: function () {
		var amap = [[[]]],
			cube,
			grp = this.grp,
			x, y, z;
		for (var c = 0; c < grp.children.length; c++, cube = grp.children[c-1] ) {
			if (cube && cube != this.rollOverMesh) {	
				x = Math.round( cube.position.x / this.SIZE);
				y = Math.round( cube.position.y / this.SIZE);
				z = Math.round( cube.position.z / this.SIZE);
				if (!amap[x]) amap[x]=[];
				if (!amap[x][y]) amap[x][y]=[];
				amap[x][y][z] = {name: c};
			}
		}
		console.log('EXPORT\n', JSON.stringify(amap));
	},
	cleanup: function() {
			this.grp = null;
			this.materials = [];
			this.geo = null;
			this.mesh = null;
			this.rollOverMesh = null;
			this.materialsDict = {};
	}
}

