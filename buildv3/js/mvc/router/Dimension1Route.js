App.Dimension1Route=Em.Route.extend({subtitleView:null,subtitleController:null,dimension1NavController:null,activate:function(){this._super();this.doDim1Nav_start();App.eventMapper.addEventListener("dim1Nav_end",this,this.doDim1Nav_end);App.eventMapper.addEventListener("sub_finishedReading",this,this.dosub_finishedReading)},deactivate:function(){this._super();App.eventMapper.removeEventListener("dim1Nav_start",this);App.eventMapper.removeEventListener("dim1Nav_end",this);App.eventMapper.removeEventListener("sub_finishedReading",this)},doDim1Nav_start:function(a,b){subtitleController.setup(subtitleController.get("content").scriptD1);subtitleController.doSetupDraw();this.heartbeatController.myView.doStart();this.heartbeatController.createHeartbeat();this.scalarController.startDrawing();this.dimension1NavController.set("isShowStart",false)},dosub_finishedReading:function(){console.log("show end");this.dimension1NavController.set("isShowEnd",true)},doDim1Nav_end:function(){window.location.hash="d2"},model:function(){return(App.dimension1Model)?App.dimension1Model:App.Dimension1Model.create()},setupController:function(a,b){a.set("content",b)},renderTemplate:function(){if((App.static_preloader)?(App.static_preloader.isLoaded):false){this.render("dimension1");this.render("nav-list",{outlet:"nav-list"})}else{App.eventMapper.addEventListener("preloaderIsLoaded",this,function(a){return function(){a.renderTemplate()}}(this))}},events:{SubtitleView_InsertViewDone:function(b,a){if("Subtitle"==b.name){subtitleView=b;subtitleController=subtitleView.get("controller");subtitleController.set("content",App.scriptModel)}},SmartController_didInsertElement:function(a,b){switch(b){case"Dimension1NavController":this.dimension1NavController=a;break;case"HeartbeatController":this.heartbeatController=a;break;case"ScalarController":this.scalarController=a;break}}}});