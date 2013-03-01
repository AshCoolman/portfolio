PortfolioApp.AudioVIEW = Ember.View.extend({
	tagName:'audio',
	autoplay:false,
	preload:false,
	src:undefined,
	init: function() {
	    this.addEventListener('canplaythrough',function(){
	        this.removeEventListener('canplaythrough');
	    	this.audioLoaded = true;
	    },false);
	},
	srcObserved: function () {
		this.play()
	    setTimeout(function(){ mediaEl.pause();  },0);
	}.observes('src')
});
