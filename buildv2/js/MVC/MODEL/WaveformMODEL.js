WaveformMODEL = Backbone.Model.extend({
	defaults: {
		volumeTimeline:0,
		mediaFile:undefined,
		mediaEl:undefined
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
		console.log(document.getElementById('body'))
		     		    document.getElementById('body').appendChild(mediaEl);
		    // 		    mediaEl.src = model.get("mediaFile");
		    // 		    mediaEl.play();
		    // 		    //setTimeout(function(){ mediaEl.pause();  },1);
		    //            console.info("WaveformMODEL > on() change:mediaElFile =" + mediaElFile );
		    // 			model.set({'mediaEl':mediaEl});
        });
	}
});