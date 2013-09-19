App.RulerView = App.SmartView.extend({
	tagName:'span',
	className: 'ruler-view',
	SHOWN: { display:'block', opacity:1 }, 
	HIDDEN: { display:'none' },
	didInsertElement: function () {
		this._super();
		var $el = this.get('$element');
		this.set('$rulerX', $('.x-ruler', $el));
		this.set('$rulerY', $('.y-ruler', $el));
	},
	doHideRulers: function () {
		this.showRulerX(this.set('$ruleX'), false);
		this.showRulerY(this.set('$ruleY'), false);
	},
	animatedShowRulerX: function (isShow) {
		this.animatedShow(this.set('$ruleX'), isShow);
		this.animatedShow(this.set('$ruleY'), false);
	},
	animatedShowRulerY: function (isShow) {
		this.animatedShow(this.set('$ruleX'), true);
		this.animatedShow(this.set('$ruleY'), isShow);
	},
	animatedShow: function ($el, isShow) {
		$el.stop();
		isShow 
			? $el.fadeIn() 
			: $el.fadeOut();
	},
	showRulerX: function (isShow) {
		this.show(this.set('$ruleX'), isReveal);
	},
	showRulerY: function (isShow) {
		this.show(this.set('$ruleY'), isReveal);
	},
	show: function ($el, isShow) {
		$el.stop();
		isShow 
			? $el.css(this.SHOWN) 
			: $el.css(this.HIDDEN);
	}
});
