PortfolioApp.ScriptModel = Em.Object.extend({
	script: "My name is Ashley Coleman. I'm a digital engineer, I'm a story teller. And the thought of you experiencing my website quickens my pulse",
	wpm: 40,
	progress: 0.0,
	subtitleText: function() {
		console.log('computer prop subtitleText')
		var scriptwords = this.get('script').split(' ');
		return scriptwords[Math.round(scriptwords.length * this.get('progress'))];
	}.property('script', 'wpm')
})