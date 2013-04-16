
App.AshView = App.SmartView.extend({
	easelObj: null,
	templateName: 'ash',
	tag: 'span',
	didInsertElement: function () {
		this.easelObj = new createjs.Bitmap('img//face-ash.png');
		this.get('controller').send('view_easelObjectCreated', this);
		//this.get('controller').send('view_didInsertElement', this, this);
	},
	redraw: function(){
			if (this.easelObj) {
				with (this.easelObj) {
					x = (x > 1200) ? -300 : x+10;
				}
			}
	}
	
	
});

