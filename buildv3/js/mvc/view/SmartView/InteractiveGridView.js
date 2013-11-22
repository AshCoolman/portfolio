App.IGVC = {
	LEGEND: [
		{
			colour: '#99CC99',
			fill: '#669966',
			cssClass: 'graph-plot-tech-portfolio'
		},
		{
			colour: '#CC9999',
			fill: '#996666',
			cssClass: 'graph-plot-tech-general'
		},
		{
			colour: '#9999CC',
			fill: '#666699',
			cssClass: 'graph-plot-general'
		}
	],
	TECH_PORTFOLIO: 0,
	TECH_GENERAL: 1,
	GENERAL: 2
};

App.InteractiveGridView = App.SmartView.extend({
	name: 'InteractiveGridView',
	templateName: 'interactive-grid',
	tagName: 'div',
	grid: [[]],
	testColor: '#99CC99',
	LEGEND: [
		{
			colour: '#99CC99',
			fill: '#669966',
			cssClass: 'graph-plot-tech-portfolio',
			label: 'about this site'
		},
		{
			colour: '#CC9999',
			fill: '#996666',
			cssClass: 'graph-plot-tech-general',
			label: 'about my tech knowledge'
		},
		{
			colour: '#9999CC',
			fill: '#666699',
			cssClass: 'graph-plot-general',
			label: 'other'
		}
	],
	isDrawGrid: false,
	plotsPlainText: '',
	pixW: 0,
	pixH: 0,
	shownPlotIndex: null,
	didInsertElement: function () {
		this._super();
		
		$('.graph-plot', this.get('$el')).css({opacity: 0});
		this.set('$legend', 		$('.graph-legend',	this.get('$el')));
		this.set('$graphPosition', 	$('.graph-position',this.get('$el')));
		this.set('plots', plots = this.setPlotsFromPlainText( $('.interactive-grid-values').text() ));
		
		var raphaeljs,
			w = App.BREAKPOINT.WIDTH_2,
			h = 2000,
			pixW = 	this.get('controller').get('pixW') || h,
			pixH= this.get('controller').get('pixH') || w ,
			unitX = w / (2+plots.maxX),
			unitY = 20,
			x,
			y,
			grid = this.get('grid'),
			plots = this.get('plots'),
			plotColors= ['#669966', '#99CC99'],
			animOver = Raphael.animation({}),
			label,
			$positionTextDiv = $('.position-text', this.get('$el')).css({position: 'absolute'}),
			$plotTextDiv = $('.plot-text', this.get('$el')).css({position: 'absolute'}),
			$svgRaphaeljs = this.set('$svgRaphaeljs', $('#svg-raphaeljs', this.get('$el')));




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
			if (val >= (target - tolerance)  && val <= (target + tolerance) ) {
				return true
			} 
			return false;
		};

		
		//Create plot markers
		var plotMarkers = [],
			plotMarkerDic = {},
			pm;
		for (var p = 0; p < plots.length; p++) {
			if (!plotMarkerDic[plots[p].x]) {
				pm = raphaeljs.rect(0,0,3,30).attr({fill: '#999999', 'stroke-width': 0, opacity:1})
				pm.attr({x: unitX * plots[p].x - 3 });
				plotMarkers.push( pm );
				plotMarkerDic[plots[p].x] = pm;
			}
			plots[p].marker = plotMarkerDic[plots[p].x];
			
		}
		this.set('plotMarkers', plotMarkers);
		
		var thePlotX = raphaeljs.rect( 
			0, 
			0, 
			300,
			10
		).attr({fill: '#666666', 'stroke-width': 0, opacity: 0});
		
		this.set('xPlot', thePlotX);
		var xPlotNumber = raphaeljs.text(0, 0, '');
		xPlotNumber.attr({ "font-size": 28, "font-family": "Arial, Helvetica, sans-serif", 'fill': '#99CC99', x: 14 });
		this.set('xPlotNumber', xPlotNumber);
		
		
		var xPosNumber = raphaeljs.text(0, 0, '');
		xPosNumber.attr({ "font-size": 28, "font-family": "Arial, Helvetica, sans-serif", 'fill': '#333333', x: App.BREAKPOINT.WIDTH_2 - 28 });
		this.set('xPosNumber', xPosNumber);
		
		
		
			

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
		
		
		//Create mouse X
		var coordX = raphaeljs.rect(0,0,3,h).attr({fill: '#595959', 'stroke-width': 0});
		$( this.get('$el'), mouseZone).mousedown( function (me) {
			return function (e) {
				console.log('click', e, e.target)
			}
		}(this))





		
		
		var mouseMoveFunc = function (me, acoordX, athePlotX, xPlotNumber, xPosNumber, aplotColors) {
			return function (e) {
				
				var mousePt = pointToSVGSpaceFunc(e, me),
					x = mousePt.x,
					y = mousePt.y,
					gX = Math.floor(x / pixW),
					gY = Math.floor(y / pixH),
					ix,
					iy,
					prevPlotArea = me.get('prevPlotArea') || [[],[]];
				
				me.set('prevPlotArea', prevPlotArea);
					//Set plot text & position
				if (me.get('controller').get('isPlotX')) {
				
					var valX = Math.round(x/unitX),
						valY = Math.round(y/unitY),
						positionText = valX,
						plotText = [],
						plotHeading = '',
						plotNumber = 'Anything',
						deltaX,
						distanceX,
						distanceY,
						shownPlotIndex = me.get('shownPlotIndex'),
						clipX = w,
						shownPlotList = [];
	 				
					//me.get('xPosNumber').attr({text: valX})
					//Find plots near to mouse
					for (var p = 0; p < plots.length; p++) {
						deltaX = Math.abs(plots[p].x - valX);
						  
						//if (testNearFunc(x, plots[p].x*unitX, 15))
						
						shownPlotList.push(plots[p]);
					}
					
					//If some plots should be shown, then show and animate
					if (shownPlotList.length > 0) {
						
						var shownPlot = shownPlotList[0],
							plotX = shownPlot.x,
							clipX = shownPlot.x * unitX;
						//check if changes have occurred
						if (athePlotX['animateWidthTarget'] != clipX) {
							athePlotX['animateWidthTarget'] = clipX;
							//Broadcast the plots to be shown
							App.eventMapper.trigger('setInteractiveGridData', shownPlotList);
							//Show dom elements
							$('.graph-info').css({display: 'block'});
							$('.graph-info h3').addClass('highlight');
							$('.d1-content').addClass('graph-highlight');
							$('.graph-plot', me.get('$el')).css({opacity: 1});
							//Animate the x bar
							athePlotX
								.stop()
								.animate({   
							        fill: '#FF6347',
									width: clipX,
									opacity:1
							    }, 100);
							
							//xPlotNumber.attr({text: plotX});
							
							//Animate the mouse's x plot
							
							
							shownPlot.marker.attr({ fill: '#FF6347' })
							
								
						}
					} else {
					// else if no plots should be shown, hide them all
					
						App.eventMapper.trigger('setInteractiveGridData', [{x: valX}]);
					
						if (athePlotX['animateWidthTarget'] != -1) {
							$('.graph-info h3').removeClass('highlight')
							$('.d1-content').removeClass('graph-highlight');
							acoordX.attr({ fill: '#595959' });
							athePlotX['animateWidthTarget'] = -1;
							$('.graph-plot', me.get('$el')).css({opacity: 0});
						athePlotX.animate({   
							        fill: '#CCCCCC'
							    }, 100);
							
							me.get('plotMarkers').forEach(
								function(item, index, enumerable) {
									item.animate({   
									        fill: '#CCCCCC'
									    }, 100);
								}
							);
						}						
					}
					
					
					//Set plot		
					acoordX.attr({x: x-acoordX.attr('width') });
					//TODO which one of these is being used?
					me.get('controller').set('positionText', positionText);
					me.set('positionText', positionText);
				}
			}
		};
		
		$(document).bind('mousemove.InteractiveGridView', mouseMoveFunc(this, coordX, thePlotX, xPlotNumber, plotColors));
		
		mouseMoveFunc(this, coordX, thePlotX, plotColors);
		

		
		
		this.doResize();
		
		$(window).on( 'resize.InteractiveGridView', function (me) { return function (e) { me.doResize(e) }}(this) );
	},
	
	setPlotsFromPlainText: function ( src ) {
		var plotPlainTextList = src.split('## '),
			plotsList = [],
			plotCompFfunction = function (a,b) {
			  if (a.x < b.x)
			     return -1;
			  if (a.x > b.x)
			    return 1;
			  return 0;
			},
			maxX = 0;
			
		for (var p = 0; p < plotPlainTextList.length; p++) {
			var plot = {};
			plot.xList = plotPlainTextList[p].split('\n');
			plot.text = plot.xList.splice(0, 1)[0];
			plot.x = plot.xList.splice(0, 1)[0];
			plot.type = App.IGVC.LEGEND[App.IGVC.TECH_PORTFOLIO];
			while (plot.xList.indexOf('') >= 0)
				plot.xList.splice(plot.xList.indexOf(''), 1);
			if (plot.x == "") 
				plot.x = plot.xList.length;
			else
				plot.x = parseInt(plot.x, 10);
			maxX = Math.max(plot.x, maxX);
			plotsList.push(plot);
		}
		plotsList.maxX = maxX;
		
 		return plotsList.sort(plotCompFfunction);;
	},
	
	willDestroyElement: function ( ) { 
		this._super();
		$(document).unbind('mousemove.InteractiveGridView');
		$(window).unbind('resize.InteractiveGridView');
	},

	
	doResize: function (e) {
		/* Resize campus element */ 
		var realW = App.BREAKPOINT.WIDTH_2; 
		var realH = 2000; 
		var resizeW = this.get('$svgRaphaeljs').width(); 
		var resizeH = heightInRatio(realH,realW,resizeW); 
		this.get('$svgRaphaeljs').height(resizeH);  
		function heightInRatio(oH,oW,nW){ return (oH / oW * nW); }
		
		//find 50% point in viewport
		var viewH = $(document).height(); 
		var ratioViewed = viewH / resizeH;
		var yAtPerc = 1 * ratioViewed * realH;
		this.get('xPlot').attr({y:yAtPerc})
		this.get('xPlotNumber').attr({y:yAtPerc - 18})
		this.get('xPosNumber').attr({y:yAtPerc - 18})
		
		this.get('plotMarkers').forEach(
			function (me, ay) {
				return function (item, index, enumerable) {
					item.attr({y:ay - 10})
				}
			}(this, yAtPerc)
		);
		
		
	}
	

});
