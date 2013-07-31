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
	label:'SubtitleController',
	text: '',
	cursorChar: '∆',
	read:{},
	isForceFinish:false,
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
		if (ascript[ascript.length-2] == '.') {
			ascript = ascript.substr(0, ascript.length-2);
		}
		this.read.srcLines = ascript.split('.');
		for (var l = 0; l < this.read.srcLines.length; l++ ) { 
			this.read.srcLines[l] = (this.read.srcLines[l]).split('');
		}
		this.read.currentLine = 0;
		this.read.currentChar = 0;
		this.read.printedLines = [''];
		this.read.currentPrintedLine = 0;
		this.set('text', '');
		

	},
	view_didInsertElement: function (aview) {
		this._super(aview);
		this.send('SubtitleController_didInsertElement', this);
	},
	readChar: function (dur) {
		var read = this.read,
			srcLines = this.read.srcLines,
			printedLines = this.read.printedLines,
			isNewLine = false,
			delay;
		
		if (read.currentLine < srcLines.length) {
			if ( read.currentChar < srcLines[ read.currentLine].length) {
				delay = 1 / this.get('content').get('cpms');
			} else {
				delay = 1200;
				isNewLine = true;
			}	
			if (dur > delay) {
				dur -= delay;
				if (!isNewLine) {
					printedLines[read.currentPrintedLine] += srcLines[read.currentLine][read.currentChar];
					this.set('text', '<p class="subtitle-text">'+printedLines.join('<br/>')+'</p>');
					read.currentChar++;
				} else {	
					
					read.currentChar = 0;
					read.currentLine++;
					read.currentPrintedLine++;
					if (srcLines[ read.currentLine] && srcLines[ read.currentLine][1] == '@') {	
						var eventStr = srcLines[ read.currentLine].join('').split(' ')[1];
						App.eventMapper.triggerEvent(ragh.MEvt.create(eventStr));
						read.currentLine++;	
						console.log('event'+eventStr+'<');
					}	
					
					printedLines[read.currentPrintedLine]='';
					if ( (read.currentLine < srcLines.length) &&  ( srcLines[ read.currentLine].length > 0) ) {
						console.log('>>', read.currentLine, srcLines.length, printedLines.length);
						printedLines[read.currentPrintedLine] += srcLines[read.currentLine][read.currentChar];
						this.set('text', '<p class="subtitle-text">'+printedLines.join('<br/>')+'</p>');
					}
				}
				
			};
			
		} else {
			this.isEnded = true;
			console.log('isEnded');
			App.eventMapper.triggerEvent(ragh.MEvt.create('sub_finishedReading', {target:this}))
		}

		
		return dur;
	},
	doSetupDraw: function () {
    	this.ARF_startTime = window.mozAnimationStartTime || Date.now();
		this.ARF_diff = 0;
		this.ARF_last = Date.now();
	    this.ARF = window.requestAnimationFrame( this.doDraw.bind(this) );
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
    },
	doForceFinish: function () {
		console.log(this.isEnded);
		while (!this.isEnded) {
			prevDif = ARF_diff = this.readChar(99999);
		}
	}
});

App.register('controller:subtitle', App.SubtitleController, {singleton: false }); 
