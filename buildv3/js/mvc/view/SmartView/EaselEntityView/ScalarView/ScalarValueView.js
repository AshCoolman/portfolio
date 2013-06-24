App.ScalarValueView = App.ScalarView.extend({
	templateName: 'scalar-value',
	eslObjSettings: {
		width: 800,
		height:50,
		x: 0,
		y: 0,
		fromController: ['x', 'y', 'width', 'height', 'value']
	},
	drawInstructions: {},
	init: function () {
		this._super();
		this.set('eslObjSettings', {fromController: ['x', 'y', 'value']});
		this.set('drawInstructions', {
			isMirrored: false,
			axis: {
				step: 10,
				count:0
			},
			smallMarks: {
				unit: 5,
				step: 5,
				count:0,
				markHeights: [5]
			},
			bigMarks: {
				step: 5,
				unit: 50,
				count:0,
				markHeights: [10]
			}
		});
		return this;
	},
	override_createEsl: function() {
		var eslObjSettings = this.get('eslObjSettings');
		eslObjSettings.width = Number(this.get('value'));
		eslObjSettings.height = 50;
		this.container = new createjs.Container();
		this.shp = new createjs.Shape();
		this.container.addChild( this.shp );
		this.text = new createjs.Text(this.get('scaleLabel'), "12px Arial", "#666666");
		this.text.textBaseline = "alphabetic";
		this.container.addChild( this.text );
		return this.container;
	},
	override_draw: function (asettings) {
		console.log('scalar.override_draw() VALUE', this.controller.get('value'));
			var settings = asettings ? asettings : this.eslObj,
				shp = this.shp,
				container = this.container,
				text = this.text;
			settings.x = Number(settings.x);	
			settings.y = Number(settings.y);
			Em.assert('App.ScalarView.override_draw(): value of x in eslObj is not of type "number"', 	!isNaN(settings.x) );
			Em.assert('App.ScalarView.override_draw(): value of y in eslObj is not of type "number"',  !isNaN(settings.y) );
			Em.assert('App.ScalarView.override_draw(): value of width in eslObj is not of type "number" ' + settings.width, !isNaN(settings.width) );
			Em.assert('App.ScalarView.override_draw(): value of height in eslObj is not of type "number" ' + settings.height,  !isNaN(settings.height) );
			shp.width = settings.width;
			shp.height = settings.height;
			shp.x = Number( settings.x );
			text.regY = shp.regY = -shp.height / 2;
			text.x = 10 + Number( settings.x ) + shp.width;
			text.y = shp.y = Number(settings.y);	
			return shp;
	},
	override_redraw: function () {
		this._super();
		this.container.x++;
	}
	
			
});