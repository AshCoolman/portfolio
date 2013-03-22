PortfolioApp.SubtitleController = PortfolioApp.SmartController.extend({
	controllerName:'Script Subtitle Controller',
	text: '',
	read:{},
	lines:[],
	tOut:undefined,
	init: function () {
		this.addAutoMappedEvent('d1Start', this, this.doD1Start);
		return this._super();
	},
	setup: function () {
		this.read.currentLine = 0;
		this.read.currentWord = 0;
		this.set('text', 'asdjkfdjkadjskfjhkladhjklsflhj');
	},
	doD1Start: function (type, target) {
		lines = this.get('content').script.split('.');
		for (var l = 0; l < lines.length; l++ ) {
			lines[l] = lines[l].split('');
		}
		this.setup();
		//this.readWord();
	},
	
	readWord: function() {
		var read = this.read;
		if (read.currentWord==0) {
			this.set('text', '');
		}
		var delay = 1000 * 60 / (6 * this.get('content').get('wpm'));
		if (read.currentLine < lines.length) {
	
			if ( read.currentWord < lines[ read.currentLine].length) {
				this.set('text', this.get('text') + '' + lines[read.currentLine][read.currentWord]);
				read.currentWord++;
			} else {
				delay = delay * 10
				read.currentWord = 0;
				read.currentLine++;
			}	
			(function (scope) {
				scope.tOut = setTimeout( function () {scope.readWord();}, delay);
			}(this));
			
		}
	},
	view_willDestroyElement: function () {
		clearTimeout(this.tOut);
		this.setup();
	}
})