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
	editList:[],
	printedLines:[''],
	isFreezeOnHover: true,
	isHover:false,
	tagStart:'<p><span>',
	tagMid: '</span></p><p><span>',
	tagEnd: '</span></p>',
	tagCursor:'<img src="img/cursor.gif"/>',
	isForceFinish:false,
	isCursor: true,
	isLooping:false,
	tagPositions:[],
	pendingClosingTags:[],
	isCursorObserver: function () {
		if (this.get('isCursor')) {
			this.set('tagCursor', '<img src="img/cursor.gif"/>');
		} else {
				this.set('tagCursor', '');
		}
		var printedLines = this.get('printedLines');
		if (printedLines) {
			
			var taggedLines = this.createTaggedLines(this.printedLines);
			this.set('text', this.tagStart + taggedLines.join(this.tagMid)+this.tagCursor+this.tagEnd);
			
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
			currentPrintedLine = 0,
			editList = [];
		
		
		for (var l = 0; l < srcLines.length; l++ ) { 
			var editIndex;
			if (editIndex = srcLines[l].indexOf('@edits=') != -1) {
				var splitOnEditArr = srcLines[l].split('@edits='),
					lastHalfArr = splitOnEditArr[1].split(' '),
					editVals = lastHalfArr.reverse().pop();
				lastHalfArr.reverse();
				srcLines[l] = splitOnEditArr[0].concat(lastHalfArr);
				editVals = editVals.split(',');
				for (var v in editVals) {
					v = v.split('');
				}
				editList.push( {
					linePosition:l,
					charPosition:splitOnEditArr[0].length,
					currentVal: 0,
					currentChar: 0,
					currentDirection: 1,
					editVals: editVals,
					printed:'',
					editPause:false,
					loops:true
				});
				l--; //check for more
			}
		}
		this.set('editList', editList);
		
 
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
//		console.log('SubtitleController.deactivate()...')
		this.doForceFinish();
//		console.log('...done')
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
			editList = 	me.get('editList'),
			printedLines = me.get('printedLines'),
			currentLine = me.get('currentLine'),
			currentChar = me.get('currentChar'),
			currentPrintedLine = me.get('currentPrintedLine'),
			isNewLine = false,
			delay;
			
			
		var currentEdit;
		for (var e = 0; e < editList.length; e++) {
			if (editList[e].linePosition == currentLine && editList[e].charPosition == currentChar) {
				currentEdit = editList[e];
			}
		}
			
		if (currentLine < srcLines.length) {
			if (currentEdit) {
				if (currentEdit.editPause) {
					delay = me.get('content').get('editDelay');
				} else {
					delay = 1 / me.get('content').get('cpms');
				}
			} else if ( currentChar < srcLines[ currentLine].length) {
				delay = 1 / me.get('content').get('cpms');
			} else {
				delay = me.get('content').get('newLineDelay');
				isNewLine = true;
			}	
			if (dur > delay) {	
				dur -= delay;

				if (currentEdit) {
					with (currentEdit) {
						editPause = false;
						if ( currentDirection == 1 ) {
							printed += editVals[currentVal][currentChar];
							currentChar++;
							if ( (currentChar + 1) > editVals[currentVal].length ) { 
								currentDirection = -1; 
								editPause = true;
							}	
						} else {
							printed = printed.substring(0, printed.length - 1);
							if (printed.length == 0) {
								currentDirection = 1;
								currentChar = 0;
								currentVal++;
								editPause = true;
								if (currentVal >= editVals.length) { 
									currentVal = 0;
									me.set('isLooping', true);
								}
								
							}
						}
					}
					me.set('editList', editList)

					var taggedLines = me.createTaggedLines(me.printedLines);
					me.set('text', me.tagStart+taggedLines.join(me.tagMid)+'<i>'+currentEdit.printed+'</i>'+me.tagCursor+me.tagEnd);
				} else if (!isNewLine) {
					printedLines[currentPrintedLine] += srcLines[currentLine][currentChar];
					var taggedLines = this.createTaggedLines(this.printedLines);
					me.set('text', this.tagStart+taggedLines.join(this.tagMid)+this.tagCursor+this.tagEnd);
					currentChar++;
				} else {
					currentChar = 0;
					currentLine++;
					currentPrintedLine++;
					while (isEvents && srcLines[currentLine] && srcLines[currentLine][0] && srcLines[currentLine][0] == '@') {	
						
						var line = srcLines[currentLine].join('');
						
						if (line.indexOf('@=') == 0) {
							
							currentLine++;
							var code = line.split(' ')[0].split('=')[1];
							if (code.charAt(0) != '/') {
								this.tagPositions.push({
									lineOpened: currentLine, 
									wordOpened: 0, 
									lineClosed: null,
									wordClosed: null, 
									code: code, 
									isClosed: false
								});
								console.log('Opened '+code);
								this.pendingClosingTags.push('/'+code);
							} else {
								var mostRecentOpenTag;
								
								this.tagPositions.reverse();
								for (var t = 0; t < this.tagPositions.length; t++ ) {
									if (!this.tagPositions[t].isClosed) {
										mostRecentOpenTag = this.tagPositions[t];
										t = this.tagPositions.length;
									}
								}
								this.tagPositions.reverse();
								Em.assert('SubtitleController: Closing tag '+code+' supplied without opening tag', mostRecentOpenTag);
								
								console.log(code+'<- closed prev opened ->/'+mostRecentOpenTag.code);
								Em.assert('SubtitleController: Tag mismatched in subtitle text. Got '+code+' expected /'+mostRecentOpenTag.code, code === '/'+mostRecentOpenTag.code);
								
								mostRecentOpenTag.isClosed = true;
								mostRecentOpenTag.lineClosed = currentLine;
								mostRecentOpenTag.wordClosed = 0;
								this.pendingClosingTags.reverse();
								this.pendingClosingTags.pop();
								this.pendingClosingTags.reverse();
							}

						} else if(line.indexOf('@action=') == 0) { 
							var action = line.split(' ')[0].split('=')[1];
							currentLine++;
						} else if(line.indexOf('@actionOnRead=') == 0) { ;
							var action = line.split(' ')[0].split('=')[1];
							me.send(action);
							currentLine++;
						} else {
							
							console.log('Saw @ ', line);
							var eventStr = line.split(' ')[1];
							App.eventMapper.triggerEvent(ragh.MEvt.create(eventStr));
							currentLine++;	 
						}
					} 
					printedLines[currentPrintedLine]='';
					if ( (currentLine < srcLines.length) &&  ( srcLines[ currentLine].length > 0) ) {
						
						
						var taggedLines = me.createTaggedLines(me.printedLines);
						me.set('text', me.tagStart + taggedLines.join(me.tagMid)+me.tagCursor+me.tagEnd);
						currentChar++;
					}
				} 
			};
		} else {
			me.set('isEnded', true);
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
	
	createTaggedLines: function (aprintedLines) {
		var taggedLines = aprintedLines.slice(0),
			last = taggedLines.length -1;
		
		this.tagPositions.reverse();
		for (var t = 0; t < this.tagPositions.length; t++ ) {
			var tag = this.tagPositions[t];
			taggedLines[tag.lineOpened-1] = tag.code+taggedLines[tag.lineOpened-1];
			if (tag.isClosed) {
				taggedLines[tag.lineClosed] = taggedLines[tag.lineClosed]+'/'+tag.code;
			}
		}
		taggedLines[last] = taggedLines[last] + '';//this.pendingClosingTags.join('');
		this.tagPositions.reverse();
		
		return taggedLines;
	},

	
	doRemoveClicked: function () {
		//console.log('doRemoveClicked');
		window.cancelAnimationFrame(this.get('raf'));
		this.set('isEnded', true);
		this.set('isRemoved', true);
		this.set('text', ''); //todo low technically should not need to render this, but if you look at template, I can't conditionally stop rendering {{text}} without incurring a js error
		//this.send('doRemoveSubtitle');
	},
	doSetupDraw: function () {
		var rafFunction = function(me) {
			var animloop = function (time) {
				var last = me.get('lastRequestAnimationFrame'),
					dur = me.get('durSinceReadChar');
					
					//console.log('>>', dur , last, dur+last)
					dur += (last ? time - last : 0);		
				me.set('lastRequestAnimationFrame', time);
				if (!me.get('isHover')) { dur = me.reDraw(dur, me); }// stage.update() does not work... todo high 
				me.set('durSinceReadChar', dur);
				if (!me.get('isEnded') || me.get('isLooping')) {
					me.set('raf', window.requestAnimationFrame(animloop));
				}
			};
			return animloop
		}(this);
		
		this.set('raf', window.requestAnimationFrame(rafFunction));
	},
	
	getActionEvent: function () {
		//console.log('getActionEvent', this.get('actionEvent'))
		this.send(this.get('actionEvent'))
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
		while (!this.get('isEnded')  && !this.get('isLooping') ) {
			this.readChar(99999, this, false);
		}	
	}
});

App.register('controller:subtitle', App.SubtitleController, {singleton: false }); 
