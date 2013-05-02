App.World1dView = App.ActiveEslStageView.extend({
	tagName:'div',
	width: 800,
	height: 50,
	className: 'World1dView',
	templateName:'world-1d',
	init: function() {
	
			console.log('World1dView.init(): ' + this.eslEntities.join(', '));	
			return this._super();
	},
	resize: function() { 
		this.$canvas.css({
	    	position:'absolute',
			top: '50%',
			left:0,
			margin: Math.round(-this.height/2)+'px 0 0 0',
		    height:this.height+'px',
		    width:'100%',
			overflow:'hidden',
		}).attr({
		    height:this.height+'px',
		    width:$(window).width()+'px'
		});
	},
	redraw: function(dur) {
		console.log('rd 1d');
		this._super();
	}
});