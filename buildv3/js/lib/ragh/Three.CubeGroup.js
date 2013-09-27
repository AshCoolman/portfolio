if (typeof Object.createFromPrototype !== 'function') {
    Object.createFromPrototype = function (o, initArg) {
        function F() {}
        F.prototype = new o();
		var newObj = new F();
		if (newObj.init) {
			newObj.init(initArg);
		}
        return newObj;
    };
}

var CubeGroup = function () {
	this.isMerge = false;
	this.rollOver = null;
	this.SIZE = 30;
	this.materialsDict = {};
	this.group = null;
}

CubeGroup.prototype = {
	init: function (aplan) {
		this.group = this.createFromMap(aplan.imgMap);
		this.group.position.x = aplan['x'] || 0;
		this.group.position.y = aplan['y'] || 0;
		this.label = aplan.label;
	},

	tryAddHere: function (intersector) {
		/***
		var v0 = this.getFacePoint(intersector, this.SIZE);
		this.rollOverMesh.position.copy(v0);
		this.createCube(this.SIZE, v0.x, v0.y, v0.z, {}, this.materialsDict, this.group, this.geo, this.materials, this.isMerge );
		this.getMap();
		*/
	},

	show: function (intersector) {
		
		var v0 = this.getFacePoint(intersector, this.SIZE);
		this.rollOverMesh.position.copy(v0);
		
	},
	
	getFacePoint: function ( intersector, size) {
		var v0 = new THREE.Vector3(),
			v1 = new THREE.Vector3();
		v0.copy( intersector.object.position );
		v1.copy(intersector.face.centroid).normalize();
		v1.multiplyScalar(size);
		v0.add(v1);
		return v0;
	},

	createFromMap: function (amap) {
		if (!amap) {
			throw 'CubeGroup.createFromMap() passed "amap" parameter is falsey';
		}
		var sz = this.SIZE,
			maxX = 0, 
			maxY = 0, 
			maxZ = 0,
			group = new THREE.Object3D(),
			map = (amap ? amap : this.defaultMap),
			materials,
			geo,
			mesh,
			rollOverMesh;
			
		if (this.isMerge) {
			materials=[];
			geo = new THREE.Geometry();
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
					}
				}
			}
		}
		
		var str = '\n\n';
		console.log('MAX', maxX, maxY, maxZ);
		for (var xs = 0; xs < map.length; xs++) {
			if (!map[xs]) map[xs] = []
			for (var ys = 0; ys < map[xs].length; ys++) {
				if (!map[xs][ys]) map[xs][ys] = []
				for (var zs = 0; zs < map[xs][ys].length; zs++) {
					if (map[xs][ys][zs]) {
						var cube = this.createCube( this.SIZE, xs*sz, -ys*sz, zs*sz, map[xs][ys][zs], this.materialsDict, group, geo, materials, this.isMerge);

						str += '{{controlWithVars "cogged-pixel" cogged-pixel x='+(-15+(xs+2)*sz)+' y='+(240+(0.5-maxY+ys)*sz)+' height=30 width=30}}\n';
					}
				}
			}
		}
		console.log(str);
		
		if (this.isMerge) {
			mesh = new THREE.Mesh( this.geo, new THREE.MeshFaceMaterial(this.materials));
			mesh.matrixAutoUpdate = false;
			mesh.updateMatrix();
			mesh.overdraw = false;
			mesh.name = 'cubeGroup';
	        group.add(mesh);
		}
		
		group.position.set(0, 0, 0);
		group.updateMatrix();
		this.rollOverMesh = this.createRollOver()
		//group.add( this.rollOverMesh );
		this.group = group;
		/*
		this.map = map;
		this.geo = geo;
		this.mesh = mesh;
		this.rollOverMesh = rollOverMesh;
		*/
		return group;
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
	
	createCube: function (aSIZE, x, y, z, data, amaterialsDict, agroup, ageo, amaterials, asisMerge) {
		var sz = aSIZE,
			color = amaterialsDict[data.color],
			mesh, 
			geo = new THREE.CubeGeometry( sz, sz, sz, 1, 1, 1 );
			
			
		if (!this.materialsDict[data.color]) {
			this.materialsDict[data.color] = color = new THREE.MeshLambertMaterial({color: data.color});
		}
		if (!asisMerge) {	
			THREE.GeometryUtils.merge(geo, new THREE.Geometry());
			mesh = new THREE.Mesh( geo, color);
			mesh.position = new THREE.Vector3( x, y, z);
			agroup.add( mesh );
		} else {
			for(var i = 0 ; i < geo.vertices.length; i++) {
				geo.vertices[i].add (new THREE.Vector3( x, y, z));
			}
			THREE.GeometryUtils.merge(ageo, geo, amaterials.length);
			for (var b=0; b<6; b++) {
				amaterials.push( color);
			}
		}
		return mesh;
	},
	
	getMap: function () {
		var amap = [[[]]],
			cube,
			group = this.group,
			x, y, z;
		for (var c = 0; c < group.children.length; c++, cube = group.children[c-1] ) {
			if (cube && cube != this.rollOverMesh) {	
				x = Math.round( cube.position.x / this.SIZE);
				y = Math.round( cube.position.y / this.SIZE);
				z = Math.round( cube.position.z / this.SIZE);
				if (!amap[x]) amap[x]=[];
				if (!amap[x][y]) amap[x][y]=[];
				amap[x][y][z] = {name: c};
			}
		}
		//console.log('EXPORT\n', JSON.stringify(amap));
	},
	cleanUp: function() {
		
			this.materials = null;
			this.geo = null;
			this.mesh = null;
			this.rollOverMesh = null;
			this.group = null;
				
			this.materials = null;
			this.geo = null;
			this.mesh = null;
			this.rollOverMesh = null;
			this.group = null;
			this.materialsDict = null;
	}
}

