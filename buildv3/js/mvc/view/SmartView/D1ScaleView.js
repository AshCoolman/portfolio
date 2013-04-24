App.D1ScaleView = App.SmartView.extend({
	tagName: 'canvas',
	templateName: 'd1-scale',
	w: 2400,
	h: 100,
	u: 5,		
	didInsertElement: function (aview) {
		this._super(aview);	
		var w = this.w, 
			h = this.h,
			u = this.u;
		
		this.$el.attr({width: w, height: h})
		var ctx = this.el.getContext('2d');

	    ctx.beginPath();
	    ctx.moveTo(0,h/2);
	    ctx.lineTo(w,h/2);
	    ctx.closePath();
	    ctx.stroke();

		var total = 0,
			t =0;
		while (t * u < w) {
			t++;
		    ctx.beginPath();
		    ctx.moveTo( t * u, h * 0.4 );
		    ctx.lineTo( t * u, h * 0.6 );
		    ctx.closePath();
		    ctx.stroke();
		}
		this.resize();

	},
	resize: function () {
			this.$el.css({
		    	position:'absolute',
			    left: '50%',
				top: '50%',
				margin: Math.round(-this.h/2)+'px 0 0 '+Math.round(-this.w/2)+'px',
			    height:this.h+'px',
			    width:this.w+'px',
				overflow:'hidden'
			});
	}
})