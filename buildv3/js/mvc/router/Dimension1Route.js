App.Dimension1Route = Em.Route.extend({
	subtitleController1:null,
	subtitleController2:null,
	dimension1NavController: null,
	isShowSkillList: false,
	init: function () {
		this._super();
		this.isStarted = false;
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
	doStart: function (type, data) { 
				
		this.subtitleController1.set('content', App.scriptModel); 
		this.subtitleController2.set('content', App.scriptModel);  
		
        this.subtitleController1.setup();
        this.subtitleController2.setup();

        this.subtitleController1.startReading();

    },
	model: function () {
		return (App.dimension1Model) ? App.dimension1Model : App.Dimension1Model.create();
	},
	setupController: function (controller, model) {
		controller.set('content', model);
	},
	renderTemplate: function () {
		if ( ( App.PRELOADER ) ? ( App.PRELOADER.isLoaded ) : false ) {
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
					switch (acontroller.get('orderRead')) {
						case '1': this.subtitleController1 = acontroller; break;
						case '2': this.subtitleController2 = acontroller; break;
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
		doSubtitle2: function () { 
			this.subtitleController1.set('isCursor', false); 
	        this.subtitleController2.startReading();
		},
		doShowSkillList: function () { 
			console.log('route isShowSkillList')
			this.get('controller').set('isShowSkillList', true);
		}
	},
	tryStart: function () {
        if (!this.isStarted && this.subtitleController1 && this.subtitleController2 ) {
			this.isStarted = true;
            this.doStart()
		}

    }
})