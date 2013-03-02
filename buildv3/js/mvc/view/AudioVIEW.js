PortfolioApp.AudioView = Ember.View.extend({
	tagName:'audio',
	className: 'audio-view',
  	attributeBindings: ['src'],
	autoplay:false,
	preload:false,
	src:undefined,
	isSrcObservedPending:false,
	didInsertElement: function() {
		console.log('AudioView.didInsertElement element.');
		var el = this.get('element');
	    el.addEventListener('canplaythrough',function(){
	        el.removeEventListener('canplaythrough');
	    	el.audioLoaded = true;
	    },false);
		if (isSrcObservedPending) this.srcObserved();
	},
	srcObserved: function () {
		
		isSrcObservedPending = false;
		
		var el = this.get('element');
		if (el) {
			console.log('AudioView.srcObserved element.src');
			el.play()
		   	setTimeout(function(){ el.pause();  },0);
		 } else {
			isSrcObservedPending = true;
		}
		
	}.observes('src')
});
