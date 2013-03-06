PortfolioApp.WaveformMODEL = Ember.Object.extend({
	mediaFile:null,
	audioView:null,
	mediaFileObserved: function () {
		if (!this.audioView) {
			var audioController = PortfolioApp.AudioController.create({content:[]});
			this.audioView = PortfolioApp.AudioView.create({
				name:'audio-template',
				controller: audioController,
				src: this.mediaFile
			}).appendTo('.portfolio-app-container');
		}
		this.audioView.set('src', this.mediaFile);
	}.observes('mediaFile'),
	init: function () {
		
	}
});

