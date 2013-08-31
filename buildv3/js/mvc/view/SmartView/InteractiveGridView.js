App.InteractiveGridView = App.SmartView.extend({
	name:'InteractiveGridView',
	templateName: 'interactive-grid',
	tagName:'div',
	grid: [[]],
	isDrawGrid:false,
	plots:[
		{x:3, text: '\
		<p>\
			YEARS OF STUDY\
		</p>'},
		{x:4, text: '\
		<p>\
			JS TECHNIQUES USED IN THIS WEBSITE\
		</p>\
		<ul>\
			<li>Web workers</li>\
			<li>Closures</li>\
			<li>Request animation frame</li>\
			<li>AJAX</li>\
		</ul>'},
		{x:8, text: '\
		<p>\
			PROFICIENT PROGRAMMING LANGUAGES\
		</p>'},
		{x:9, text: '\
		<p>\
			YEARS AS A DEVELOPER\
		</p>'},
		{x:10, text: '\
		<p>\
			JS API&#39;S USED IN THIS WEBSITE\
		</p>\
		<ul>\
			<li>Threejs (inc WebGL)</li>\
			<li>JQuery</li>\
			<li>Emberjs (inc. Handlebars & Underscorejs)</li>\
			<li>Createjs (inc. Preloadjs,  Easeljs,  Tweenjs)</li>\
			<li>Raphaeljs</li>\
		</ul>'}
	],
	pixW:0,
	pixH:0,
	shownPlotIndex: null,
	didInsertElement: function () {
		this._super();
		var raphaeljs,
			w = 1200,
			h = 1024,
			pixW = 	this.get('controller').get('pixW') || h,
			pixH= this.get('controller').get('pixH') || w ,
			unitX = 10,
			unitY = 10,
			x,
			y,
			grid = this.get('grid'),
			plots = this.get('plots'),
			attrs = [
				{fill:'#CCCCCC', 'stroke-width': 5, 'stroke':'#595959', opacity: 0.5},
				{fill:'#EEEEEE', 'stroke-width': 5, 'stroke':'#595959', opacity: 0.5}
			],
			attrsOver = [
				{fill:'#444444', 'stroke-width': 1, 'stroke':'#999999', opacity: 1},
				{fill:'#666666', 'stroke-width': 1, 'stroke':'#999999', opacity: 1}
			],
			plotColors= ['#669966', '#99CC99'],
			animOver = Raphael.animation({}),
			label,
			$positionTextDiv = $('.position-text', this.$el).css({position: 'absolute'}),
			$plotTextDiv = $('.plot-text', this.$el).css({position: 'absolute'}),
			$svgRaphaeljs = this.set('$svgRaphaeljs', $('#svg-raphaeljs', this.$el)),
			plotCompFfunction = function (a,b) {
			  if (a.x < b.x)
			     return -1;
			  if (a.x > b.x)
			    return 1;
			  return 0;
			};
		
 		this.set( 'plots', this.get('plots').sort(plotCompFfunction));
		//console.log(this.get('plots'));
		
		this.set('raphaeljs', raphaeljs = new Raphael('svg-raphaeljs', '100%', '100%'));
		$('svg', this.$el).attr({
			'text-antialiasing': true,
			width:'100%',
			xmlns: 'http://www.w3.org/2000/svg',
			version: '1.1'
		});
		raphaeljs.setViewBox(0, 0, w, h, false);
		
	
		
		var testNearFunc = function (val, target, tolerance) {
			tolerance = Math.abs(tolerance);
			if (val <= (target + tolerance)  && val >= (target - tolerance) ) {
				return true
			} 
			return false;
		};
		
		if (this.get('isDrawGrid')) {			
			for (x = 0; x < w / pixW; x++) {
				var attrIndex = (x) % 2;
			
				if (!grid[0]) {
					grid[0] = [];
				}
				if (attrIndex == 1) {
					grid[0][y] = raphaeljs.path('M'+(x*pixW)+' 0L'+(x*pixW)+' '+h);
					grid[0][y].attr(attrs[attrIndex]);
				}		
			}
		
			for (y = 0; y < h / pixH; y++) {
				var attrIndex = (y) % 2;
			
				if (!grid[1]) {
					grid[1] = [];
				}
				if (attrIndex == 1) {
					grid[1][y] = raphaeljs.path('M0 '+(y*pixH)+'L'+w+' '+y*pixH);
					grid[1][y].attr(attrs[attrIndex]);
				}
			}	
		}
		
		
		
		for (var p = 0; p < plots.length; p++) {
			plots[p].plotShape = raphaeljs.rect( 
				0, 
				(plots[p].y * unitY || 0), 
				plots[p].x * unitX,
				(plots[p].y * unitY) || h
			).attr({fill:plots[p].fill || plotColors[0], 'stroke-width':0, opacity:0});
			//console.log('created plot', plots[p])
		}
		
		var coordX = raphaeljs.rect(0,0,6,h).attr({fill:'#595959', 'stroke-width':0});
		/*
		var coordLabel = raphaeljs.text(coordX.width, h/2, '').attr({fill:'#669966', 'stroke-width':0, 'text-anchor': 'start', 'font-size':12});
		
		var positionHeadingOverlap = raphaeljs.text(w-10, 50, '').attr({fill:'#666666', 'stroke-width':0, 'text-anchor': 'end', 'font-size':100});
		var positionHeadingNonOverlap = raphaeljs.text(w-10, 50, '').attr({fill:'#666666', 'stroke-width':0, 'text-anchor': 'end', 'font-size':100});
		
		var plotHeadingOverlap = raphaeljs.text(10, 50, '').attr({fill:'#99CC99', 'stroke-width':0, 'text-anchor': 'start', 'font-size':100});
		var plotHeadingNonOverlap = raphaeljs.text(10, 50, '').attr({fill:'#99CC99', 'stroke-width':0, 'text-anchor': 'start', 'font-size':100});
		var plotInfoOverlap = raphaeljs.text(10, 150, '').attr({fill:'#99CC99', 'stroke-width':0, 'text-anchor': 'start', 'font-size':16});
		var plotInfoNonOverlap = raphaeljs.text(10, 150, '').attr({fill:'#99CC99', 'stroke-width':0, 'text-anchor': 'start', 'font-size':16});
	
		*/
		var mouseZone = raphaeljs.rect(0,0,w,h).attr({'stroke-width':0, 'fill':'#001133', opacity:0.0});
		$(mouseZone.node).css('z-index', 9999);
		var svgPoint = $('svg', this.$el)[0].createSVGPoint();
		var pointToSVGSpaceFunc = function (e){
			var offset = $(e.target).parent().offset();
			svgPoint.x = e.pageX - offset.left;
			svgPoint.y = e.pageY - offset.top;
			if (!$(e.target).parent()[0].getScreenCTM) return svgPoint;
		  return svgPoint.matrixTransform($(e.target).parent()[0].getScreenCTM().inverse());
		}
		$( this.$el, mouseZone).mousemove(function (me, acoordX, aattrsOver, aattrs, aplotColors) {
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
				
				me.set('prevPlotArea', prevPlotArea);
				

				
					//Set plot text & position
					if (me.get('controller').get('isPlotX')) {
					
					var valX = Math.round(x/unitX),
						valY = Math.round(y/unitY),
						positionText = valX,
						plotText = '',
						plotHeading = 'Anything',
						deltaX,
						smallestDeltaX,
						nearestIndex,
						distanceX,
						distanceY,
						ifNearest,
						ifNearEnough,
						shownPlotIndex = me.get('shownPlotIndex'),
						clipX = w;
					
					for (var p = 0; p < plots.length; p++) {
						deltaX = Math.abs(plots[p].x - valX);

						testNearEnough = (!plots[p].x || testNearFunc(plots[p].x, valX, 10/unitX)) && (!plots[p].y || testNearFunc(plots[p].y, gY, 10/unitY));
						testNearest = !smallestDeltaX || smallestDeltaX > deltaX;
						if ( testNearEnough && testNearest) {
								nearestIndex = p;
								smallestDeltaX = deltaX;
								plotHeading = plots[p].x;
						}
					}
					if (shownPlotIndex != nearestIndex) {
						if (typeof(shownPlotIndex)!='undefined' && shownPlotIndex != null) {
							plots[shownPlotIndex].plotShape.animate({opacity:0}, 120);
						}
					}
				
					if (typeof(nearestIndex)!='undefined') {
						plotText = plots[nearestIndex].text;
						plots[nearestIndex].plotShape.attr({opacity:1});
						me.set('shownPlotIndex', nearestIndex);
						me.get('controller').set('plotText', plotText);
						me.get('controller').set('plotHeading', plotHeading);
						clipX = plots[nearestIndex].x * unitX;
					} else {	
						me.set('shownPlotIndex', null);
						me.get('controller').set('plotText', '');
						me.get('controller').set('plotHeading', '');
					}
					me.get('controller').set('positionText', positionText);
				
					//Set plot		
					acoordX.stop();
					acoordX.attr({x:x-acoordX.attr('width') });
					//coordLabel.attr({x:(typeof(nearestIndex)!='undefined') ? 10 + clipX : acoordX.attr('x') + 5 + acoordX.attr('width') , y: y + 40, text: plotText || positionText});
				
					/*
					positionHeadingOverlap.attr({
						'text': positionText,
						'clip-rect': [ 0,   0,  clipX, h].join(',')
					});
					positionHeadingNonOverlap.attr({
						'text': positionText, 
						'clip-rect': [clipX, 0, w - clipX, h].join(',')
					});
				
				
		 		
					plotHeadingOverlap.attr({
						'color': aplotColors[0],
						'text': plotHeading,
						'clip-rect': [ 0,   0,  clipX, h].join(',')
					});
					plotHeadingNonOverlap.attr({
						'color': aplotColors[1],
						'text': plotHeading, 
						'clip-rect': [clipX, 0, w - clipX, h].join(',')
					});
				

				
				
					plotInfoOverlap.attr({
						'color': aplotColors[0],
						'text': plotText || '',
						'clip-rect': [ 0,   0,  clipX, h].join(',')
					});
					plotInfoOverlap.attr({
						'y': 100 + plotInfoOverlap.getBBox().height/2
					});
				
				
					plotInfoNonOverlap.attr({
						'color': aplotColors[1],
						'text': plotText || '', 
						'clip-rect': [clipX, 0, w - clipX, h].join(',')
					});
					plotInfoNonOverlap.attr({
						'y': 100 + plotInfoOverlap.getBBox().height/2
					});
					*/
				
					me.set('positionText', positionText);
				}

			}
		}(this, coordX, attrsOver, attrs, plotColors));
		
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
