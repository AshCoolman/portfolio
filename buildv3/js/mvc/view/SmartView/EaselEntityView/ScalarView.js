App.ScalarView = App.EslEntityView.extend({
	tagName: 'span',
	templateName: 'scalar',
	eslObjSettings: null,
	drawInstructions: null,
	eslObjSettings: {},
	drawInstructions: {},
	init: function() {
		this.set('drawInstructions', {
			isMirrored: true,
			axis: {
				step: 10,
				count:0
			},
			smallMarks: {
				step: 5,
				unit: 5,
				count:0,
				markHeights: [1, 1, 2, 2, 3, 3, 4]
			},
			bigMarks: {
				step: 5,
				unit: 50,
				count:0,
				markHeights: [5, 6, 8, 10] 	//[5, 7, 9, 10, 11, 12, 12.5, 13, 13.5, 14, 14.5, 15]
			}
		});
		
		this.set('eslObjSettings', {
			width: 2400,
			height:320,
			x: 0,
			y: 0,
			fromController: ['x', 'y', 'width', 'height']
		});
		
		
		this.set('value', Number(this.get('eslObjSettings').width)/2);
		
		return this._super();
	},
	startDrawing: function () { //Delete this

	},
	override_createEsl: function() {
		this.set('container', this.container = new createjs.Container());
		this.set('shp', this.shp = new createjs.Shape());
		this.container.addChild( this.shp );
		return this.container;
	},
	resize: function () {
		
	},
	override_draw: function (asettings) {
		//console.log('scalar.override_draw()', asettings);
			var settings = asettings ? asettings : this.get('eslObj'),
				container = this.get('container'),
				shp = this.get('shp');

			settings.x = Number(settings.x);	
			settings.y = Number(settings.y);
			//settings.height = Number(settings.height);	
			//settings.width = Number(settings.width);
			Em.assert('App.ScalarView.override_draw(): value of x in eslObj is not of type "number"', 	!isNaN(settings.x) );
			Em.assert('App.ScalarView.override_draw(): value of y in eslObj is not of type "number"',  !isNaN(settings.y) );
			Em.assert('App.ScalarView.override_draw(): value of width in eslObj is not of type "number" ' + settings.width, !isNaN(settings.width) );
			Em.assert('App.ScalarView.override_draw(): value of height in eslObj is not of type "number" ' + settings.height,  !isNaN(settings.height) );

			shp.width = settings.width;
			shp.height = settings.height;
			shp.x=0.5;
			container.regX = shp.width / 2;
			container.regY = -shp.height / 2;
			container.x = Number(settings.x);
			container.y = Number(settings.y);
			return shp
	},
	override_reDraw: function () {
		
		
		var drawInstructions = this.get('drawInstructions'),
			shp = this.get('shp'),
			value = this.get('value'),
			offset = (drawInstructions.isMirrored) ? shp.width/2 : 0;
			
			
		if (drawInstructions) {
			shp.graphics.beginStroke("#666")	
						.setStrokeStyle(1);
			if (drawInstructions.axis) {
				with (drawInstructions.axis) {
					if (count * step < this.get('value')) {
						if (drawInstructions.isMirrored) {
							shp.graphics.moveTo(offset - (count) * step, 0)
										.lineTo(offset - (count + 1) * step, 0);
						}
						shp.graphics.moveTo(offset + (count) * step, 0)
									.lineTo(offset + (count + 1) * step, 0)
						count++;
					} else {
						drawInstructions.axis = null;
					}
				}
			} 
			
			
			 if (drawInstructions.smallMarks) {
				with (drawInstructions.smallMarks) {
			
					if (count * step < this.get('value')) {
						for (var s = 0; s < markHeights.length && count - s >= 0; s++) {
							if (drawInstructions.isMirrored) {
								shp.graphics.moveTo(offset - (count - s) * unit, markHeights[s])
											.lineTo(offset - (count - s) * unit, - markHeights[s]);
							}
							shp.graphics.moveTo(offset + (count - s) * unit, markHeights[s])
										.lineTo(offset + (count - s) * unit, - markHeights[s]);
						}
						count++;
					} else {
						drawInstructions.smallMarks = null;
					}
				}
			} 
			 if (drawInstructions.bigMarks) {
				with (drawInstructions.bigMarks) {

					if (count * step < this.get('value')) {
						if ( ((count * step ) % unit ) == 0) {
							for (var s = 0; s < markHeights.length && (count * step - s * unit ) >= 0; s++) {
								if (drawInstructions.isMirrored) {
									shp.graphics.moveTo(offset - (count * step - s * unit ),  	markHeights[s])
												.lineTo(offset - (count * step - s * unit ), - markHeights[s]);
								}
								shp.graphics.moveTo(offset + (count * step - s * unit ),  	markHeights[s])
											.lineTo(offset + (count * step - s * unit ), - markHeights[s]);
									
							}
						}
						count++;
					} else {
						drawInstructions = null;
					}
				}
			}
			shp.graphics.endStroke();
		}
		
		
	//	this.set('drawInstructions', null);
		
		//this.container.x = Math.round( 0 );
		//this.container.y = Math.round( this.container.parent.canvas.height / 2 );
	}
});