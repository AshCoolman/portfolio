
var CubeGroup = {
	isMerge: false,
	rollOver: null,
	SIZE: 110,
	map: 	[
				[
					[ {volume:1}, null, {volume:1}],
					[ null, {volume:1}]
				],
				[
					[null, null, {volume:1}, null, {volume:1}]
				]
			],
	add: function (x, y, z) {
		
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
		this.rollOverMesh = new THREE.Mesh( rollOverGeo, new THREE.MeshLambertMaterial( { color: 0x0000ff, opacity: 0.75, transparent: true} ));
		
		this.rollOverMesh.matrixAutoUpdate = true;
		grp.add( this.rollOverMesh );
		

		
		//var tween = createjs.Tween.get(this.rollOverMesh.rotation, {  loop: true }).to( { y:2 * Math.PI}, 2000 );		
 		
	
		
		grp.position.x = 400;
		grp.position.y = -300;
		
		
		var tween = createjs.Tween.get(grp.rotation, {
	        loop: true
	    }).to( { y: 2 * Math.PI,  z: Math.random()*2 * Math.PI }, 60000 );


		this.plane = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000, 20, 20 ), new THREE.MeshBasicMaterial( { color: 0x555555, wireframe: false } ) );
		this.plane.rotation.z = Math.PI / 2;
		//grp.add( this.plane );
		
	

		
		return grp;
	},
	
	show: function (intersector) {
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
		v0.add(dir)
		
		this.rollOverMesh.position.copy(v0);
		
	},
	createCube: function (x, y, z, data) {
		console.log('mesh', x, y, z)
		
		var sz = 100;
		var geo = new THREE.CubeGeometry( sz, sz, sz, 1, 1, 1 );
		if (!this.isMerge) {	
			var mesh = new THREE.Mesh( geo, new THREE.MeshLambertMaterial( { color: 0xFF0044} ));
			mesh.position = new THREE.Vector3( x, y, z);
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
	}
	
}
