App.PreloaderContentController=App.SmartController.extend({isLoaded:false,templateName:"preloader-content",isLoadedList:[],queue:{},view_didInsertElement:function(a){App.PRELOADER=this;this._super(a);this.queue=new createjs.LoadQueue();this.queue.installPlugin(createjs.Sound);this.queue.addEventListener("complete",(function(b){return function(f,e,h,g){b.isLoadedList.push("All done.");b.set("infoHtml",b.isLoadedList.join(" loaded<br/>"));b.isLoaded=true;App.eventMapper.trigger("preloaderIsLoaded",{target:b.queue})}}(this)));this.queue.addEventListener("fileload",(function(b){return function(e){var d=e.item;var c=d.type;b.isLoadedList.push(d.src);b.set("infoHtml",b.isLoadedList.join(" loaded<br/>"));if(c==createjs.LoadQueue.IMAGE){}App.preloadedImages[d.id]=e.result}}(this)));this.queue.loadManifest([{id:"face-ash-pixel",src:"img//face-ash-pixel.png"},{id:"face-ash",src:"img//face-ash.png"},{id:"face-user-pixel",src:"img//face-user-pixel.png"},{id:"face-user-pixel-change01",src:"img//face-user-pixel-change01.png"},{id:"face-user-pixel-change02",src:"img//face-user-pixel-change02.png"},{id:"face-user-pixel-change03",src:"img//face-user-pixel-change03.png"},{id:"face-user-pixel",src:"img//face-user-pixel.png"},{id:"question-pixel",src:"img//question-pixel.png"},{id:"hammer",src:"img//hammer.png"},{id:"question",src:"img//question.png"},{id:"machine-pixel",src:"img//machine-pixel.png"},{id:"cog",src:"img/cog.png"}])},infoHtml:"1st",isLoadedListObserved:function(){console.log("infoHtmlSet");infoHtml=this.isLoadedList.join(", ")}.observes("isLoadedList")});