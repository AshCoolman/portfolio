if(typeof Object.createFromPrototype!=="function"){Object.createFromPrototype=function(d,b){function c(){}c.prototype=new d();var a=new c();if(a.init){a.init(b)}return a}}if(!ragh.THREE){ragh.THREE={}}ragh.THREE.Dragger=function(){this.targetRotation=0;this.targetRotationOnMouseDown=0;this.mouseX=0;this.mouseXOnMouseDown=0;this.windowHalfX=window.innerWidth/2;this.windowHalfY=window.innerHeight/2};ragh.THREE.Dragger.prototype={init:function(a){this.camera=a.camera;this.dragged=a.dragged;this.el=a.el;console.log("Dragged, init",a);this.onWindowResize=function(b){return function(){b.windowHalfX=window.innerWidth/2;b.windowHalfY=window.innerHeight/2;b.camera.updateProjectionMatrix()}}(this);this.onDocumentMouseDown=function(b){return function(c){c.preventDefault();b.el.addEventListener("mousemove",b.onDocumentMouseMove,false);b.el.addEventListener("mouseup",b.onDocumentMouseUp,false);b.el.addEventListener("mouseout",b.onDocumentMouseOut,false);b.mouseXOnMouseDown=c.clientX-b.windowHalfX;b.targetRotationOnMouseDown=b.targetRotation}}(this);this.onDocumentMouseMove=function(b){return function(c){b.mouseX=c.clientX-b.windowHalfX;b.targetRotation=b.targetRotationOnMouseDown+(b.mouseX-b.mouseXOnMouseDown)*0.02}}(this);this.onDocumentMouseUp=function(b){return function(c){b.el.removeEventListener("mousemove",b.onDocumentMouseMove,false);b.el.removeEventListener("mouseup",b.onDocumentMouseUp,false);b.el.removeEventListener("mouseout",b.onDocumentMouseOut,false)}}(this);this.onDocumentMouseOut=function(b){return function(c){b.el.removeEventListener("mousemove",b.onDocumentMouseMove,false);b.el.removeEventListener("mouseup",b.onDocumentMouseUp,false);b.el.removeEventListener("mouseout",b.onDocumentMouseOut,false)}}(this);this.onDocumentTouchStart=function(b){return function(c){if(c.touches.length===1){c.preventDefault();b.mouseXOnMouseDown=c.touches[0].pageX-b.windowHalfX;b.targetRotationOnMouseDown=b.targetRotation}}}(this);this.onDocumentTouchMove=function(b){return function(c){if(c.touches.length===1){c.preventDefault();b.mouseX=c.touches[0].pageX-b.windowHalfX;b.targetRotation=b.targetRotationOnMouseDown+(b.mouseX-b.mouseXOnMouseDown)*0.05}}}(this);this.el.addEventListener("mousedown",this.onDocumentMouseDown,false);this.el.addEventListener("touchstart",this.onDocumentTouchStart,false);this.el.addEventListener("touchmove",this.onDocumentTouchMove,false);window.addEventListener("resize",this.onWindowResize,false)},animate:function(){this.dragged.rotation.y+=(this.targetRotation-this.dragged.rotation.y)*0.05},destroy:function(){this.el.removeEventListener("mousemove",this.onDocumentMouseMove,false);this.el.removeEventListener("mouseup",this.onDocumentMouseUp,false);this.el.removeEventListener("mouseout",this.onDocumentMouseOut,false);this.el.removeEventListener("mousedown",this.onDocumentMouseDown,false);this.el.removeEventListener("touchstart",this.onDocumentTouchStart,false);this.el.removeEventListener("touchmove",this.onDocumentTouchMove,false);window.removeEventListener("resize",this.onWindowResize,false)}};