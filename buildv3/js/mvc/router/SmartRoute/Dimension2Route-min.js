App.Dimension2Route=App.SmartRoute.extend({questionController:null,model:function(){return(App.dimension2Model)?App.dimension2Model:App.Dimension2Model.create()},activate:function(){this._super();this.addEvents({SmartController_didInsertElement:function(a,b){switch(b){case"World2dController":this.world2dController=a;break;case"QuestionController":this.questionController=a;break;case"MachineController":this.machineController=a;break;case"AshController":this.ash=a;break;case"UserController":this.userController=a;break;case"SubtitleController":switch(a.get("orderRead")){case"heading":this.subHeadingController=a;break;case"1":this.sub1Controller=a;break;case"2":this.sub2Controller=a;break;case"3":this.sub3Controller=a;break;case"instructionTurnOn":this.instructionTurnOnController=a;break;case"instructionTurnOff":this.instructionTurnOffController=a;break;case"example":this.subExampleController=a;break}break;case"Dimension2NavController":this.dimension2NavController=a;default:break}setTimeout(function(c){return function(){c.tryStart()}}(this),0)},SubtitleController_didInsertElement:function(){},doGotoDimension3:function(){window.location.hash="d3"},doShowUser:function(){this.userController.doShowPixelInChildren(1200)},doHideUser:function(){this.userController.doShowPixelOutChildren(1200)},doShowQuestion:function(){this.questionController.doShowPixelInChildren(300)},doShowMachineCogs:function(){this.machineController.doCogOpenAndFadeOut(1200);this.machineController.setInteractive(false)},doShowMachine:function(){this.ash.doHammer();setTimeout(function(a){return function(){a.machineController.doShowLineInChildren(2000)}}(this),500);setTimeout(function(a){return function(){a.ash.removeHammer()}}(this),2500)},doInstructionTurnOnController:function(){this.machineController.setInteractive(true);this.instructionTurnOnController.startReading()},doMachineTurnOn:function(){if(!this.isFirstTurnOn){this.isFirstTurnOn=true;this.instructionTurnOnController.doRemoveClicked();this.instructionTurnOffController.startReading()}},doMachineTurnOff:function(){if(!this.isFirstTurnOff){this.isFirstTurnOff=true;this.instructionTurnOffController.doRemoveClicked();this.sub1Controller.set("isCursor",false);this.sub2Controller.startReading()}},doSubtitle1:function(){this.subHeadingController.set("isCursor",false);this.sub1Controller.startReading()},doSubtitle2:function(){this.sub1Controller.set("isCursor",false);this.sub2Controller.startReading()},doSubtitle3:function(){this.sub2Controller.set("isCursor",false);this.sub3Controller.startReading()},doSubtitleExample:function(){setTimeout(function(a){return function(){a.subExampleController.startReading()}}(this),2200)},doMosaicFinished:function(){}})},deactivate:function(){this._super();this.questionController=null;this.world2dController=null;this.subHeadingController=null;this.sub1Controller=null;this.sub2Controller=null;this.sub3Controller=null;this.instructionTurnOnController=null;this.instructionTurnOffController=null;this.subExampleController=null;this.machineController=null;this.userController=null;this.isFirstTurnOn=null;this.isFirstTurnOff=null;this.ash=null},renderTemplate:function(){if(App.PRELOADER.isLoaded){this.render("dimension2");this.render("nav-list",{outlet:"nav-list"})}else{App.eventMapper.addEventListener("preloaderIsLoaded",this,function(a){return function(){a.renderTemplate()}}(this))}},tryStart:function(){if(!this.get("isStarted")&&this.questionController&&this.world2dController&&this.machineController&&this.userController&&this.subHeadingController&&this.sub1Controller&&this.sub2Controller&&this.sub3Controller&&this.instructionTurnOnController&&this.instructionTurnOffController&&this.ash&&this.subExampleController){this.machineController.setTarget(this.userController);this.set("isStarted",true);this.doStart()}},doStart:function(a,b){this.subHeadingController.startReading()}});