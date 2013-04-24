App.ScalarView = App.EaselEntityView.extend({
	tagName: 'span',
	templateName: 'scalar',
	easelObjSettings: {
		width: 2400,
		height: 1,
		x: 0,
		y: 0,
		fromController: ['x', 'y', 'width', 'height']
	},
	drawInstructions: null,
	startDrawing: function () {
			this.drawInstructions = {
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
			};	
			
			this.drawInstructions.axis.shp = this.shp;
			this.drawInstructions.smallMarks.shp = this.shp;
			this.drawInstructions.bigMarks.shp = this.shp;
	},
	override_createEasel: function() {
		return this.shp = new createjs.Shape();
	},
	override_draw: function (asettings) {
			var settings = asettings ? asettings : this.easelObj,
				shp = this.shp;

			settings.x = Number(settings.x);	
			settings.y = Number(settings.y);
			//settings.height = Number(settings.height);	
		//	settings.width = Number(settings.width);
			Em.assert('App.ScalarView.override_draw(): value of x in easelObj is not of type "number"', 	!isNaN(settings.x) );
			Em.assert('App.ScalarView.override_draw(): value of y in easelObj is not of type "number"',  !isNaN(settings.y) );
			Em.assert('App.ScalarView.override_draw(): value of width in easelObj is not of type "number" ' + settings.width, !isNaN(settings.width) );
			Em.assert('App.ScalarView.override_draw(): value of height in easelObj is not of type "number" ' + settings.height,  !isNaN(settings.height) );

			shp.regX = settings.width / 2;
			shp.regY = settings.height / 2;
			shp.width = settings.width;
			shp.height = settings.height;
			

			shp.x = Number(settings.x);
			shp.y = Number(settings.y);	
			
			return shp
	},
	override_redraw: function () {
		if (this.drawInstructions) {
			
			if (this.drawInstructions.axis) {
				with (this.drawInstructions.axis) {
					if (count * step < shp.width / 2) {
							shp.graphics.beginStroke("#666")
										.moveTo(shp.width/2 - (count) * step, 0)
										.lineTo(shp.width/2 - (count + 1) * step, 0)
										.moveTo(shp.width/2 + (count) * step, 0)
										.lineTo(shp.width/2 + (count + 1) * step, 0)
										.endStroke();
						count++;
					} else {
						this.drawInstructions.axis = null;
					}
				}
			} 
			 if (this.drawInstructions.smallMarks) {
				with (this.drawInstructions.smallMarks) {
			
					if (count * step < shp.width / 2) {
						for (var s = 0; s < markHeights.length && count - s >= 0; s++) {
							shp.graphics.beginStroke("#666")
										.moveTo(shp.width/2 - (count - s) * unit, markHeights[s])
										.lineTo(shp.width/2 - (count - s) * unit, - markHeights[s])
										.moveTo(shp.width/2 + (count - s) * unit, markHeights[s])
										.lineTo(shp.width/2 + (count - s) * unit, - markHeights[s])
										.endStroke();
						}
						count++;
					} else {
						this.drawInstructions.smallMarks = null;
					}
				}
			} 
			 if (this.drawInstructions.bigMarks) {
				with (this.drawInstructions.bigMarks) {

					if (count * step < shp.width / 2) {
						if ( ((count * step ) % unit ) == 0) {
							for (var s = 0; s < markHeights.length && (count * step - s * unit ) >= 0; s++) {
								shp.graphics.beginStroke("#666")
											.moveTo(shp.width/2 - (count * step - s * unit ),  	markHeights[s])
											.lineTo(shp.width/2 - (count * step - s * unit ), - markHeights[s])
											.moveTo(shp.width/2 + (count * step - s * unit ),  	markHeights[s])
											.lineTo(shp.width/2 + (count * step - s * unit ), - markHeights[s])
											.endStroke();
							}
						}
						count++;
					} else {
						this.drawInstructions = null;
					}
				}
			}
		}
		this.shp.x = Math.round( this.shp.parent.canvas.width / 2 );
		this.shp.y = Math.round( this.shp.parent.canvas.height / 2 );
		
	}
});