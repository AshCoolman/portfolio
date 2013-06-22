App.ScalarView = App.EslEntityView.extend({
	tagName: 'span',
	templateName: 'scalar',
	eslObjSettings: null,
	drawInstructions: null,
	eslObjSettings: {
		width: 2400,
		height: 1,
		x: 0,
		y: 0,
		fromController: ['x', 'y', 'width', 'height']
	},
	drawInstructions: {
		axis: {
			step: 10,
			count:0
		},
		smallMarks: {
			unit: 5,
			step: 5,
			count:0,
			markHeights: [1, 1, 2, 2, 3, 3, 4, 4, 5]
		},
		bigMarks: {
			step: 5,
			unit: 50,
			count:0,
			markHeights: [1, 2, 3, 4, 5, 6, 7, 8,9, 10, 11, 12, 13, 14, 15, 16] 	//[5, 7, 9, 10, 11, 12, 12.5, 13, 13.5, 14, 14.5, 15]
		}
	},
	init: function() {

		return this._super();
	},
	startDrawing: function () { //Delete this

	},
	override_createEsl: function() {
		return this.shp = new createjs.Shape();
	},
	resize: function () {
		
	},
	override_draw: function (asettings) {
			var settings = asettings ? asettings : this.eslObj,
				shp = this.shp;

			settings.x = Number(settings.x);	
			settings.y = Number(settings.y);
			//settings.height = Number(settings.height);	
		//	settings.width = Number(settings.width);
			Em.assert('App.ScalarView.override_draw(): value of x in eslObj is not of type "number"', 	!isNaN(settings.x) );
			Em.assert('App.ScalarView.override_draw(): value of y in eslObj is not of type "number"',  !isNaN(settings.y) );
			Em.assert('App.ScalarView.override_draw(): value of width in eslObj is not of type "number" ' + settings.width, !isNaN(settings.width) );
			Em.assert('App.ScalarView.override_draw(): value of height in eslObj is not of type "number" ' + settings.height,  !isNaN(settings.height) );

			shp.regX = settings.width / 2;
			shp.regY = settings.height / 2;
			shp.width = settings.width;
			shp.height = settings.height;
			
			shp.x = Number(settings.x);
			shp.y = Number(settings.y);	
			
			return shp
	},
	override_redraw: function () {
		var drawInstructions = this.get('drawInstructions');
		var shp = this.shp;
		if (drawInstructions) {
			if (drawInstructions.axis) {
				with (drawInstructions.axis) {
					if (count * step < shp.width / 2) {
							if (drawInstructions.isMirrored) {
								shp.graphics.beginStroke("#666")
											.moveTo(shp.width/2 - (count) * step, 0)
											.lineTo(shp.width/2 - (count + 1) * step, 0);
							}
							shp.graphics.beginStroke("#666")	
										.moveTo(shp.width/2 + (count) * step, 0)
										.lineTo(shp.width/2 + (count + 1) * step, 0)
										.endStroke();
						count++;
					} else {
						drawInstructions.axis = null;
					}
				}
			} 
			 if (drawInstructions.smallMarks) {
				with (drawInstructions.smallMarks) {
			
					if (count * step < shp.width / 2) {
						for (var s = 0; s < markHeights.length && count - s >= 0; s++) {
							if (drawInstructions.isMirrored) {
								shp.graphics.beginStroke("#666")
									.moveTo(shp.width/2 - (count - s) * unit, markHeights[s])
									.lineTo(shp.width/2 - (count - s) * unit, - markHeights[s]);
							}
							shp.graphics.beginStroke("#666")
								.moveTo(shp.width/2 + (count - s) * unit, markHeights[s])
								.lineTo(shp.width/2 + (count - s) * unit, - markHeights[s])
								.endStroke();
						}
						count++;
					} else {
						drawInstructions.smallMarks = null;
					}
				}
			} 
			 if (drawInstructions.bigMarks) {
				with (drawInstructions.bigMarks) {

					if (count * step < shp.width / 2) {
						if ( ((count * step ) % unit ) == 0) {
							for (var s = 0; s < markHeights.length && (count * step - s * unit ) >= 0; s++) {
								if (drawInstructions.isMirrored) {
									shp.graphics.beginStroke("#666")
										.moveTo(shp.width/2 - (count * step - s * unit ),  	markHeights[s])
										.lineTo(shp.width/2 - (count * step - s * unit ), - markHeights[s]);
								}
								shp.graphics.beginStroke("#666")
									.moveTo(shp.width/2 + (count * step - s * unit ),  	markHeights[s])
									.lineTo(shp.width/2 + (count * step - s * unit ), - markHeights[s])
									.endStroke();
							}
						}
						count++;
					} else {
						drawInstructions = null;
					}
				}
			}
		}
		this.shp.x = Math.round( 0 );
		this.shp.y = Math.round( this.shp.parent.canvas.height / 2 );
		
	}
});