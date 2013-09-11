App.IGVC = {
	LEGEND: [
		{
			colour: '#99CC99',
			fill: '#669966',
			className: 'graph-plot-tech-portfolio',
			label: 'About this website specifically'
		},
		{
			colour: '#CC9999',
			fill: '#996666',
			className: 'graph-plot-tech-general',
			label: 'About my general tech. knowledge'
		},
		{
			colour: '#9999CC',
			fill: '#666699',
			className: 'graph-plot-general',
			label: 'About me generally'
		}
	],
	TECH_PORTFOLIO: 0,
	TECH_GENERAL: 1,
	GENERAL: 2
};

App.InteractiveGridView = App.SmartView.extend({
	PLOT_HEAD_0: '<h3 class="graph-plot-heading">',
	PLOT_HEAD_1: '</h3>',
	PLOT_ITEMS_0: '<ul><li>',
	PLOT_ITEMS_X: '</li><li>',
	PLOT_ITEMS_1: '</li></ul>',
	name: 'InteractiveGridView',
	templateName: 'interactive-grid',
	tagName: 'div',
	grid: [[]],
	testColor: '#99CC99',
	LEGEND: [
		{
			colour: '#99CC99',
			fill: '#669966',
			className: 'graph-plot-tech-portfolio',
			label: 'About this website specifically'
		},
		{
			colour: '#CC9999',
			fill: '#996666',
			className: 'graph-plot-tech-general',
			label: 'About my general tech. knowledge'
		},
		{
			colour: '#9999CC',
			fill: '#666699',
			className: 'graph-plot-general',
			label: 'About me generally'
		}
	],
	isDrawGrid: false,
	plots: [
		{
			x: 32,
			text: 'years breathing',
			type: App.IGVC.LEGEND[App.IGVC.TECH_PORTFOLIO]
		},
		{
			x: 9,
			text: 'years as a developer',
			type: App.IGVC.LEGEND[App.IGVC.GENERAL]
		},
		{
			x: 4,
			text: 'years of study',
			type: App.IGVC.LEGEND[App.IGVC.GENERAL]
		},
		{
			text: 'applications I know well',
			xList: [
				'Adobe Photoshop',
				'Adobe After Effects',
				'Adobe Premiere',
				'Adobe Media Encoder',
				'Adobe Fireworks',
				'Adobe Flex',
				'Adobe Flash',
				'Audacity (Sound)',
				'Aperture (RAW photo manip)',
				'SourceTree (SVN)'
			],
			type: App.IGVC.LEGEND[App.IGVC.TECH_GENERAL]
		},
		{
			text: 'frontend technologies I know',
			xList: [
				'Javascript',
				'Actionscript 3.0',
				'Actionscript 2.0',
				'HTML inc HTML5',
				'CSS inc CSS3',
				'CSS',
				'SVG',
				'Sass',
				'Less'
			],
			type: App.IGVC.LEGEND[App.IGVC.TECH_GENERAL]
		},
		{
			text: 'backend technologies I know',
			xList: [
				'node.js',
				'PHP',
				'mySQL',
				'PostGRES',
				'MAMP, WIMP, XAMPP <i>etc</i>'
			],
			type: App.IGVC.LEGEND[App.IGVC.TECH_GENERAL]
		},
		{
			text: 'JS libraries I used in this site',
			xList: [
				'JQuery',
				'Emberjs',
				'Handlebars (inc. custom helpers)',
				'Underscorejs',
				'Createjs: <ul><li>Preloadjs</li><li>Easeljs</li><li>Tweenjs</li></ul>',
				'Raphaeljs'
			],
			type: App.IGVC.LEGEND[App.IGVC.TECH_PORTFOLIO]
		},

		{
			x: 50,
			text: 'Ember Views written for this site',
			type: App.IGVC.LEGEND[App.IGVC.TECH_PORTFOLIO]
		},
		{
			text: 'Frameworks I used in this site',
			xList: [
				'Emberjs',
				'Foundation 4'
			],
			type: App.IGVC.LEGEND[App.IGVC.TECH_PORTFOLIO]
		},
		{
			text: 'GIT commits I made for this site',
			x: 44,
			type: App.IGVC.LEGEND[App.IGVC.TECH_PORTFOLIO]
		},
		{
			text: 'javascript features I used in the website',
			xList: [
				'closures',
				'request animation frame',
				'prototype inheritance'
			],
			type: App.IGVC.LEGEND[App.IGVC.TECH_PORTFOLIO]
		}
	],
	pixW: 0,
	pixH: 0,
	shownPlotIndex: null,
	didInsertElement: function () {
		this._super();
		var raphaeljs,
			w = 1200,
			h = 2000,
			pixW = 	this.get('controller').get('pixW') || h,
			pixH= this.get('controller').get('pixH') || w ,
			unitX = 20,
			unitY = 20,
			x,
			y,
			grid = this.get('grid'),
			plots = this.get('plots'),
			attrs = [
				{fill: '#CCCCCC', 'stroke-width': 2, 'stroke': '#595959', opacity: 0.5},
				{fill: '#EEEEEE', 'stroke-width': 2, 'stroke': '#595959', opacity: 0.5}
			],
			attrsOver = [
				{fill: '#444444', 'stroke-width': 1, 'stroke': '#999999', opacity: 1},
				{fill: '#666666', 'stroke-width': 1, 'stroke': '#999999', opacity: 1}
			],
			plotColors= ['#669966', '#99CC99'],
			animOver = Raphael.animation({}),
			label,
			$positionTextDiv = $('.position-text', this.get('$el')).css({position: 'absolute'}),
			$plotTextDiv = $('.plot-text', this.get('$el')).css({position: 'absolute'}),
			$svgRaphaeljs = this.set('$svgRaphaeljs', $('#svg-raphaeljs', this.get('$el'))),
			plotCompFfunction = function (a,b) {
			  if (a.x < b.x)
			     return -1;
			  if (a.x > b.x)
			    return 1;
			  return 0;
			};
		this.set('$legend', 		$('.graph-legend', 		this.get('$el')));
		this.set('$graphPosition', 	$('.graph-position',	this.get('$el')));
 		this.set( 'plots', this.get('plots').sort(plotCompFfunction));
		//console.log(this.get('plots'));
		
		this.set('raphaeljs', raphaeljs = new Raphael('svg-raphaeljs', '100%', '100%'));
		$('svg', this.get('$el')).attr({
			'text-antialiasing': true,
			width: '100%',
			xmlns: 'http: //www.w3.org/2000/svg',
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
			if (plots[p].xList) { plots[p].x = plots[p].xList.length; }
			plots[p].plotShape = raphaeljs.rect( 
				0, 
				(plots[p].y * unitY || 0), 
				plots[p].x * unitX,
				(plots[p].y * unitY) || h
			).attr({fill: plots[p].type.fill || plotColors[0], 'stroke-width': 0, opacity: 0});
			//console.log('created plot', plots[p])
		}
		
		var coordX = raphaeljs.rect(0,0,3,h).attr({fill: '#595959', 'stroke-width': 0});

		var mouseZone = raphaeljs.rect(0,0,w,h).attr({'stroke-width': 0, 'fill': '#001133', opacity: 0.0});
		$(mouseZone.node).addClass('grid-zone');
		this.set('$mouseZone', $(mouseZone.node))
		var svgPoint = $('svg', this.get('$el'))[0].createSVGPoint();
		var pointToSVGSpaceFunc = function (e, me){
			var $mouseZone = me.get('$mouseZone');
			var offset = $mouseZone.parent().offset();
			svgPoint.x = e.pageX - offset.left;
			svgPoint.y = e.pageY - offset.top;
			if (!$mouseZone.parent()[0].getScreenCTM) return svgPoint;
		  return svgPoint.matrixTransform($mouseZone.parent()[0].getScreenCTM().inverse());
		}
		$( this.get('$el'), mouseZone).mousedown( function (me) {
			return function (e) {
				console.log('click', e, e.target)
			}
		}(this))

		var mouseMoveFunc = function (me, acoordX, aattrsOver, aattrs, aplotColors) {
			return function (e) {
				
			
				me.get('$el').css({opacity: 1});
				createjs.Tween.get(me.get('$el')[0], {override: true}).wait(500).to({opacity: 0.25}, 3000);
				
				/*
				me.get('$legend').css({opacity: 1});
				createjs.Tween.get(me.get('$legend')[0], 		{override: true}).wait(1500).to({opacity: 0.5}, 3000);
				*/
				 
				var mousePt = pointToSVGSpaceFunc(e, me),
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
						plotNumber = 'Anything',
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
								plotNumber = plots[p].x;
						}
					}
					if (shownPlotIndex != nearestIndex) {
						if (typeof(shownPlotIndex)!='undefined' && shownPlotIndex != null) {
							plots[shownPlotIndex].plotShape.animate({opacity: 0}, 120);
						}
					}
					if (typeof(nearestIndex)!='undefined') {
						var newPlot = plots[nearestIndex],
							plotBody = (newPlot.xList) ? me.PLOT_ITEMS_0 + newPlot.xList.join(me.PLOT_ITEMS_X) + me.PLOT_ITEMS_1 : '',
							plotHeading = me.PLOT_HEAD_0 + newPlot.text + me.PLOT_HEAD_1,
							class_0 = '<span class="' + newPlot.type.className + '">',
							class_1 = '</span>';
							
						newPlot.plotShape.attr({opacity: 1});
						me.set('shownPlotIndex', nearestIndex);
						me.get('controller').set('plotText', class_0 + plotHeading + plotBody + class_1);
						me.get('controller').set('plotNumber', class_0 + newPlot.x + class_1);
						clipX = newPlot.x * unitX;
					} else {	
						me.set('shownPlotIndex', null);
						me.get('controller').set('plotText', '');
						me.get('controller').set('plotNumber', '');
					}
					me.get('controller').set('positionText', positionText);
				
					//Set plot		
					acoordX.stop();
					acoordX.attr({x: x-acoordX.attr('width') });
				
					me.set('positionText', positionText);
				}

			}
		};
		
		$(document).bind('mousemove.InteractiveGridView', mouseMoveFunc(this, coordX, attrsOver, attrs, plotColors));
		mouseMoveFunc(this, coordX, attrsOver, attrs, plotColors);
		this.doResize();
		
		
	},
	
	willDestroyElement: function ( ) { 
		this._super();
		$(document).unbind('mousemove.InteractiveGridView');
		$(window).unbind('resize.InteractiveGridView');
	},

	doResize: function (e) {
		/* Resize campus element */ 
		var campusW = 1200; 
		var campusH = 2000; 
		var curCampusW = this.get('$svgRaphaeljs').width(); 
		var newCampusH = heightInRatio(campusH,campusW,curCampusW); 
		this.get('$svgRaphaeljs').height(newCampusH);  
		function heightInRatio(oH,oW,nW){ return (oH / oW * nW); } 
	}
	

});
