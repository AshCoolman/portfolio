App.ScriptModel = Em.Object.extend({
	init: function () {	
		var initFunc = 	function(me) {
			return function(type, data) {
				me.scriptIndex = App.dictionary.copy['INDEX'];
				me.scriptD1 = App.dictionary.copy['D1'];
				me.scriptD2 = App.dictionary.copy['D2'];
				me.scriptD3 = App.dictionary.copy['D3'];
			}
		}(this);
		
		if (App.dictionary.isLoaded) {
			initFunc();
		} else {
			App.eventMapper.addEventListener('isDictionaryReady', this, initFunc);
		}
		return this._super();
	},
	scriptIndex	: '',
	scriptD1: '',
	wpm: false&&999||280,
	editDelay: false&&120 || 600,
	newLineDelay: false&&80||800,
	progress: 0.0,
	subtitleText: function() {
		console.log('computer prop subtitleText')
		var scriptwords = this.get('script').split(' ');
		return scriptwords[Math.round(scriptwords.length * this.get('progress'))];
	}.property('script'),
	cpms: function() {
		var cpm = this.get('wpm') * 7; //chars per minute: 600
		var cps = cpm / 60; // chars per second: 10 per second
		var cpms = cps / 1000; // chars per ms: 
		return cpms;
	}.property('wpm')	
})

