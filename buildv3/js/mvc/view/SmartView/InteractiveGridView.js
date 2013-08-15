App.InteractiveGridView = App.SmartView.extend({
	name:'InteractiveGridView',
	templateName: 'interactive-grid',
	tagName:'div',
	grid: [[]],
	plots:[
		{x:32, text: 'years alive'},
		{x:2, text: 'left feet'},
		{x:55, text: 'words per minute when typing'},
		{x:55, text: 'words per minute'},
		{x:67, text: 'KG'},
		{x:13, text: 'countries visited'}, //england, norway, germany, france, spain, italy, greece, turkey, australia, china, malaysia, singapore, thailand, wales?
		{x:120, text: 'beats per minute'},
		{x:167, text: ' cm'}
	],
	didInsertElement: function () {
		this._super();
		
		var raphaeljs,
			w = 1200,
			h = 1024,
			pixW = 20 || h,
			pixH= 0 || w ,
			unitX = 5,
			unitY = 5,
			x,
			y,
			grid = this.get('grid'),
			plots = this.get('plots'),
			attrs = [
				{fill:'#333333', 'stroke-width': 0, opacity: 0.2},
				{fill:'#555555', 'stroke-width': 0, opacity: 0.2}
			],
			attrsOver = [
				{fill:'#444444', 'stroke-width': 0, opacity: 1},
				{fill:'#666666', 'stroke-width': 0, opacity: 1}
			],
			animOver = Raphael.animation({}),
			label,
			$positionTextDiv = $('.position-text', this.$el).css({position: 'absolute'}),
			$plotTextDiv = $('.plot-text', this.$el).css({position: 'absolute'}),
			$svgRaphaeljs = this.set('$svgRaphaeljs', $('#svg-raphaeljs', this.$el));
			 
			
		this.set('raphaeljs', raphaeljs = new Raphael('svg-raphaeljs', '100%', '100%'));
		$('svg', this.$el).attr({
			'text-antialiasing': true,
			width:'100%',
			xmlns: 'http://www.w3.org/2000/svg',
			version: '1.1'
		});
		raphaeljs.setViewBox(0, 0, 1200, 1024, false);
		
	
		
		var testNearFunc = function (val, target, tolerance) {
			tolerance = Math.abs(tolerance);
			if (val <= (target + tolerance)  && val >= (target - tolerance) ) {
				return true;
			} 
			return false;
		};
		
		
		for (x = 0; x < 1200 / pixW; x++) {
			for (y = 0; y < 1024 / pixH; y++) {
				var attrIndex = (x+y) % 2;
				
				if (!grid[x]) {
					grid[x] = [];
				}
				if (attrIndex == 1) {				
					grid[x][y] = raphaeljs.rect(x*pixW, y*pixH, pixW, pixH);
					grid[x][y].attr(attrs[attrIndex]);
				}
			}			
		}
		
		
		
		for (var p = 0; p < plots.length; p++) {
			plots[p].plotShape = raphaeljs.rect( 
				0, 
				(plots[p].y * unitY || 0), 
				plots[p].x * unitX,
				(plots[p].y * unitY) || h
			).attr({fill:plots[p].fill || '#ffffff', 'stroke-width':0, opacity:0});
			console.log('created plot', plots[p])
		}
		
		var coordX = raphaeljs.rect(0,0,pixW/2,h).attr({fill:'red', 'stroke-width':0});
		
		
		var mouseZone = raphaeljs.rect(0,0,w,h).attr({'stroke-width':0});
		$(mouseZone.node).css('z-index', 9999);
		var svgPoint = $('svg', this.$el)[0].createSVGPoint();
		var pointToSVGSpaceFunc = function (e){
			var offset = $(e.target).parent().offset();
			svgPoint.x = e.pageX - offset.left;
			svgPoint.y = e.pageY - offset.top;
		  return svgPoint.matrixTransform($(e.target).parent()[0].getScreenCTM().inverse());
		}
		$( this.$el, mouseZone).mousemove(function (me, acoordX, aattrsOver, aattrs, ax, ay, aattrIndex) {
			return function (e) {
				
				/*var offset = $(e.target).parent().offset(),
					mousePt = {x:(e.pageX - offset.left), y:(e.pageY - offset.top)},
				*/
				var mousePt = pointToSVGSpaceFunc(e),
					x = mousePt.x,
					y = mousePt.y,
					gX = Math.floor(x / pixW),
					gY = Math.floor(y / pixH),
					attrIndex = (gX + gY) % 2,
					ix,
					iy,
					prevPlotArea = me.get('prevPlotArea') || [[],[]];
				
				
				//Highlight grid at mouse
				//me.grid[gX][gY].animate(aattrsOver[ix % 2], 0);
				
				
				//Remove highlight on grids in last plot area
				/*
				for (var a1 = 0; a1 < prevPlotArea.length; a1++) {
					for (var a2 = 0; a2 < prevPlotArea[a1].length; a2++) {
						prevPlotArea[a1][a2].animate(aattrs[a1], 0);
					}
				}
				
				//Highlight all grids in plot area along x axis
				prevPlotArea = [[],[]];
				for (ix = 0; ix < gX; ix++) {
						var toggleIndex = ((ix % 2) + (gY % 2)) % 2;
						me.grid[ix][gY].animate(aattrsOver[toggleIndex], 0);
						prevPlotArea[toggleIndex].push(me.grid[ix][gY])
				}
				*/
				me.set('prevPlotArea', prevPlotArea);
				

				
				//Set plot text & position
				var valX = Math.round(x/unitX),
					valY = Math.round(y/unitY),
					positionText = valX,
					plotText = '';

				for (var p = 0; p < plots.length; p++) {
					if ((!plots[p].x || testNearFunc(plots[p].x, valX, unitX)) && (!plots[p].y || testNearFunc(plots[p].y, gY, unitY)) ) {
						plotText = plots[p].x + ' ' + plots[p].text;
						plots[p].plotShape.attr({opacity:1});
					} else {	
						plots[p].plotShape.attr({opacity:0});
					}
				}
				me.get('controller').set('positionText', positionText);
				me.get('controller').set('plotText', plotText);
				
				//Set plot
				
				acoordX.stop();
				acoordX.attr({x:x-pixW});
				

			}
		}(this, coordX, attrsOver, attrs));
		this.doResize();
		
	},
	doResize: function (e) {
		/* Resize campus element */ 
		
		var campusW = 1200; 
		var campusH = 1024; 
		var curCampusW = this.get('$svgRaphaeljs').width(); 
		var newCampusH = heightInRatio(campusH,campusW,curCampusW); 
		this.get('$svgRaphaeljs').height(newCampusH); 
		function heightInRatio(oH,oW,nW){ return (oH / oW * nW); } 
	}
	

});
