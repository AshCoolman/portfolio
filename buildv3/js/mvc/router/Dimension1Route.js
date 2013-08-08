App.Dimension1Route = Em.Route.extend({
	subtitleView:null, 
	subtitleController:null,
	dimension1NavController: null,
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
	},
	doDim1Nav_start: function (type, data) { 
		this.subtitleController.setup( this.subtitleController.get('content').scriptD1 );
		this.subtitleController.doSetupDraw();
		
		this.heartbeatController.myView.doStart();
		this.heartbeatController.createHeartbeat();
		this.scalarController.startDrawing();
		this.dimension1NavController.set('isShowStart', false);
	},
	dosub_finishedReading: function() {
		this.dimension1NavController.set('isShowEnd', true);
	},
	doDim1Nav_end: function () {			
		window.location.hash = 'd2';
	},
	doStart: function (type, data) {
		this.subtitleController.set('content', App.scriptModel); 
        this.subtitleController.setup(this.subtitleController.get("content").scriptD1);
        this.subtitleController.doSetupDraw();
        this.dimension1NavController.set("isShowStart", false)
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
		SmartController_didInsertElement: function(acontroller, alabel) {
			console.log('SmartController_didInsertElement label', alabel);
			switch (alabel) {
				case 'SubtitleController': 			this.subtitleController = acontroller; this.subtitleView = acontroller.get('view'); break;  
				case 'Dimension1NavController':  	this.dimension1NavController = acontroller; 	break;
				case 'HeartbeatController':  		this.heartbeatController = acontroller; 		break;
				case 'ScalarController':  			this.scalarController = acontroller; 			break;
			}
			this.tryStart();
		},
		SubtitleController_didInsertElement: function (acontroller, alabel) { 
		
		},
		doGotoDimension2: function () { 
			window.location.hash = 'd2';
		}
	},
	tryStart: function () {
        if (this.subtitleController && this.dimension1NavController /*&& this.scalarController*/) {
            this.doStart()
        }
    }
})