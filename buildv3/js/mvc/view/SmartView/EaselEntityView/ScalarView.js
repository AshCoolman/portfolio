App.ScalarView = App.EaselEntityView.extend({
	tagName: 'span',
	templateName: 'scalar',
	easelObjSettings: {
		width: 200,
		height: 30,
		x: 0,
		y: 0,
		fromController: ['x', 'y', 'width', 'height']
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
			shp.graphics.clear();
			shp.graphics.beginFill('#CCFFCC');
			shp.graphics.drawRect( 0, 0, shp.width, shp.height);

			shp.x = Number(settings.x);
			shp.y = Number(settings.y);
			return shp
	},
	override_redraw: function () {

	}
});