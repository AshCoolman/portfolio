if(typeof Object.createFromPrototype!=="function"){Object.createFromPrototype=function(d,b){function c(){}c.prototype=new d();var a=new c();if(a.init){a.init(b)}return a}}if(!ragh.THREE){ragh.THREE={}}ragh.THREE.Orbiter=function(){this.maxRot={x:Math.PI*0.125,y:Math.PI*0.025};this.windowHalfX=window.innerWidth/2;this.windowHalfY=window.innerHeight/2;this.WIN_BOUNDS_FACTOR=5};ragh.THREE.Orbiter.prototype={init:function(a){this.camera=a.camera;this.orbited=a.orbited;this.initRot={x:this.orbited.x,y:this.orbited.y};this.targetRot={x:this.orbited.x,y:this.orbited.y};this.mouse={};this.el=a.el;this.isStart=a.isStart||true;this.onPointerMove=function(b){return function(e){b.mouse.x=(e.pageX-b.windowHalfX);b.mouse.y=(e.pageY-b.windowHalfY);var c=b.WIN_BOUNDS_FACTOR,d={};d.x=b.mouse.x/Math.abs(b.mouse.x);d.y=b.mouse.y/Math.abs(b.mouse.y);b.targetRot.x=d.x*b.maxRot.x*Math.min(1,c*(Math.abs(b.mouse.x/b.windowHalfX)));b.targetRot.y=d.y*b.maxRot.y*Math.min(1,c*(Math.abs(b.mouse.y/b.windowHalfY)))}}(this);this.onDocumentTouchMove=function(b){return function(c){if(c.touches.length===1){c.preventDefault();b.mouse.x=c.touches[0].pageX-b.windowHalfX;b.mouse.y=c.touches[0].pageY-b.windowHalfY;b.targetRot.x=b.maxRot.x*b.mouse.x/b.windowHalfX;b.targetRot.y=b.maxRot.y*b.mouse.y/b.windowHalfY}}}(this);this.onWindowResize=function(b){return function(){b.windowHalfX=window.innerWidth/2;b.windowHalfY=window.innerHeight/2;b.camera.updateProjectionMatrix()}}(this);window.addEventListener("resize",this.onWindowResize,false);if(this.isStart){this.start()}},start:function(){this.el.addEventListener("mousemove",this.onPointerMove,false);this.el.addEventListener("touchmove",this.onPointerMove,false)},stop:function(){this.el.removeEventListener("mousemove",this.onPointerMove,false);this.el.removeEventListener("touchmove",this.onPointerMove,false)},animate:function(){if(this.targetRot&&this.targetRot.x&&this.targetRot.y){this.orbited.rotation.y=this.targetRot.x;this.orbited.rotation.x=this.targetRot.y}},destroy:function(){this.stop();window.removeEventListener("resize",this.onWindowResize,false)}};