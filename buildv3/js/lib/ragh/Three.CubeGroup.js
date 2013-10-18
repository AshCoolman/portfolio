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
	this.isHover = false;
	this._isInteractive = false;
	this.hoverMat = new THREE.MeshLambertMaterial( { color: 0xDC143C} ); //, opacity: 0.25, transparent: true
	this.linkMat = new THREE.MeshLambertMaterial( { color: 0xFF6347} ); //, opacity: 0.25, transparent: true
	this.map = [];
}

CubeGroup.prototype = {
	init: function (aplan) {
		this.group = this.createFromMap(aplan.imgMap);
		this.group.position.x = aplan['x'] || 0;
		this.group.position.y = aplan['y'] || 0;
		this.setInteractive(aplan['isInteractive']);
		this.label = aplan.label;
		this.hoverOff();
	},
	getInteractive: function (val) {
		return this._isInteractive;
	},
	
	setInteractive: function (val) {
	
		val = val || false;
		if (val && !this._isInteractive) {
			this._isInteractive = val;
			this.withEveryPixel(function (me) {
				return function (pixel) {
					pixel.object.material = me.linkMat;
				} 
			}(this));
		} else if (!val && this._isInteractive) {
			this._isInteractive = val;
			this.withEveryPixel(function (me) {
				return function (pixel) {
					pixel.object.material = pixel.material;
				} 
			}(this));
		}
	},
	
	
	
	tryAddHere: function (intersector) {
		/***
		var v0 = this.getFacePoint(intersector, this.SIZE);
		this.rollOverMesh.position.copy(v0);
		this.createCube(this.SIZE, v0.x, v0.y, v0.z, {}, this.materialsDict, this.group, this.geo, this.materials, this.isMerge );
		
		*/
	},

	show: function (intersector) {
		
		var v0 = this.getFacePoint(intersector, this.SIZE);
		this.rollOverMesh.position.copy(v0);
//		console.log('touched', this.group.children[0]);
		
		
	},
	
	hoverOn: function () {
		$('.world-3d-renderer').addClass('rotate-hint');
		var isChanged = false;
		if (!this.isHover && this._isInteractive) {
			this.withEveryPixel(function (me) {
				return function (pixel) {
					pixel.object.material = me.hoverMat;
					//pixel.object.rotation.z = Math.PI * .25;
				} 
			}(this));
			this.isHover = true;
			isChanged = true;
		}
		return isChanged;
	},
	
	hoverOff: function () {
		$('.world-3d-renderer').removeClass('rotate-hint');
		var isChanged = false;
		if (this.isHover) {
			this.withEveryPixel(function (me) {
				return function (pixel) {
					pixel.object.material = (me._isInteractive) ? me.linkMat : pixel.material;
				} 
			}(this));
			this.isHover = false;
			isChanged = true;
		}
		return isChanged;
	},
	
	withEveryPixel: function (afunc) {
		var map = this.map;
		//console.log(this.map);
		for (var xs = 0; xs < map.length; xs++) {
			if (!map[xs]) map[xs] = []
			for (var ys = 0; ys < map[xs].length; ys++) {
				if (!map[xs][ys]) map[xs][ys] = []
				for (var zs = 0; zs < map[xs][ys].length; zs++) {
					if (map[xs][ys][zs]) {
						setTimeout(function (me, amap, axs, ays, azs) {
							return function () {
								afunc(amap[axs][ays][azs], amap, axs, ays, azs );
							}
						}(this, map, xs, ys, zs),
						30 * ys/*map[xs][ys][zs].childrenIndex*/);
						
					}
				}
			}
		}
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
			pixelGroup = new THREE.Object3D(), //top right aligned Object3D for cubes
			centeredGroup = new THREE.Object3D(), //centered offset for centerpoint rotation
			reoffsetGroup = new THREE.Object3D(), //re-offset Object3D to ensure top right aligned
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
		
		
		for (var xs = 0; xs < map.length; xs++) {
			if (!map[xs]) map[xs] = []
			for (var ys = 0; ys < map[xs].length; ys++) {
				if (!map[xs][ys]) map[xs][ys] = []
				for (var zs = 0; zs < map[xs][ys].length; zs++) {
					if (map[xs][ys][zs]) {
						var cube = this.createCube( this.SIZE, xs*sz, -ys*sz, zs*sz, map[xs][ys][zs], this.materialsDict, pixelGroup, geo, materials, this.isMerge);

					
					}
				}
			}
		}
//		console.log(str);
		
		if (this.isMerge) {
			mesh = new THREE.Mesh( this.geo, new THREE.MeshFaceMaterial(this.materials));
			mesh.matrixAutoUpdate = false;
			mesh.updateMatrix();
			mesh.overdraw = false;
			mesh.name = 'cubeGroup';
	        pixelGroup.add(mesh);
		}
		
		pixelGroup.position.set(0, 0, 0);
		pixelGroup.updateMatrix();
		this.rollOverMesh = this.createRollOver()
		//pixelGroup.add( this.rollOverMesh );
		/*
		this.map = map;
		this.geo = geo;
		this.mesh = mesh;
		this.rollOverMesh = rollOverMesh;
		*/
		pixelGroup.position.x = - maxX * sz * 0.5
		centeredGroup.add(pixelGroup);
		centeredGroup.position.x = maxX * sz * 0.5
		reoffsetGroup.add(centeredGroup);
		this.group = reoffsetGroup;
		
		return reoffsetGroup;
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
		this.map = this.getMap(agroup);
		return mesh;
	},
	
	doRollOver: function () {
		
	},
	
	getMap: function (agroup) {
		var amap = [[[]]],
			cube,
			group = agroup,
			x, y, z;
		for (var c = 0; c <= group.children.length; c++, cube = group.children[c-1] ) {
			if (cube && cube != this.rollOverMesh) {	
				x = Math.round( cube.position.x / this.SIZE);
				y = -Math.round( cube.position.y / this.SIZE);
				z = Math.round( cube.position.z / this.SIZE);
				if (!amap[x]) amap[x]=[];
				if (!amap[x][y]) amap[x][y]=[];
				amap[x][y][z] = {childrenIndex: c, object:cube, material: cube.material};
			}
		}
		return amap;
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

