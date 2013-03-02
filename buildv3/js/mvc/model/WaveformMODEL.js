PortfolioApp.WaveformMODEL = Ember.Object.extend({
	mediaFile:null,
	audioView:null,
	mediaFileObserved: function () {
		console.log('PortfolioApp.WaveformMODEL.mediaFileObserved()', typeof(this.audioView), this.audioView)
		
		
		if (!this.audioView) {
			console.log('AudioView created')
			var audioController = PortfolioApp.AudioController.create({content:[]});
			this.audioView = PortfolioApp.AudioView.create({
				name:'audio-template',
				controller: audioController,
				src: this.mediaFile
			}).appendTo('.portfolio-app-container');
		}
		
		//console.log('audioView:', this.audioView)
		this.audioView.set('src', this.mediaFile);
		
	
	}.observes('mediaFile'),
	init: function () {
		
	}
});

