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
	tOut:undefined,
	ARF: undefined,
	ARF_last: undefined,
	ARF_drawStart: undefined,
	ARF_startTime: undefined,
	ARF_diff: undefined,
	init: function () {
		this.addAutoMappedEvent('d1Start', this, this.doD1Start);
		return this._super();
	},
	setup: function () {
		this.read.lines = this.get('content').script.split('.');
		for (var l = 0; l < this.read.lines.length; l++ ) {
			this.read.lines[l] = (this.read.lines[l]+'.').split('');
		}
		this.read.currentLine = 0;
		this.read.currentChar = 0;
		this.set('text', '');
		

	},
	doD1Start: function (type, target) { 
		this.setup();
		
		if (true) {
			this.doSetupDraw();
			//this.doDraw();
		} else {
			this.readWord();
		}
	},
	readChar: function (dur) {
		var read = this.read,
			lines = this.read.lines,
			isNewLine = false,
			delay;
		
		if (read.currentLine < lines.length) {
			if ( read.currentChar < lines[ read.currentLine].length) {
				delay = 1 / this.get('content').get('cpms');
					//console.log('d', delay)
			} else {
				delay = 2000;
				isNewLine = true;
			}	
		}
		if (dur > delay) {
			dur -= delay;
			if (!isNewLine) {
				this.set('text', this.get('text') + '' + lines[read.currentLine][read.currentChar]);
				read.currentChar++;
			} else {	
				read.currentChar = 0;
				read.currentLine++;
				this.set('text', '');
			}
		};
		
		return dur;
	},
	doSetupDraw: function () {
    	this.ARF_startTime = window.mozAnimationStartTime || Date.now();
		this.ARF_diff = 0;
		this.ARF_last = Date.now();
	    this.ARF = window.requestAnimationFrame(this.doDraw.bind(this));
		//console.log('setup', this.ARF_startTime, this.ARF_diff, this.ARF_last);
	},
	
	doDraw: function (atime) {
		
		this.ARF_startTime = Date.now();
		this.ARF_diff += (this.ARF_startTime - this.ARF_last);
        var prevDif = this.ARF_diff;
		
		while (prevDif != (this.ARF_diff = this.readChar(this.ARF_diff))) {
			prevDif = this.ARF_diff;
		}
		
		this.ARF_last = this.ARF_startTime;
	    this.ARF = window.requestAnimationFrame(this.doDraw.bind(this));
    },

	view_willDestroyElement: function () {
		//window.cancelAnimationFrame(this.ARF);
		clearTimeout(this.tOut);
		this.setup();
	}
})