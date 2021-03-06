if (typeof Object.createFromPrototype !== 'function') {
    Object.createFromPrototype = function (o, initArg) {
        function F () {}
        F.prototype = new o();
		var newObj = new F();
		if (newObj.init) {
			newObj.init(initArg);
		}
        return newObj;
    };
}
if (!ragh.THREE) {
	ragh.THREE = {};
}
ragh.THREE.Orbiter = function () {
	this.maxRot = {x:Math.PI * 0.125, y:Math.PI * 0.025};
	this.windowHalfX= window.innerWidth / 2;
	this.windowHalfY = window.innerHeight / 2;
	this.WIN_BOUNDS_FACTOR = 5;
	
}

ragh.THREE.Orbiter.prototype = {
	init: function (aplan) {
		this.camera = aplan.camera;
		this.orbited = aplan.orbited;
		this.initRot = {x: this.orbited.x, y:this.orbited.y}
		this.targetRot = {x: this.orbited.x, y:this.orbited.y};
		this.mouse = {}
		this.el = aplan.el;
		this.isStart = aplan.isStart || true;
		
		
		this.onPointerMove = function( me ) {
			return function( event ) {
				me.mouse.x = ( event.pageX - me.windowHalfX );
				me.mouse.y =  ( event.pageY - me.windowHalfY );
				
				var wbf = me.WIN_BOUNDS_FACTOR,
					dir = {};
				dir.x = me.mouse.x / Math.abs(me.mouse.x);
				dir.y = me.mouse.y / Math.abs(me.mouse.y);
				
				me.targetRot.x = dir.x * me.maxRot.x * Math.min(1, wbf * ( Math.abs( me.mouse.x / me.windowHalfX )));
				me.targetRot.y = dir.y * me.maxRot.y * Math.min(1, wbf * ( Math.abs( me.mouse.y / me.windowHalfY )));	
			}
		}(this);

		this.onDocumentTouchMove = function( me ) {
			return function( event ) {
				if ( event.touches.length === 1 ) {
					event.preventDefault();
					me.mouse.x = event.touches[ 0 ].pageX - me.windowHalfX;
					me.mouse.y = event.touches[ 0 ].pageY - me.windowHalfY;
					me.targetRot.x = me.maxRot.x * me.mouse.x / me.windowHalfX;
					me.targetRot.y = me.maxRot.y * me.mouse.y / me.windowHalfY;
				}
			}
		}(this);
		
		
		this.onWindowResize = function(me) {
			return function () {
				me.windowHalfX = window.innerWidth / 2;
				me.windowHalfY = window.innerHeight / 2;
				me.camera.updateProjectionMatrix();
			}
		}(this);
		
		
		window.addEventListener( 'resize', this.onWindowResize, false );
		
		if (this.isStart) this.start();
	},
	
	start: function () {
		this.el.addEventListener( 'mousemove', this.onPointerMove, false );
		this.el.addEventListener( 'touchmove', this.onPointerMove, false );
	},
	
	stop: function () {
		this.el.removeEventListener( 'mousemove', this.onPointerMove, false );
		this.el.removeEventListener( 'touchmove', this.onPointerMove, false );
	},

	animate: function () {
 		//console.log('animate', this.orbited.rotation, this.targetRot)
		if (this.targetRot && this.targetRot.x && this.targetRot.y) {
			this.orbited.rotation.y = this.targetRot.x;
			this.orbited.rotation.x = this.targetRot.y;
		}
		
	},
	destroy: function () {
		this.stop();
		window.removeEventListener( 'resize', this.onWindowResize, false );
		
	}
}
			
