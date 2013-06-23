App.ScalarValueView = App.ScalarView.extend({
	templateName: 'scalar-value',
	value: 64,
	scaleLabel: '64.4 KG',
	
	eslObjSettings: {
		width: 800,
		height:50,
		x: 0,
		y: 0,
		fromController: ['x', 'y', 'width', 'height']
	},
	drawInstructions: {},
	init: function () {
		this._super();
		this.set('eslObjSettings', {fromController: ['x', 'y']});
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
				markHeights: [10] 	//[5, 7, 9, 10, 11, 12, 12.5, 13, 13.5, 14, 14.5, 15]
			}
		});
		
		var eslObjSettings = this.get('eslObjSettings');
		eslObjSettings.width = Number(this.get('value'));
		eslObjSettings.height = 50;
		eslObjSettings.x = Math.round( -50+Math.random()*100 );
		eslObjSettings.y = Math.round( Math.random()*100 );
		console.log('this.eslObjSettings.width:'+eslObjSettings.width);
		return this;
	},
	override_createEsl: function() {
		this.container = new createjs.Container();
		
		this.shp = new createjs.Shape();
		this.container.addChild( this.shp );
		
		this.text = new createjs.Text(this.get('scaleLabel')+this.get('value'), "12px Arial", "#666666");
		this.text.textBaseline = "alphabetic";
		this.container.addChild( this.text );
		
		return this.container;
	},
	override_draw: function (asettings) {
		console.log('scalar.override_draw()', asettings);
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
			
			/*
			text.regX = shp.regX = shp.width / 2;
			*/
			text.regY = shp.regY = -shp.height / 2;
			
			/*
			shp.graphics.beginFill("#ff0000").drawRect(0, 0, shp.width , shp.height);
			shp.graphics.beginStroke("#666")
				.moveTo(0, 0)
				.lineTo(1000, 0)
				.endStroke();
			*/
		 	console.log('Settings?', settings)
			shp.x = Number( settings.x );
			text.x = Number( settings.x ) + shp.width;
			text.y = shp.y = Number(settings.y);	
			return shp;
	}
});