App.AshView = App.EslEntityView.extend({
	eslObj: null,
	className: 'AshView', 
	templateName: 'ash',
	tag: 'span',
	eslObjSettings: {
		x: 0,
		y: 0,
		fromController: ['x', 'y', 'img', 'scaleX']
	},
	override_createEsl: function (asettings) {
		var shp = new createjs.Shape();
		var img = new createjs.Bitmap(asettings.img);
		var container = new createjs.Container();
		container.addChild(shp);
		container.addChild(img);
		return container;
	},
	override_draw: function(asettings) {
		var settings = asettings ? asettings : this.get('eslObj')
 		this.get('eslObj').scaleX = settings.scaleX || 1;
		this.get('eslObj').x=settings.x; //-1; //HACK WHY?
		this.get('eslObj').y=settings.y; //-1; //HACK WHY?
		
		
	},
	doMosaicEffect: function () {
	
	},
	override_reDraw: function (dur) {
		
		var change = 30/1000 * dur; //per second
		if (this.get('eslObj')) {
			with (this.get('eslObj')) {
				//x = (x > 1200) ? -300 : x+change;
			}
		}
		
	}
	
});

