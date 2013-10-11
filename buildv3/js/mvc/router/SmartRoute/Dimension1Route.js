App.Dimension1Route = App.SmartRoute.extend({
	subtitleController1:null,
	subtitleController2:null,
	dimension1NavController: null,
	activate: function () {
		this._super();
		
		this.addEvents({
			SubtitleView_InsertViewDone: function (achildview, another) {
				
			},
			SmartController_didInsertElement: function (acontroller, alabel) {
				switch (alabel) {
					case 'SubtitleController': 
						switch (acontroller.get('orderRead')) {
							case '0': this.subtitleController0 = acontroller; break;
							case '1': this.subtitleController1 = acontroller; break;
							case '2': this.subtitleController2 = acontroller; break;
							case '3': this.subtitleController3 = acontroller; break;
						}
						break;  
					case 'Dimension1NavController':  	this.dimension1NavController = acontroller; 	break;
					case 'HeartbeatController':  		this.heartbeatController = acontroller; 		break;
					case 'ScalarController':  			this.scalarController = acontroller;			break;
				}
					setTimeout(function (me) {return function () {me.tryStart();}}(this), 0);
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
			doSubtitle3: function () { 
		        this.subtitleController3.startReading();
			}
		});
	},
	deactivate: function () {
		this._super();
		App.eventMapper.removeEventListener('dim1Nav_start', this);
		App.eventMapper.removeEventListener('dim1Nav_end', this);
		App.eventMapper.removeEventListener('sub_finishedReading', this);
		this.subtitleController0 = null;
		this.subtitleController1 = null;
		this.subtitleController2 = null;
		this.subtitleController3 = null;
		this.heartbeatController = null;
		this.scalarController = null;
	},
	doStart: function (type, data) { 
				
		this.subtitleController0.set('content', App.scriptModel); 
		this.subtitleController1.set('content', App.scriptModel); 
		this.subtitleController2.set('content', App.scriptModel);
		this.subtitleController3.set('content', App.scriptModel); 
		
        this.subtitleController0.setup();
        this.subtitleController1.setup();
        this.subtitleController2.setup();
        this.subtitleController3.setup();

        this.subtitleController0.startReading();
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
	     	this.render("dimension1-background", {outlet: "background"});
		} else {
			App.eventMapper.addEventListener('preloaderIsLoaded', this, function(me){
				return function() {
					me.renderTemplate();
				}
			}(this));
		}
	},
	
	tryStart: function () {	
		//console.log([this.isStarted, this.subtitleController1, this.subtitleController2, this.subtitleController3].join(', '))
	
		if (!this.get('isStarted') && this.subtitleController0 && this.subtitleController1 && this.subtitleController2 && this.subtitleController3) {
		this.set('isStarted', true);
            this.doStart()
		}

    }
})