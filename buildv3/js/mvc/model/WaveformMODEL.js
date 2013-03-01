PortfolioApp.WaveformMODEL = Ember.Object.extend({
	mediaFile:undefined,
	mediaEl:undefined,
	mediaFileObserved: function () {
		if (!mediaEl) mediaEl = PortfolioApp.AudioVIEW.create();
		mediaEl.set('src', this.mediaFile);
	}.observes('mediaFile'),
	init: function () {
		
	}
});

