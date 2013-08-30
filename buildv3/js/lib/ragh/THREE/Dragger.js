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
ragh.THREE.Dragger = function () {
	this.targetRotation = 0;
	this.targetRotationOnMouseDown = 0;

	this.mouseX = 0;
	this.mouseXOnMouseDown = 0;

	this.windowHalfX = window.innerWidth / 2;
	this.windowHalfY = window.innerHeight / 2;
}

ragh.THREE.Dragger.prototype = {
	init: function (aplan) {
		this.camera = aplan.camera;
		this.dragged = aplan.dragged;
		this.el = aplan.el;
		console.log('Dragged, init', aplan)
		
		
		
		this.onWindowResize = function(me) {
			return function () {
				me.windowHalfX = window.innerWidth / 2;
				me.windowHalfY = window.innerHeight / 2;

				me.camera.aspect = window.innerWidth / window.innerHeight;
				me.camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );
			}
		}(this);

		//

		this.onDocumentMouseDown = function( me ) {
			return function (event) {
				event.preventDefault();
				console.log('mousedown', me.el)
				me.el.addEventListener( 'mousemove', me.onDocumentMouseMove, false );
				me.el.addEventListener( 'mouseup', me.onDocumentMouseUp, false );
				me.el.addEventListener( 'mouseout', me.onDocumentMouseOut, false );

				me.mouseXOnMouseDown = event.clientX - me.windowHalfX;
				me.targetRotationOnMouseDown = me.targetRotation;
			}

		}(this);

		this.onDocumentMouseMove = function( me ) {
			return function( event ) {

				me.mouseX = event.clientX - me.windowHalfX;

				me.targetRotation = me.targetRotationOnMouseDown + ( me.mouseX - me.mouseXOnMouseDown ) * 0.02;
				
			}
		}(this);

		this.onDocumentMouseUp = function( me ) {
			return function( event ) {

				me.el.removeEventListener( 'mousemove', me.onDocumentMouseMove, false );
				me.el.removeEventListener( 'mouseup', me.onDocumentMouseUp, false );
				me.el.removeEventListener( 'mouseout', me.onDocumentMouseOut, false );
			}
		}(this);

		this.onDocumentMouseOut = function( me ) {
			return function( event ) {

				me.el.removeEventListener( 'mousemove', me.onDocumentMouseMove, false );
				me.el.removeEventListener( 'mouseup', me.onDocumentMouseUp, false );
				me.el.removeEventListener( 'mouseout', me.onDocumentMouseOut, false );
			}
		}(this);

		this.onDocumentTouchStart = function( me ) {
			return function( event ) {

				if ( event.touches.length === 1 ) {

					event.preventDefault();

					me.mouseXOnMouseDown = event.touches[ 0 ].pageX - me.windowHalfX;
					me.targetRotationOnMouseDown = me.targetRotation;

				}
			}
		}(this);

		this.onDocumentTouchMove = function( me ) {
			return function( event ) {

				if ( event.touches.length === 1 ) {

					event.preventDefault();

					me.mouseX = event.touches[ 0 ].pageX - me.windowHalfX;
					me.targetRotation = me.targetRotationOnMouseDown + ( me.mouseX - me.mouseXOnMouseDown ) * 0.05;

				}
			}
		}(this);
		
		
		this.el.addEventListener( 'mousedown', this.onDocumentMouseDown, false );
		this.el.addEventListener( 'touchstart', this.onDocumentTouchStart, false );
		this.el.addEventListener( 'touchmove', this.onDocumentTouchMove, false );
		window.addEventListener( 'resize', this.onWindowResize, false );
	},
	
	

	animate: function () {
		this.dragged.rotation.y += ( this.targetRotation - this.dragged.rotation.y ) * 0.05;
		

	},
	
	destroy: function () {

		this.el.removeEventListener( 'mousemove', this.onDocumentMouseMove, false );
		this.el.removeEventListener( 'mouseup', this.onDocumentMouseUp, false );
		this.el.removeEventListener( 'mouseout', this.onDocumentMouseOut, false );	
		
		this.el.removeEventListener( 'mousedown', this.onDocumentMouseDown, false );
		this.el.removeEventListener( 'touchstart', this.onDocumentTouchStart, false );
		this.el.removeEventListener( 'touchmove', this.onDocumentTouchMove, false );
		window.removeEventListener( 'resize', this.onWindowResize, false );
		
	}
}
			
