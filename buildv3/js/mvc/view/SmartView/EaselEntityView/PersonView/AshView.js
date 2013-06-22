App.AshView = App.EslEntityView.extend({
	eslObj: null,
	className: 'AshView', 
	templateName: 'ash',
	tag: 'span',
	eslObjSettings: {
		x: 0,
		y: 0,
		fromController: ['x', 'y']
	},
	override_createEsl: function () {
		return new createjs.Bitmap('img//face-ash.png');
	},
	override_draw: function(asettings) {
		var settings = asettings ? asettings : this.eslObj
 		this.eslObj.scaleX = 1;
		this.eslObj.x=settings.x; //-1; //HACK WHY?
		this.eslObj.y=settings.y; //-1; //HACK WHY?
		
		
	},
	override_redraw: function (dur) {
		var change = 30/1000 * dur; //per second
		if (this.eslObj) {
			with (this.eslObj) {
				//x = (x > 1200) ? -300 : x+change;
			}
		}
	}
	
});

