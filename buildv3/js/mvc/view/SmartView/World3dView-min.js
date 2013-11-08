App.World3dView=App.SmartView.extend({templateName:"world-3d",className:"World3dView",label:"world-3d-view",tag:"canvas",materials:{},textures:{},VS:10,FACE_ASH:"face-ash",FACE_ASH_X:-540,FACE_ASH_Y:210,QUESTION_MARK:"question-mark",QUESTION_MARK_X:-90,QUESTION_MARK_Y:180,is3dCreated:false,isQuestionMarkDragger:false,instanceVarNameArr:["renderer","camera","isControls","controls","cursor3D","mouse2D","pickProjector","ray","rayCaster","scene","lastRequestAnimationFrame","voxelPosition","tmpVec","normalMatrix","tcanvas","ignoreList","pixelObjectList"],instanceVarObj:{},init:function(){this._super();this.set("isControls",false);this.set("scene",null);this.set("renderer",null);this.set("rendererStats",null);this.set("camera",null);this.set("controls",null);this.set("cursor3D",null);this.set("mouse2D",null);this.set("pickProjector",null);this.set("voxelPosition",null);this.set("normalMatrix",null);this.set("tmpVec",null);this.set("ignoreList",[]);this.set("pixelObjectList",{});var b=this.get("instanceVarNameArr"),a=this.get("instanceVarObj");for(var c=0;c<b.length;c++){a[b[c]]=this.get(b[c])}this.set("instanceVarObj",a);return this},observingIsQuestionMarkRotateHint:function(){var d=this.get("instanceVarObj").pixelObjectList[this.QUESTION_MARK];if(this.get("controller.isQuestionMarkRotatingHint")){var a=this.get("instanceVarObj"),c=a.pixelObjectList,b=a.camera,e=c[this.QUESTION_MARK].group.children[0].rotation;createjs.Tween.get(e).to({y:Math.PI*0.125},600).call(function(f,g){return function(){g.setInteractive(true)}}(this,c[this.QUESTION_MARK]))}}.observes("controller.isQuestionMarkRotatingHint"),observingIsQuestionMarkRotate:function(){var d=this.get("controller.isQuestionMarkRotating"),a=this.get("instanceVarObj"),c=a.pixelObjectList,b=a.camera;if(d&&!this.isQuestionMarkDragger&&b&&c[this.QUESTION_MARK]&&this.el){this.isQuestionMarkDragger=Object.createFromPrototype(ragh.THREE.Dragger,{camera:b,dragged:c[this.QUESTION_MARK].group.children[0],el:this.el});var e=Object.createFromPrototype(ragh.THREE.Orbiter,{camera:b,orbited:c[this.FACE_ASH].group.children[0],el:document});this.set("orbiter",e)}else{if(!d&&this.isQuestionMarkDragger){c[this.QUESTION_MARK]&&c[this.QUESTION_MARK].setInteractive(false);this.isQuestionMarkDragger.destroy();this.isQuestionMarkDragger=false}}}.observes("controller.isQuestionMarkRotating"),observingIs3dCreated:function(a,b){if(b){$(".background-2d-to-3d-ash",this.get("$el")).css("display","none");$(".background-2d-to-3d-question-mark",this.get("$el")).css("display","none")}}.observes("is3dCreated"),didInsertElement:function(){this._super();var instanceVarObj=this.get("instanceVarObj");WIDTH=App.BREAKPOINT.WIDTH_2,HEIGHT=App.BREAKPOINT.HEIGHT_2,VIEW_ANGLE=45,ASPECT=WIDTH/HEIGHT,NEAR=0.1,FAR=10000;App.world3d=this;with(instanceVarObj){this._super();this.set("$canvasHeroHolder",$(".canvas-hero-holder",this.get("$el")));scene=new THREE.Scene();renderer=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});this.get("$canvasHeroHolder").append(renderer.domElement);var $canvas=$(renderer.domElement).addClass("world-3d-renderer canvas-hero");this.set("$canvas",$canvas);this.set("camera",camera=new THREE.OrthographicCamera(-WIDTH/2,WIDTH/2,HEIGHT/2,-HEIGHT/2,1,5000));camera.position.set(0,0,1000);scene.add(camera);scene.add(new THREE.AmbientLight(3355443).position.copy(new THREE.Vector3(0,0,50)));var directionalLight=new THREE.DirectionalLight(16777215,1);directionalLight.position.set(0,0,1);scene.add(directionalLight);cursor3D=new THREE.Object3D();cursor3D.overdraw=true;ignoreList.push(cursor3D);scene.add(cursor3D);mouse2D=new THREE.Vector3(0,10000,0.5);pickProjector=new THREE.Projector();voxelPosition=new THREE.Vector3();normalMatrix=new THREE.Matrix3();tmpVec=new THREE.Vector3()}setTimeout(function(me,ainstanceVarObj){return function(){var plans=[{imgMap:me.createFromImage(App.PRELOADER.queue.getResult("face-ash-pixel")),x:me.FACE_ASH_X+15,y:me.FACE_ASH_Y+15,label:me.FACE_ASH},{imgMap:me.createFromImage(App.PRELOADER.queue.getResult("question-pixel")),x:me.QUESTION_MARK_X+15,y:me.QUESTION_MARK_Y+15,label:me.QUESTION_MARK}];for(var p=0;p<plans.length;p++){var pixelatedObj=Object.createFromPrototype(CubeGroup,plans[p]),pixelatedObjGroup=pixelatedObj.group;ainstanceVarObj.ignoreList.push(pixelatedObj.rollOverMesh);ainstanceVarObj.scene.add(pixelatedObjGroup);ainstanceVarObj.pixelObjectList[plans[p].label]=pixelatedObj}me.tryStart(ainstanceVarObj)}}(this,instanceVarObj),0);this.get("$canvasHeroHolder").append('<div class="canvas-hero background-2d-to-3d-ash"><div class="bg-ash"></div></div>');this.get("$canvasHeroHolder").append('<div class="canvas-hero background-2d-to-3d-question-mark"><div class="bg-question-mark"></div></div>');this.set("$bg2dto3dAsh",$(".background-2d-to-3d-ash",this.get("$canvasHeroHolder")));this.set("$bg2dto3dAshBg",$(".bg-ash",this.get("$canvasHeroHolder")));this.set("$bg2dto3dQuestionMark",$(".background-2d-to-3d-question-mark",this.get("$canvasHeroHolder")));this.set("$bg2dto3dQuestionMarkBg",$(".bg-question-mark",this.get("$canvasHeroHolder")));this.resize();$canvas.mouseleave(function(me){return function(e){var pixels=me.get("instanceVarObj").pixelObjectList;for(var p=0;p<pixels.length;p++){if(pixels[p].hoverOff()){$canvas.removeClass("interactive")}}}}(this))},tryCreateRenderStats:function(){if(!App.DEBUG){return null}var a=new THREEx.RendererStats();a.domElement.style.position="absolute";a.domElement.style.left="0px";a.domElement.style.bottom="0px";document.body.appendChild(a.domElement);return a},createControls:function(b){var a=new THREE.TrackballControls(b);a.target.set(0,0,0);a.rotateSpeed=1;a.zoomSpeed=1.2;a.panSpeed=0.8;a.noZoom=false;a.noPan=false;a.staticMoving=true;a.dynamicDampingFactor=0;a.keys=[65,83,68];a.addEventListener("change.world3d",function(c){return function(){this.redraw}}(this));return a},tryStart:function(b){if(b.pixelObjectList[this.FACE_ASH]&&b.pixelObjectList[this.QUESTION_MARK]){var a=function(d){var c=function(f){var e=(this.lastRequestAnimationFrame)?f-this.lastRequestAnimationFrame:0;this.lastRequestAnimationFrame=f;d.redraw(e);d.set("raf",window.requestAnimationFrame(c))};return c}(this);this.set("raf",window.requestAnimationFrame(a));this.get("$el").on("mousemove",function(c){return function(d){c.onDocumentMouseMove(d)}}(this));$(window).bind("resize.world3d",function(c){return function(){c.resize()}}(this));this.set("is3dCreated",true);this.resize()}},createFromImage:function(u,j,d,l){var b=new THREE.Object3D(),n=this.get("instanceVarObj");this.get("$el").append('<canvas class="temp">');this.$tcanvas=$("canvas.temp",this.get("$el")).css("display","none");this.tcanvas=this.$tcanvas[0];if(!this.tcanvas.getContext){setTimeout(function(c){return function(){c.createFromImage(u)}}(this),1000)}else{var s=[[[]]],g=u.width,p=u.height,a,r=this.tcanvas,m=r.getContext("2d"),q,k;m.drawImage(u,0,0);q=m.getImageData(0,0,g,p);k=q.data;for(var o=0;o<k.length;o+=4){a=o/4;if(k[o+3]==255){var f=a%g;var e=Math.floor(a/g);if(!s[f]){s[f]=[]}if(!s[f][e]){s[f][e]=[]}var t=(65536*k[o+0]+256*k[o+1]+k[o+2]).toString(16);s[f][e][0]={color:"#"+t}}}this.$tcanvas=this.tcanvas=null;$("canvas",this.get("$el")).remove(".temp");return s}},onDocumentMouseMove:function(d){var b=this.get("instanceVarObj");var i=$("body").offset().left;var g=$("body").offset().top;mouseX=d.pageX-i;mouseY=d.pageY-g;var c=App.BREAKPOINT.WIDTH_2/this.w;var f=$(".world-3d-renderer",this.get("$el")).offset();var a=mouseX-f.left;var h=mouseY-f.top;b.mouse2D.x=c*(a-this.w/2);b.mouse2D.y=c*(-h+this.h/2)},onDocumentMouseDown:function(event){with(this){event.preventDefault();var intersects=ray.intersectObjects(questionGroup.children,true);console.log("intersects",intersects);if(intersects.length>0){intersector=testIsIgnored(intersects);if(false){if(intersector.object!=plane){scene.remove(intersector.object)}}else{intersector=testIsIgnored(intersects);if(intersector){this.questionVoxelGroup.tryAddHere(intersector)}}}}},resize:function(){var $canvas=$(this.get("instanceVarObj").renderer.domElement),w,h,bp=App.BREAKPOINT,W=bp.WIDTH_2,H=bp.HEIGHT_2,canvasHeroClass,canvasHeroHolderClass,tmpwinWidth=this.tmpwinWidth=$(window).width(),tmpwinHeight=this.tmpwinHeight=$(window).height();if(tmpwinWidth>bp.WIDTH_2&&tmpwinHeight>bp.HEIGHT_2*1.5){w=bp.WIDTH_2;h=bp.HEIGHT_2;canvasHeroClass="canvas-hero";canvasHeroHolderClass="canvas-hero-holder"}else{if(tmpwinWidth>bp.WIDTH_1&&tmpwinHeight>bp.HEIGHT_1*1.5){w=bp.WIDTH_1;h=bp.HEIGHT_1;canvasHeroClass="canvas-hero-med";canvasHeroHolderClass="canvas-hero-holder-med"}else{w=bp.WIDTH_0;h=bp.HEIGHT_0;canvasHeroClass="canvas-hero-small";canvasHeroHolderClass="canvas-hero-holder-small"}}this.w=w;this.h=h;if(this.get("is3dCreated")){$canvas.removeClass("canvas-hero canvas-hero-med canvas-hero-small");$canvas.addClass(canvasHeroClass);$canvas.parent().removeClass("canvas-hero-holder canvas-hero-holder-med canvas-hero-holder-small");$canvas.parent().addClass(canvasHeroHolderClass);with(this.get("instanceVarObj")){renderer.setSize(w,h);camera.left=-W/2;camera.right=W/2;camera.top=H/2;camera.bottom=-H/2;camera.position.set(0,0,1000);camera.updateProjectionMatrix();if(isControls){controls.handleResize()}}}else{this.get("$bg2dto3dAsh").css({"margin-left":Math.round(this.FACE_ASH_X*(w/W))+"px ","margin-top":Math.round((270-this.FACE_ASH_Y)*(h/H))+"px"});this.get("$bg2dto3dAshBg").css({"background-size":Math.round(100*w/W)+"%"});this.get("$bg2dto3dQuestionMark").css({"margin-left":Math.round(this.QUESTION_MARK_X*(w/W))+"px ","margin-top":Math.round((270-this.QUESTION_MARK_Y)*(h/H))+"px"});this.get("$bg2dto3dQuestionMarkBg").css({"background-size":Math.round(100*w/W)+"%"})}},redraw:function(dur){var instanceVarObj=this.get("instanceVarObj");if(this.isQuestionMarkDragger&&this.isQuestionMarkDragger.dragged&&this.isQuestionMarkDragger.dragged.rotation){var a180=1*Math.PI,a360=2*Math.PI,tolerance=0.01,targetRot=2*Math.PI*0.75,targetDif=this.isQuestionMarkDragger.dragged.rotation.y-targetRot;while(targetDif<-a180){targetDif+=a360}while(targetDif>a180){targetDif-=a360}targetDif=Math.round(1000*targetDif)/1000;if(Math.min(tolerance,targetDif)==tolerance){this.isQuestionMarkDragger.animate()}else{this.isQuestionMarkDragger.dragged.rotation.y=targetRot;this.get("controller").send("view_doQuestionMarkRotateDone")}}var orbiter;if(orbiter=this.get("orbiter")){orbiter.animate()}with(instanceVarObj){cursor3D.position.x=mouse2D.x;cursor3D.position.y=mouse2D.y;var rayTouches,touched,pixelGroup;var amouse2D=mouse2D.clone();amouse2D.x=2*amouse2D.x/App.BREAKPOINT.WIDTH_2;amouse2D.y=2*amouse2D.y/App.BREAKPOINT.HEIGHT_2;ray=pickProjector.pickingRay(amouse2D.clone(),camera);var isAtLeastOneHover=false;for(var i in pixelObjectList){pixelGroup=pixelObjectList[i];rayTouches=ray.intersectObjects(pixelGroup.group.children,true,[]);if(touched=this.testIsIgnored(rayTouches)){pixelGroup.show(touched);pixelGroup.hoverOn();isAtLeastOneHover=pixelGroup.getInteractive()}else{pixelGroup.hoverOff();if(i==0){console.log("didnt touch")}}}if(isAtLeastOneHover&&!this.get("$el").hasClass("interactive")){this.get("$el").addClass("interactive")}else{if(!isAtLeastOneHover&&this.get("$el").hasClass("interactive")){this.get("$el").removeClass("interactive")}}renderer.render(scene,camera);if(isControls){controls.update()}if(App.DEBUG){rendererStats.update(renderer)}}},testIsIgnored:function(c){var b=false,a;for(var d=0;d<c.length;d++){a=c[d];if(this.ignoreList.indexOf(a.object)==-1){return a}}return null},setVoxelPosition:function(ime,aintersector){with(ime){normalMatrix.getNormalMatrix(aintersector.object.matrixWorld);tmpVec.copy(aintersector.face.normal);tmpVec.applyMatrix3(normalMatrix).normalize();voxelPosition.addVectors(aintersector.point,tmpVec);voxelPosition.x=Math.floor(voxelPosition.x/this.VS)*this.VS+this.VS/2;voxelPosition.y=Math.floor(voxelPosition.y/this.VS)*this.VS+this.VS/2;voxelPosition.z=Math.floor(voxelPosition.z/this.VS)*this.VS+this.VS/2;return voxelPosition}},addE3d:function(a){this.scene.add(a)},willDestroyElement:function(){console.log("willDestroyElement 1",this.get("instanceVarObj"));var instanceVarObj=this.get("instanceVarObj");App.world3d=null;console.log("willDestroyElement 2");with(instanceVarObj){console.log("scene",scene);for(var pg=0;pg<pixelObjectList.length;pg++){pixelObjectList[pg].cleanUp();scene.remove(pixelObjectList[pg].group)}for(var sc=0;sc<scene.__objects.length;sc++){var obj=scene.__objects.length;scene.remove(obj);if(obj.geometry){obj.geometry.dispose()}if(obj.material){if(obj.material instanceof THREE.MeshFaceMaterial){$.each(obj.material.materials,function(idx,obj){obj.dispose()})}else{obj.material.dispose()}}if(obj.dispose){obj.dispose()}}}for(var i=0;i<instanceVarObj.length;i++){this.set(instanceVarObj[i],null)}this.set("instanceVarObj",null);window.cancelAnimationFrame(this.get("raf"));this.set("raf",null);this.get("$el").unbind("mousemove");$(window).unbind("resize.world3d")}});