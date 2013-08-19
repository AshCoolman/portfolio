App.Dimension1Route = Em.Route.extend({
	subtitleController1:null,
	subtitleController2:null,
	dimension1NavController: null,
	init: function () {
		this._super();
		this.isStarted = false;
	},
	activate: function () {
		this._super();
		App.eventMapper.addEventListener('dim1Nav_start', this, this.doDim1Nav_start );
		App.eventMapper.addEventListener('dim1Nav_end', this, this.doDim1Nav_end );
		App.eventMapper.addEventListener('sub_finishedReading', this, this.dosub_finishedReading );
	},
	deactivate: function () {
		this._super();
		App.eventMapper.removeEventListener('dim1Nav_start', this);
		App.eventMapper.removeEventListener('dim1Nav_end', this);
		App.eventMapper.removeEventListener('sub_finishedReading', this);
		this.subtitleController1.deactivate();
		this.subtitleController2.deactivate();
		this.subtitleController1 = null;
		this.subtitleController2 = null;
		this.isStarted = null;
		this.heartbeatController = null;
		this.scalarController = null;
		
	},
	doDim1Nav_start: function (type, data) { 

	},
	dosub_finishedReading: function() {
	//	this.dimension1NavController.set('isShowEnd', true);
	},
	doDim1Nav_end: function () {			
		window.location.hash = 'd2';
	},
	doStart: function (type, data) {
		//console.log('STARTED DIMENSION 1', this.subtitleController1.get('thescript'), this.subtitleController2.get('thescript'))			
		this.subtitleController1.set('content', App.scriptModel); 
        this.subtitleController1.setup();//this.subtitleController1.get("content").scriptD1);
        this.subtitleController1.doSetupDraw();
		/*
		this.heartbeatController.myView.doStart();
		this.heartbeatController.createHeartbeat();
		this.scalarController.startDrawing();
		this.dimension1NavController.set('isShowStart', false);
		*/
    },
	model: function () {
		return (App.dimension1Model) ? App.dimension1Model : App.Dimension1Model.create();
	},
	setupController: function (controller, model) {
		controller.set('content', model);
	},
	renderTemplate: function () {
		if ( ( App.static_preloader ) ? ( App.static_preloader.isLoaded ) : false ) {
			this.render('dimension1');
	     	this.render("nav-list", {outlet: "nav-list"});
		} else {
			App.eventMapper.addEventListener('preloaderIsLoaded', this, function(me){
				return function() {
					me.renderTemplate();
				}
			}(this));
		}
	},
	events: {
		SubtitleView_InsertViewDone: function (achildview, another) {},
		SmartController_didInsertElement: function(acontroller, alabel) {;
			switch (alabel) {
				case 'SubtitleController': 			
													//console.log('SubtitleController> label', acontroller.get('orderRead'))
													if (acontroller.get('orderRead') == '1') {
														this.subtitleController1 = acontroller;
														//console.log('***1 subtitleController1 set', acontroller.get('orderRead'))
													} else if (acontroller.get('orderRead') == '2') {
														this.subtitleController2 = acontroller;
														//console.log('***2 subtitleController1 set', acontroller.get('orderRead'))
													}
													break;  
				case 'Dimension1NavController':  	this.dimension1NavController = acontroller; 	break;
				case 'HeartbeatController':  		this.heartbeatController = acontroller; 		break;
				case 'ScalarController':  			this.scalarController = acontroller;			break;
			}
			this.tryStart();
		},
		SubtitleController_didInsertElement: function (acontroller, alabel) { 
		
		},
		doGotoDimension2: function () { 
			window.location.hash = 'd2';
		},
		doSecondSubtitle: function () { 
			this.subtitleController1.set('isCursor', false);
			this.subtitleController2.set('content', App.scriptModel); 
	        this.subtitleController2.setup();//this.subtitleController1.get("content").scriptD1);
	        this.subtitleController2.doSetupDraw();
		}
	},
	tryStart: function () {
        if (!this.isStarted && this.subtitleController1 && this.subtitleController2 /*&& this.scalarController*/) {
			this.isStarted = true;
            this.doStart()
		}

    }
})