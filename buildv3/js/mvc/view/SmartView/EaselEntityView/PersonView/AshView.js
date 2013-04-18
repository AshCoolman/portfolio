
App.AshView = App.SmartView.extend({
	easelObj: null,
	templateName: 'ash',
	tag: 'span',
	didInsertElement: function () {
		this.easelObj = this.override_draw();
		this.get('controller').send('view_easelObjectCreated', this);
	},
	override_draw: function() {
		return new createjs.Bitmap('img//face-ash.png');
	},
	redraw: function(){
			if (this.easelObj) {
				with (this.easelObj) {
					x = (x > 1200) ? -300 : x+10;
				}
			}
	}
});

