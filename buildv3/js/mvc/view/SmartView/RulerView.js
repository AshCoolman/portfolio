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
			left = $('.x-ruler').css('left'),
			bottom = $('.y-ruler').css('bottom');
		
		//timeline.add(TweenLite.set([xRuler, yRuler], {opacity:0}));
		//timeline.staggerTo([xRuler, yRuler], 0.5, {opacity:1}, 0.5);	
		timeline.add(TweenLite.set(xRuler, {'bottom':'-'+bottom, ease:Strong.easeOut}));
		timeline.add(TweenLite.set(yRuler, {'left':'-'+left, ease:Strong.easeOut}));
		timeline.add(TweenLite.to(xRuler, 0.25, {'bottom':0, ease:Strong.easeOut}));
		timeline.add(TweenLite.to(yRuler, 0.25, {'left':0, ease:Strong.easeOut}));
		timeline.add(TweenLite.to(yRuler, 0.25, {'left':0, ease:Strong.easeOut}));
		timeline.pause();
		this.set('timeline', timeline);
	},
	setRuler: function (data) {
		var timeline = this.get('timeline'),
			time = timeline.time();
		timeline.tweenTo(this[data.posStr]);
	}
});
