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
	atLine:0,
	atChar:0,
	atPrintedLine:0,
	srcLines:[],
	editList:[],
	printedLines:[''],
	isFreezeOnHover: true,
	counter:0,
	isHover:false,
	hoverEvent:undefined,
	isEdit: false,
	tagStart:'<p><span>',
	tagMid: '</span></p><p><span>',
	tagEnd: '</span></p>',
	tagCursor:'<i class="icon-italic></i>',//'"''<img src="img/cursor.gif"/>',
	isForceFinish:false,
	isCursor: true,
	isLooping:false,
	isInstant: false,
	tagPositions:[],
	pendingClosingTags:[],
	actionTimeouts:[],
	pendingWait: 0,
	lastPrinted:null,
	lastEdit:null,
	isHoverUnfinished: false,
	isCursorObserver: function () {
		if (this.get('isCursor')) {
			this.set('tagCursor', '<img src="img/cursor.gif"/>');
		} else {
				this.set('tagCursor', '');
		}
		var printedLines = this.get('printedLines');
		if (printedLines) {
			
			this.setText( this.get('printedLines'), null);
			this.printText();
			
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
		//ascript=ascript.replace('\\"','"')
		
		if (ascript.indexOf('@edits=') != -1)
			this.set('isEdit', true);
		
		var printedLines = [''],
			srcLines = ascript.split('\n'),
			atLine = 0,
			atChar = 0,
			atPrintedLine = 0,
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
					atChar: 0,
					currentDirection: 1,
					editVals: editVals,
					printed:'',
					editPause:false,
					loops:true
				});
				l--; //check for more
			}
		}
		this.set('tagPositions', []);
		this.set('editList', editList);
		
 
		for (var l = 0; l < srcLines.length; l++ ) { 
			srcLines[l] = srcLines[l].split('');
			if (srcLines[l].length == 0) {
				srcLines[l][0] = '&nbsp;&nbsp;';
			}	
		} 
		
		this.setText(['']);
		this.set('atLine', atLine);
		this.set('atChar', atChar);
		this.set('atPrintedLine', atPrintedLine);
		this.set('printedLines', printedLines);
		this.set('srcLines', srcLines);
		

		
	},
	view_didInsertElement: function (aview) {
		this._super(aview);
		this.send('SubtitleController_didInsertElement', this);
		this.set('content', App.scriptModel); 
        this.setup();

	},
	view_willDestroyElement: function () {
		//console.log('SubtitleController.deactivate()...')
		var actionTOObjs = this.get('actionTimeouts');
		for (var to in actionTOObjs) {
			window.clearTimeout(to.id);
		}
		this.set('actionTimeouts', []);

		this.set('isLooping', false);
		this.set('isEnded', true);
		this.doForceFinish();
		this.setText(['']);
		this.set('atLine', 0);
		this.set('atChar', 0);
		this.set('atPrintedLine', 0);
		this.set('printedLines', ['']);
		this.set('srcLines', []);
	},
	
	readChar: function (dur, me, isEvents) {
		
		//console.log('readChar?', typeof(isEvents),  (typeof(isEvents) == 'undefined'));
		var me = me || this,
			isEvents = (typeof(isEvents) != 'undefined') ? isEvents : true,
			srcLines = me.get('srcLines'),
			editList = 	me.get('editList'),
			printedLines = me.get('printedLines'),
			atLine = me.get('atLine'),
			atChar = me.get('atChar'),
			atPrintedLine = me.get('atPrintedLine'),
			delayChar = 1 / me.get('content').get('cpms'),
			delayLine = me.get('content').get('newLineDelay'),
			delayEditLine = me.get('content').get('editDelay'),
			isNewLine = false,
			delay = delayChar,
			currentEdit,
			isLastCharBeforeDisplay = false;
		
		//Test if Pending wait (via @wait) has executed
		if (dur > this.get('pendingWait')) {
			dur -= this.get('pendingWait');
			this.set('pendingWait', 0);
			for (var e = 0; e < editList.length; e++) {
				if (editList[e].linePosition == atLine && editList[e].charPosition == atChar) {
					currentEdit = editList[e];
				}
			}

			if (atLine < srcLines.length ) {


				if (currentEdit) {
					if (currentEdit.editPause) {
						delay = delayEditLine;
					}
				} else if ( atChar >= srcLines[ atLine].length) {	
					delay = delayLine;

				}
			
				if (dur > delay) {
					dur -= delay;
				
					if (atChar == 0 && atLine == 0) {	
						isNewLine = true;
					} else if ( atChar >= srcLines[ atLine].length && !currentEdit) {
	//					console.log('Char means new line', atChar, atLine, srcLines[atLine], 'edit:', currentEdit)
						isNewLine = true;
						atChar = 0;
						atLine++;
						atPrintedLine++;
					} 
				
					if (currentEdit) { 
						with (currentEdit) {
							editPause = false;
							if ( currentDirection == 1 ) {
								printed += editVals[currentVal][atChar];
								atChar++;
								if ( (atChar + 1) > editVals[currentVal].length ) { 
									currentDirection = -1; 
									editPause = true;
								}	
							} else {
								printed = printed.substring(0, printed.length - 1);
								if (printed.length == 0) {
									currentDirection = 1;
									atChar = 0;
									currentVal++;
									editPause = true;
									if (currentVal >= editVals.length) { 
										currentVal = 0;
									}

								}
							}
						}
					
						me.set('editList', editList);
						me.setText(this.get('printedLines'), currentEdit.printed);
					
					} else if (!isNewLine) {
						printedLines[atPrintedLine] += srcLines[atLine][atChar];
						me.setText(printedLines, null, 'char');
						atChar++;
					
					} else if (isNewLine) {
	//					console.log('NEWLINE', atLine, atChar, srcLines);
						while (isEvents && srcLines[atLine] && srcLines[atLine][0] && srcLines[atLine][0] == '@') {
							var line = srcLines[atLine].join('');
							if (line.indexOf('@=') == 0) {
								this.doTagRead(line, atPrintedLine); 
							} else if (line.indexOf('@wait=') == 0) { 
								var pendingWait = parseInt(line.split('=')[1], 10);
								Em.assert('@wait was given non-number value',  !isNaN(parseFloat(pendingWait)) && isFinite(pendingWait));
								this.set('pendingWait', pendingWait);
							} else if(line.indexOf('@actionOnRead=') == 0) {
								var words =  line.split(' ');
								var action = words[0].split('=')[1];
								var delay = (words[1] && !isNaN(parseFloat(words[1])) && isFinite(words[1])) ? parseFloat(words[1]) : 0;
								var actionFunc = function (my, myAction, pos) {
									return function () {
										var actionTOObjs = my.get('actionTimeouts');
										window.clearTimeout(actionTOObjs[pos].to);
										actionTOObjs[pos].to = null;
										my.send(myAction)
									
									}
								}(this, action, this.get('actionTimeouts').length);
								var to = setTimeout( actionFunc, delay);

								this.get('actionTimeouts').push( {
									func: actionFunc,
									to: to
								});
							} else {
								App.eventMapper.trigger(line.split(' ')[1]); 
							}
							atLine++;
	//						console.log('skipped to '+atLine+' of '+srcLines.length);
						}
					
					
						if ( atLine < srcLines.length && srcLines[atLine].length > 0 ) {
							printedLines[atPrintedLine]='';
							printedLines[atPrintedLine] += srcLines[atLine][atChar];
							me.setText(printedLines, null, 'newline');
							atChar++;
						}
					
					
					} 
				} else {
					//this.printText();
				};	
			} else {
	//			console.log('Ended')
				me.set('isEnded', true);
				window.cancelAnimationFrame(me.get('raf'));
				if (me.get('hasRemoveButton')) {
					me.set('isRemoveButton', true);
				}
				App.eventMapper.trigger('sub_finishedReading', {target:this});
			}
		}
		me.set('srcLines', srcLines);
		me.set('printedLines', printedLines);
		me.set('atLine', atLine);
		me.set('atChar', atChar);
		me.set('atPrintedLine', atPrintedLine);
		return dur;
	},
	
	doEdit: function (acurrentEdit, aeditVals) {
	
	},
	
	getTagCodeFromLine: function (line) {
		var code = unescape(line).split('@=');	
		code.splice(0, 1);
		return code[0]
	},
	
	getClosedVersionOfTag: function (code) {
		//console.log('getClosedVersionOfTag code'+code)
		var closedVersion = (code.split(' ')[0]+'>').split('');
		closedVersion=closedVersion.replace('\t','');
		
		closedVersion.splice(1, 0, '/');
		return closedVersion.join('').replace('>>', '>');
	},
			
	getMostRecentOpenTag: function (tagPositions) {
		tagPositions.reverse();
		for (var t = 0; t < tagPositions.length; t++ ) {
			if (!tagPositions[t].isClosed) {
				tagPositions.reverse();
				return tagPositions.length - t -1;
			}
		}
		tagPositions.reverse();
		return -1;
	},
	
	doTagRead: function (line, atPrintedLine) {
//		console.log('doTagRead')
		var pendingClosingTags = this.get('pendingClosingTags'),
			tagPositions = this.get('tagPositions'),
			code =  this.getTagCodeFromLine(line);
		//console.log('code from line', code)
		if (code.charAt(1) != '/') {
			var tpEnd = tagPositions.length;
			tagPositions.push({
				lineOpened: atPrintedLine, 
				code: code, 
				expectedClosed: this.getClosedVersionOfTag(code),
				isClosed: false
			});
			pendingClosingTags.push( tagPositions[tpEnd].expectedClosed );
			//console.log('Opened found at ' + atPrintedLine + ':' + code +  ' INFERRED AND PUSHED: ('+tagPositions[tpEnd].expectedClosed+')');
		} else {
//			console.log('found closed:'+code)
			var mostRecent =  this.getMostRecentOpenTag(tagPositions);
			tagPositions[ mostRecent ].isClosed = true;
			tagPositions[ mostRecent ].lineClosed = atPrintedLine-1;
			pendingClosingTags.pop();
			
			//Em.assert( 'SubtitleController: Closing tag ' + code + ' supplied without opening tag', mostRecentOpenTag );	
			//Em.assert('SubtitleController: Tag mismatched in subtitle text. Got '+code+' expected closed version of '+mostRecentOpenTag.code+':'+mostRecentOpenTag.expectedClosed, code === mostRecentOpenTag.expectedClosed);
//			console.log('closing found ' + atPrintedLine + ':' + code +', prev opened '+tagPositions[ mostRecent ].code+', expected '+tagPositions[ mostRecent ].expectedClosed);
		}
		this.set('pendingClosingTags', pendingClosingTags);
		this.set('tagPositions', tagPositions);	
	},
	
	createTaggedLines: function (aprintedLines, currentEditPrinted, context) {
		
		var tagPositions = this.get('tagPositions'),
			currentEditPrinted = currentEditPrinted || '',
			pendingClosingTags = this.get('pendingClosingTags'),
			taggedLines = aprintedLines.slice(0),
			last = taggedLines.length - 1;
		
		for (var l = 0; l < taggedLines.length; l++) {
			if (l == taggedLines.length-1) {
				taggedLines[l] = this.tagStart + taggedLines[l] +' '+'<i>'+currentEditPrinted+'</i>'+ this.tagCursor + this.tagEnd;
			} else {
				taggedLines[l] = this.tagStart + taggedLines[l] +' '+ this.tagEnd;
			}
		}
		
	
		
		tagPositions.reverse();
		for ( var t = 0; t < tagPositions.length; t++ ) {
			var tag = tagPositions[ t ],
				openedPos = Math.min(tag.lineOpened, last);
			//console.log('looking at tag '+tag.lineOpened+' to '+tag.lineClosed)
			if (tag.lineOpened <= last) {
				taggedLines[ openedPos ] = tag.code + taggedLines[ openedPos ]
			} else {
				taggedLines[ openedPos ] = taggedLines[ openedPos ] + tag.code;
			}
			
			if ( tag.isClosed ) {
				var closedPos = Math.min(tag.lineClosed, last);
				//console.log('isClosed ' + closedPos + ' of ' + taggedLines.length + ' - closed tag added\n', taggedLines[closedPos]+' + '+tag.expectedClosed+'\n' );
				taggedLines[closedPos] = taggedLines[closedPos] + tag.expectedClosed;
			}
		}
		tagPositions.reverse();
		
		taggedLines[last] = taggedLines[last] + pendingClosingTags.join('');
		//if (pendingClosingTags.length) console.log('taggedLines['+last+'] added '+pendingClosingTags.length+'pending', taggedLines[last]);
		this.set('tagPositions', tagPositions);
		this.set('pendingClosingTags', pendingClosingTags);
		//console.log(taggedLines.join('\n'));
		return taggedLines.join('');
	},

	
	doRemoveClicked: function () {
		//console.log('this.get(view)', this.get('view'));
		window.cancelAnimationFrame(this.get('raf'));
		this.set('isEnded', true);
		this.set('isRemoved', true);
		this.get('view').doRemove();
		this.setText(''); //todo low technically should not need to render this, but if you look at template, I can't conditionally stop rendering {{text}} without incurring a js error
		//this.send('doRemoveSubtitle');
	},
	
	setText: function (aprinted, aedit) {
		this.set('lastPrinted', aprinted);
		this.set('lastEdit', aedit);
		
	},
	
	printText: function () {			
		if ($('.text', 	$(this.get('view').get('element')) )[0])
			$('.text', 	$(this.get('view').get('element')) )[0].innerHTML = this.createTaggedLines(this.get('lastPrinted'), this.get('lastEdit'));
	},
	
	startReading: function () {
//		console.log('start reading', this.get('orderRead'))
		if (this.get('isInstant')) {
			this.doForceFinish();
		} else {
			var rafFunction = function(me) {
				var animloop = function (time) {
					var last = me.get('lastRequestAnimationFrame'),
						dur = me.get('durSinceReadChar');

						//console.log('>>', dur , last, dur+last)
						dur += (last ? time - last : 0);		
					me.set('lastRequestAnimationFrame', time);
					if (!me.get('isHover') || !me.get('isFreezeOnHover')) { 
						dur = me.reDraw(dur, me); // stage.update() does not work... todo high 
					} else {
						dur = 0;
					}
					me.set('durSinceReadChar', dur);
					if (!me.get('isEnded') || me.get('isLooping')) {
						
						me.set('raf', window.requestAnimationFrame(animloop));
					}
				};
				return animloop
			}(this);

			this.set('raf', window.requestAnimationFrame(rafFunction));
		}

	},
	
	getLinkEvent: function () {
		//console.log('getLinkEvent', this.get('linkEvent'))
		this.send(this.get('linkEvent'))
	},
	
	doClicked: function () {
		if (this.get('linkEvent')) {
			this.send(this.get('linkEvent'));
		}
		this.doForceFinish();
	},
	
	doHover: function (isHoverOn) {
		if (this.get('hoverEvent')) {
			this.send(this.get('hoverEvent'), isHoverOn);
		}
	},
	
	reDraw: function (adur, scope) {
		var prevDur = adur;
		while (prevDur != (adur = scope.readChar(adur, scope))) {
			//console.log('doDraw.readChar', adur, prevDur);
			prevDur = adur;
		}
		this.printText();
		return adur;
    },
	doForceFinish: function () {
		///console.log('doForceFinish');

		this.set('isHoverUnfinished', false);
		this.set('editList', []);
		window.cancelAnimationFrame(this.get('raf'));
		while (!this.get('isEnded') ) {
			this.readChar(99999, this, true);
		}
			this.printText();
	}
});

App.register('controller:subtitle', App.SubtitleController, {singleton: false }); 
