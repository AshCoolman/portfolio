App.RulerView = App.SmartView.extend({
	tagName:'span',
	className: 'ruler-view',
	ANI_0: 0,
	ANI_X: 500,
	ANI_XY: 1000,
	ANI_XYZ: 1500,
	didInsertElement: function () {
		this._super();
		var $el = this.get('$element'),
			xRuler = $('.x-ruler', $el)[0],
			yRuler = $('.y-ruler', $el)[0],
			timeline = new createjs.Timeline(null, null, {paused:true, position:0});
		timeline.addTween(createjs.Tween.get( xRuler ).set({alpha:0}));	
		timeline.addTween(createjs.Tween.get( yRuler ).set({alpha:0}));
		timeline.addTween(createjs.Tween.get( xRuler ).to({alpha:1},1000));
		timeline.addTween(createjs.Tween.get( yRuler ).to({alpha:1},1500));
		this.set('timeline', timeline);
	},
	setRuler: function (data) {
		createjs.Tween.get( this.get('timeline') ).to({position: this[data.posStr]}, 500);
	}
});
