App.RulerView = App.SmartView.extend({
	tagName:'span',
	className: 'ruler-view',
	ANI_0: 0,
	ANI_X: 0.25,
	ANI_XY: 0.5,
	ANI_XYZ: 0.75,
	didInsertElement: function () {
		this._super();
		var $el = this.get('$element'),
			xRulerMajor = $('.x-ruler')[0],
			yRulerMajor = $('.y-ruler')[0],
			xRulerMinor = $('.x-ruler-minor')[0],
			yRulerMinor = $('.y-ruler-minor')[0],
			xRuler = [xRulerMajor, xRulerMinor],
			yRuler = [yRulerMajor, yRulerMinor],
			timeline = new TimelineMax(),
			right = $('.x-ruler').css('right'),
			bottom = $('.y-ruler').css('bottom');
		
		//timeline.add(TweenLite.set([xRuler, yRuler], {opacity:0}));
		//timeline.staggerTo([xRuler, yRuler], 0.5, {opacity:1}, 0.5);	
		timeline.add(TweenLite.set(xRuler, {'bottom':'-'+bottom}));
		timeline.add(TweenLite.set(yRuler, {'right':'-'+right}));
		timeline.add(TweenLite.to(xRuler, 0.25, {'bottom':0}));
		timeline.add(TweenLite.to(yRuler, 0.25, {'right':0}));
		timeline.add(TweenLite.to(yRuler, 0.25, {'right':0}));
		timeline.pause();
		console.log('playing', right, bottom)
		this.set('timeline', timeline);
	},
	setRuler: function (data) {
		console.log('setRuler()', data)
		var timeline = this.get('timeline'),
			time = timeline.time();
		timeline.tweenTo(this[data.posStr]);
	}
});
