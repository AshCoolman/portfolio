PortfolioApp.World2dView = PortfolioApp.SmartView.extend({
	tagName:'div',
	className: 'World2dView',
	templateName:'world-2d',
	width: 800,
	height: 600,
	hid: {},
	vis: {},
	scale: 1,
	init: function () {
		return this._super();
	},
	didInsertElement: function() {
		var el  = this.get('element');
		$(el).append('<canvas class="hidden-world-2d">');
		this.hid['$canvas'] = $('.hidden-world-2d', $(el));
		this.hid['context'] = this.hid.$canvas[0].getContext("2d");
		this.hid.$canvas.css({display:'none'});
		
		$(el).append('<canvas class="visible-world-2d">');
		this.vis['$canvas'] = $('.visible-world-2d', $(el));
		this.vis['context'] = this.vis.$canvas[0].getContext("2d");
		
		
	    $(window).resize(
			function(scope) {
				return function() {scope.redraw()};
			}(this)
		);
		this.redraw();
		
	},
	redraw: function() {

		var winWidth = $(window).width(),
			color;
		if (winWidth > 800) {
			this.width = 800;
			this.height = 600;
			color = "rgba(0, 0, 255, .5)";
		} else {
			this.width = 400;
			this.height = 300;
			color = "rgba(255, 0, 0, .5)";
		
		}
		this.vis.$canvas.attr({width: this.width, height: this.height});
		this.vis.context.fillStyle = color;
		this.vis.context.fillRect(0, 0, this.width, this.height);
		
	}
	

});
