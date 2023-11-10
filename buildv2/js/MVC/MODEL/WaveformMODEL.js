WaveformMODEL = Backbone.Model.extend({
	defaults: {
		volumeTimeline:0,
		mediaFile:undefined,
		mediaEl:undefined,
		el:undefined
	},
	initialize: function() {
		console.info('WaveformMODEL > initialize()');
		//Ready the mediaEl by playing then instantly pausing (workaround for mobile safari) http://goo.gl/ddBRo
        this.on("change:mediaFile", function(model){
		    var mediaEl = document.createElement('audio');
		   	mediaEl.id = 'waveformMODEL'
			mediaEl.autoplay =  mediaEl.preload = false; 
		     		    mediaEl.addEventListener('canplaythrough',function(){
		     		        mediaEl.removeEventListener('canplaythrough');
		    		        audioLoaded = true;
		     		    },false);
			this.get('el').appendChild(mediaEl);
		    mediaEl.src = model.get("mediaFile");
   		    mediaEl.play();
   		    setTimeout(function(){ mediaEl.pause();  },0);
            console.info("WaveformMODEL > on() change:mediaElFile =" + this.get('mediaFile') );
   			model.set({'mediaEl':mediaEl});
        });
	},
	play: function() {
	    this.get('mediaEl').play();
	}
});