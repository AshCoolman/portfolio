App.IndexRoute=App.SmartRoute.extend({indexNavController:null,subtitleController:null,activate:function(){this._super();this.addEvents({SubtitleController_didInsertElement:function(a,b){if(a.get("readOrder")=="1"){this.subtitleController1=a}if(a.get("readOrder")=="2"){this.subtitleController2=a}if(a.get("readOrder")=="3"){this.subtitleController3=a}if(a.get("readOrder")=="4"){this.subtitleController4=a}this.tryStart()},IndexNavController_didInsertElement:function(a,b){this.indexNavController=a;this.tryStart()},SmartController_didInsertElement:function(a,b){},doGotoDimension1:function(){window.location.hash="d1"},doInstruction:function(){},doSecondSubtitle:function(){this.subtitleController1.set("isCursor",false);this.subtitleController2.startReading()},doThirdSubtitle:function(){this.subtitleController2.set("isCursor",false);this.subtitleController3.startReading()},doFourthSubtitle:function(){this.subtitleController4.startReading()}});return this},deactivate:function(){App.eventMapper.removeEventListener("indNav_end",this);this.subtitleController1=null;this.subtitleController2=null;this.subtitleController3=null;this.subtitleController4=null},doStart:function(a,b){this.subtitleController1.startReading()},doEnd:function(a,b){if(this.indexNavController){this.indexNavController.set("isShowEnd",false);window.location.hash="d1"}},renderTemplate:function(){if(App.PRELOADER?App.PRELOADER.isLoaded:false){this.render("index");this.render("nav-list",{outlet:"nav-list"})}else{App.eventMapper.addEventListener("preloaderIsLoaded",this,function(a){return function(){a.renderTemplate()}}(this))}},tryStart:function(){if(!this.get("isStarted")&&this.subtitleController1&&this.subtitleController2&&this.subtitleController3&&this.subtitleController4){this.get("isStarted",true);this.doStart()}}});