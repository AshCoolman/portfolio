
App.AshView = App.SmartView.extend({
	easelObj: null,
	templateName: 'ash',
	tag: 'span',
	didInsertElement: function () {
		this.easelObj = this.override_draw();
	},
	override_draw: function() {
		return new createjs.Bitmap('img//face-ash.png');
	},
	override_redraw: function(dur){
		var change = 30/1000 * dur; //per second
			if (this.easelObj) {
				with (this.easelObj) {
					x = (x > 1200) ? -300 : x+change;
				}
			}
	}
});

