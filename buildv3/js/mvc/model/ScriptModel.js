App.ScriptModel = Em.Object.extend({
	script: "My name is Ashley Coleman. I'm a digital engineer, I'm a story teller. And the thought of you experiencing my website quickens my pulse. Test another sentence and make it pretty long so it really pushes things to the max. Test another sentence and make it pretty long so it really pushes things to the max. Test another sentence and make it pretty long so it really pushes things to the max. Test another sentence and make it pretty long so it really pushes things to the max. Test another sentence and make it pretty long so it really pushes things to the max. Test another sentence and make it pretty long so it really pushes things to the max. Test another sentence and make it pretty long so it really pushes things to the max. Test another sentence and make it pretty long so it really pushes things to the max. Test another sentence and make it pretty long so it really pushes things to the max. Test another sentence and make it pretty long so it really pushes things to the max. Test another sentence and make it pretty long so it really pushes things to the max.",
	wpm: 180,
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

