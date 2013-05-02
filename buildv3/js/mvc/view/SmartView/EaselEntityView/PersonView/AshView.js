App.AshView = App.EslEntityView.extend({
	eslObj: null,
	className: 'AshView', 
	templateName: 'ash',
	tag: 'span',
	override_createEsl: function () {
		return new createjs.Bitmap('img//face-ash.png');
	},
	override_draw: function(asettings) {
 		this.eslObj.scaleX = -1;
		this.eslObj.x = 400;
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

