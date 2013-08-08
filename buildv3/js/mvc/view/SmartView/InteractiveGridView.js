App.InteractiveGridView = App.SmartView.extend({
	name:'InteractiveGridView',
	templateName: 'interactive-grid',
	tagName:'div',
	grid: [[]],
	plots:[
		{x:32, text: 'years alive'},
		{x:55, text: 'words per minute'},
		{x:67, text: 'KG'},
		{x:167, text: ' cm'}
	],
	labelText:'test',
	didInsertElement: function () {
		this._super();
		var raphaeljs,
			w = 1200,
			h = 1024,
			pixX = 20 || h,
			pixY= 0 || w ,
			midX = w/2,
			unitX = 5,
			unitY = 5,
			midY = h/2,
			x,
			y,
			grid = this.get('grid'),
			plots = this.get('plots'),
			attrs = [
				{fill:'#cccccc', 'stroke-width': 0, opacity: 0.5},
				{fill:'#666666', 'stroke-width': 0, opacity: 0.5}
			],
			attrsOver = [
				{fill:'#EEEEEE', 'stroke-width': 0, opacity: 0.5},
				{fill:'#888888', 'stroke-width': 0, opacity: 0.5}
			],
			animOver = Raphael.animation({}),
			label;
			 
			
			
			
		this.set('raphaeljs', raphaeljs = new Raphael('svg-raphaeljs', 1200, 1024));
		$(raphaeljs.node).attr({width:'100%', height: '100%', 'text-antialiasing': true});
		
		var testNearFunc = function (val, target, tolerance) {
			tolerance = Math.abs(tolerance);
			if (val <= (target + tolerance)  && val >= (target - tolerance) ) {
				return true;
			} 
			return false;
		};
		
		for (x = 0; x < 1200 / pixX; x++) {
			for (y = 0; y < 1024 / pixY; y++) {
				var attrIndex = x % 2;
				if (!grid[x]) {
					grid[x] = [];
				}
				grid[x][y] = raphaeljs.rect(x*pixX, y*pixY, pixX, pixY);
				grid[x][y].attr(attrs[attrIndex]);
				
				$(grid[x][y].node).mouseover(
					function (me, aattrsOver, aattrs, ax, ay, aattrIndex) {
						return function (e) {
							var ix;
							for (ix = 0; ix <= ax; ix++) {
								me.grid[ix][ay].animate(aattrsOver[ix % 2], 0);
							}
							for (ix = ix+1; ix < me.grid.length; ix++) {
								me.grid[ix][ay].animate(aattrs[ix % 2], 0);
							}
							var value = e.clientX,
								text = value;
								
							for (var p = 0; p < plots.length; p++) {
								if ((!plots[p].x || testNearFunc(plots[p].x, ax, unitX)) && (!plots[p].y || testNearFunc(plots[p].y, ay, unitY)) ) {
									text = text + ' ' + plots[p].text
								} else {
									//console.log(plots[p].x, !plots[p].x, ix,  !plots[p].x,  (plots[p].x == ax));
									
								}
							}
							me.get('controller').set('labelText', text);
						}
					}(this, attrsOver, attrs, x, y, attrIndex)
				);		
			}			
		}
		
		var plot = raphaeljs.rect(0,0,1,h).attr({fill:'red', 'stroke-width':0});
		this.$el.mousemove(function (me, aplot) {
			return function (e) {
			//	aplot.animate({width:e.clientX}, 80);
			}
		}(this, plot));
		
		
		
		
	}

});
