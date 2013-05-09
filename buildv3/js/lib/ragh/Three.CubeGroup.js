
var CubeGroup = {
	isMerge: false,
	rollOver: null,
	SIZE: 50,
	map: 	[
				[
					[ 
						{volume:1}, {volume:1}, {volume:1}
					],
					
					[ 
						{volume:1}, null, {volume:1}
					]
				]
			],
	tryAddHere: function (intersector) {
		var v0 = this.getFacePoint(intersector);
		this.rollOverMesh.position.copy(v0);
		
		var acube = this.createCube(v0.x, v0.y, v0.z, {});
		//acube.position.copy(object.position);
		//this.grp.add( acube );
		this.getMap();
	},

	show: function (intersector) {
		var v0 = this.getFacePoint(intersector);
		this.rollOverMesh.position.copy(v0);
	},
	
	getFacePoint: function ( intersector ) {
		var face = intersector.face
		var distance = intersector.distance;
		var point = intersector.point;
		var faceIndex = intersector.faceIndex;
		var object = intersector.object; 
		var v0 = new THREE.Vector3(),
			v1 = new THREE.Vector3();
		v0.copy( object.position );
		if (!this.dir) dir = new THREE.Vector3();
		dir.copy(intersector.face.centroid).normalize();
		dir.multiplyScalar(this.SIZE);
		v0.add(dir);
		return v0;
	},
	
	addCube: function (pos) {
		
	},
	remove: function (x, y, z) {
		
	},
	render: function () {
		this['create']();
	},
	doClick: function (thing) {
		
	},
	create: function (grp) {
		var map = this.map,
			sz = this.SIZE;
		if (!grp) {
			grp = new THREE.Object3D();
		}
		this.grp = grp;
		this.color = new THREE.MeshLambertMaterial({color: 0xff9933});
		this.materials = [];
		if (this.isMerge) {
			this.geo = new THREE.Geometry();//new THREE.Geometry();
		}
		for (var xs = 0; xs < map.length; xs++) {
			for (var ys = 0; ys < map[xs].length; ys++) {
				for (var zs = 0; zs < map[xs][ys].length; zs++) {
					if (map[xs][ys][zs]) {
						this.createCube(xs*sz, ys*sz, zs*sz, map[xs][ys][zs]);
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
		var rollOverGeo =  new THREE.CubeGeometry( sz, sz, sz, 1, 1, 1 );
		this.rollOverMesh = new THREE.Mesh( rollOverGeo, new THREE.MeshLambertMaterial( { color: 0x0000ff, opacity: 0.25, transparent: true} ));
		this.rollOverMesh.matrixAutoUpdate = true;
		var rollOverLight = new THREE.PointLight(0x333399);
		this.rollOverMesh.add( rollOverLight );
		rollOverLight.intensity = 2;
		grp.add( this.rollOverMesh );
		//var tween = createjs.Tween.get(this.rollOverMesh.rotation, {  loop: true }).to( { y:2 * Math.PI}, 2000 );		
		grp.position.x = 0;
		grp.position.y = 0;
		//var tween = createjs.Tween.get(grp.rotation, { loop: true }).to( { y: 2 * Math.PI,  z: Math.random()*2 * Math.PI }, 60000 );
		this.plane = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000, 20, 20 ), new THREE.MeshBasicMaterial( { color: 0x555555, wireframe: false } ) );
		this.plane.rotation.z = Math.PI / 2;
		//grp.add( this.plane );
		return grp;
	},
	createCube: function (x, y, z, data) {
		console.log('mesh', x, y, z)
		var mesh, 
			sz = this.SIZE,
			geo = new THREE.CubeGeometry( sz, sz, sz, 1, 1, 1 );
		if (!this.isMerge) {	
			mesh = new THREE.Mesh( geo, new THREE.MeshLambertMaterial( { color: 0xFF0044} ));
			mesh.position = new THREE.Vector3( x, y, z);
			
			console.log('+', x, y, z, mesh.position)
			
			this.grp.add( mesh );
		} else {
			for(var i = 0 ; i < geo.vertices.length; i++) {
				geo.vertices[i].add (new THREE.Vector3( x, y, z));
			}
			THREE.GeometryUtils.merge(this.geo, geo, this.materials.length);
			for (var b=0; b<6; b++) {
				this.materials.push( this.color);
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
				console.log(cube.position, x, y, z, '>', amap)	
				amap[x][y][z] = {name: c};
			}
		}
		console.log('EXPORT\n', JSON.stringify(amap));
	}
}