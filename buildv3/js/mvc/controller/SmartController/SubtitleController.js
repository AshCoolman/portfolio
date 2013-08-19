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
	cursorChar: '&#0178;', //light block 176, 177, 178, 219 dark block 
	currentLine:0,
	currentChar:0,
	currentPrintedLine:0,
	srcLines:[],
	printedLines:[''],
	tagStart:'<p><span>',
	tagMid: '</span></p><p><span>',
	tagEnd: '</span></p>',
	tagCursor:'<img src="img/cursor.gif"/>',
	isForceFinish:false,
	isCursor: true,
	isCursorObserver: function () {
		if (this.get('isCursor')) {
			this.set('tagCursor', '<img src="img/cursor.gif"/>');
		} else {
				this.set('tagCursor', '');
		}
		var printedLines = this.get('printedLines');
		if (printedLines) {
			this.set('text', this.tagStart + printedLines.join(this.tagMid)+this.tagCursor+this.tagEnd);
		}
	}.observes('isCursor'),
	lines:[],
	isEnded: false,
	isRemoved:false,
	hasRemoveButton:false,
	thescript:'',
	isRemoveButton:false,
	raf:null,
	lastRequestAnimationFrame:0,
	durSinceReadChar:0,
	setup: function (ascript) {

		if (this.get('thescript')) 
			ascript = this.get('thescript');
		
		ascript = ascript.replace(/(\r\n|\n|\r)/gm,'\n');
		ascript = ascript.split("\r\n").join('\n')
		ascript = window.unescape(ascript);
		
		var printedLines = [''],
			srcLines = ascript.split('\n'),
			currentLine = 0,
			currentChar = 0,
			currentPrintedLine = 0;
			
		for (var l = 0; l < srcLines.length; l++ ) { 
			srcLines[l] = srcLines[l].split('');
		}
		
		this.set('text', '');
		this.set('currentLine', currentLine);
		this.set('currentChar', currentChar);
		this.set('currentPrintedLine', currentPrintedLine);
		this.set('printedLines', printedLines);
		this.set('srcLines', srcLines);
		
	},
	deactivate: function () {
		console.log('SubtitleController.deactivate()...')
		this.doForceFinish();
		console.log('...done')
		this.set('text', '');
		this.set('currentLine', 0);
		this.set('currentChar', 0);
		this.set('currentPrintedLine', 0);
		this.set('printedLines', ['']);
		this.set('srcLines', []);
		
	},
	view_didInsertElement: function (aview) {
		this._super(aview);
		this.send('SubtitleController_didInsertElement', this);
	},
	readChar: function (dur, me, isEvents) {
		//console.log('readChar?', typeof(isEvents),  (typeof(isEvents) == 'undefined'));
		var me = me || this,
			isEvents = (typeof(isEvents) != 'undefined') ? isEvents : true,
			srcLines = me.get('srcLines'),
			printedLines = me.get('printedLines'),
			currentLine = me.get('currentLine'),
			currentChar = me.get('currentChar'),
			currentPrintedLine = me.get('currentPrintedLine'),
			isNewLine = false,
			delay;
			
			
		if (currentLine < srcLines.length) {
			if ( currentChar < srcLines[ currentLine].length) {
				delay = 1 / me.get('content').get('cpms');
				//console.log('dur='+dur, 'delay='+delay, dur > delay);
			} else {
				delay = 1200;
				isNewLine = true;
				//console.log('NEWLINE')
			}	
			if (dur > delay) {	
				dur -= delay;
				if (!isNewLine) {
					printedLines[currentPrintedLine] += srcLines[currentLine][currentChar];
					me.set('text', this.tagStart+printedLines.join(this.tagMid)+this.tagCursor+this.tagEnd);
					currentChar++;
				} else {
					currentChar = 0;
					currentLine++;
					currentPrintedLine++;
					if (isEvents && srcLines[currentLine] && srcLines[currentLine][0] && srcLines[currentLine][0] == '@') {	
						var line = srcLines[currentLine].join('');
						if(line.indexOf('@action=') == 0) { 
							//console.log('SawAction');
							var action = line.split(' ')[0].split('=')[1];
							currentLine++;
						} else if(line.indexOf('@actionOnRead=') == 0) { ;
							var action = line.split(' ')[0].split('=')[1];
							me.send(action);
							currentLine++;
						} else {
							
							//console.log('Saw @ ', line);
							var eventStr = line.split(' ')[1];
							App.eventMapper.triggerEvent(ragh.MEvt.create(eventStr));
							currentLine++;	 
						}

					} 
					printedLines[currentPrintedLine]='';
					if ( (currentLine < srcLines.length) &&  ( srcLines[ currentLine].length > 0) ) {
						printedLines[currentPrintedLine] += srcLines[currentLine][currentChar];
						me.set('text', me.tagStart + printedLines.join(me.tagMid)+me.tagCursor+me.tagEnd);
						currentChar++;
					}
				} 
				
			};
		} else {
			me.set('isEnded', true);
			//window.alert('CANCELLED')
			window.cancelAnimationFrame(me.get('raf'));
			if (me.get('hasRemoveButton')) {
				me.set('isRemoveButton', true);
			}
			App.eventMapper.triggerEvent(ragh.MEvt.create('sub_finishedReading', {target:this}))
		}
		
		me.set('srcLines', srcLines);
		me.set('printedLines', printedLines);
		me.set('currentLine', currentLine);
		me.set('currentChar', currentChar);
		me.set('currentPrintedLine', currentPrintedLine);
		return dur;
	},
	doRemoveClicked: function () {
		console.log('doRemoveClicked');
		window.cancelAnimationFrame(this.get('raf'));
		this.set('isEnded', true);
		this.set('isRemoved', true);
		this.set('text', ''); //todo low technically should not need to render this, but if you look at template, I can't conditionally stop rendering {{text}} without incurring a js error
		this.send('doRemoveSubtitle');
	},
	doSetupDraw: function () {
		var rafFunction = function(me) {
			var animloop = function (time) {
				var last = me.get('lastRequestAnimationFrame'),
					dur = me.get('durSinceReadChar');
					
					//console.log('>>', dur , last, dur+last)
					dur += (last ? time - last : 0);		
				me.set('lastRequestAnimationFrame', time);
				dur = me.reDraw(dur, me); // stage.update() does not work... todo high
				me.set('durSinceReadChar', dur);
				if (!me.get('isEnded')) {
					me.set('raf', window.requestAnimationFrame(animloop));
				}
			};
			return animloop
		}(this);
		
		this.set('raf', window.requestAnimationFrame(rafFunction));
	},
	
	reDraw: function (adur, scope) {
		var prevDur = adur;
		while (prevDur != (adur = scope.readChar(adur, scope))) {
			//console.log('doDraw.readChar', adur, prevDur);
			prevDur = adur;
		}	
		return adur;
    },
	doForceFinish: function () {
		
		window.cancelAnimationFrame(this.get('raf'));
		while (!this.get('isEnded')) {
			this.readChar(99999, this, false);
		}	
	}
});

App.register('controller:subtitle', App.SubtitleController, {singleton: false }); 
