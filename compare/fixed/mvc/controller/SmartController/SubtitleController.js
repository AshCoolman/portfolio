/**
* @todo require
**/
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
		
		
		
		

App.SubtitleController = App.SmartController.extend({
	controllerName:'Script Subtitle Controller',
	text: '',
	read:{},
	lines:[],
	isEnded: false,
	tOut:undefined,
	ARF: undefined,
	ARF_last: undefined,
	ARF_drawStart: undefined,
	ARF_startTime: undefined,
	ARF_diff: undefined,
	init: function () {

		return this._super();
	},
	setup: function (ascript) {
		this.read.lines = ascript.split('.');
		for (var l = 0; l < this.read.lines.length; l++ ) {
			this.read.lines[l] = (this.read.lines[l]).split('');
		}
		this.read.currentLine = 0;
		this.read.currentChar = 0;
		this.set('text', '');
		

	},
	readChar: function (dur) {
		var read = this.read,
			lines = this.read.lines,
			isNewLine = false,
			delay;
		
		if (read.currentLine < lines.length) {
			if ( read.currentChar < lines[ read.currentLine].length) {
				delay = 1 / this.get('content').get('cpms');
			} else {
				delay = 200;
				isNewLine = true;
			}	
		} else {
			this.isEnded = true;
			console.log('isEnded');
			App.eventMapper.triggerEvent(ragh.MEvt.create('sub_finishedReading', {target:this}))
		}
		if (dur > delay) {
			dur -= delay;
			if (!isNewLine) {
				this.set('text', this.get('text') + '' + lines[read.currentLine][read.currentChar]);
				read.currentChar++;
			} else {	
				read.currentChar = 0;
				read.currentLine++;
				this.set('text', ''); //start fresh
			}
		};
		
		return dur;
	},
	doSetupDraw: function () {
    	this.ARF_startTime = window.mozAnimationStartTime || Date.now();
		this.ARF_diff = 0;
		this.ARF_last = Date.now();
	    this.ARF = window.requestAnimationFrame( this.doDraw.bind(this) );
		console.log('doSetupDraw', this.ARF, this.ARF_startTime, this.ARF_diff, this.ARF_last);
	},
	
	doDraw: function (atime) {
		with (this) {
			ARF_startTime = Date.now();
			ARF_diff += (ARF_startTime - ARF_last);
	        var prevDif = ARF_diff;
		
			while (prevDif != (ARF_diff = readChar(ARF_diff))) {
				prevDif = ARF_diff;
			}
		
			ARF_last = ARF_startTime;
			if (ARF) window.cancelAnimationFrame( ARF );
		    if (!isEnded) ARF =  window.requestAnimationFrame(doDraw.bind(this));
		}
    }
});

App.register('controller:subtitle', App.SubtitleController, {singleton: false }); //Yeah holy shit that was not obvious
