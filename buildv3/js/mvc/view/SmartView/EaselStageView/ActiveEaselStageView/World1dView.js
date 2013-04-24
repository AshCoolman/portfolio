App.World1dView = App.ActiveEaselStageView.extend({
	tagName:'div',
	width: 800,
	height: 300,
	className: 'World1dView',
	templateName:'world-1d',
	resize: function() {
		this.$canvas.css({
	    	position:'absolute',
		    left: '50%',
			top: '50%',
			margin: Math.round(-this.height/2)+'px 0 0 '+Math.round(-this.width/2)+'px',
		    height:this.height+'px',
		    width:this.width+'px',
			overflow:'hidden'
		});
	},
	redraw: function(dur) {

	},
	addEaselEnt: function (label, childView) {
		console.log('World1dView.addEaselEnt()', label, childView);
		this._super(label, childView)

	}
});