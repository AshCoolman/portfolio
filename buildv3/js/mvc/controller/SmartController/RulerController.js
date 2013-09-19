App.RulerController = App.SmartController.extend({
	label: 'RulerController',
	className: 'RulerController',
	view_didInsertElement: function (aview) {
		this._super(aview);
		App.eventMapper.addEventListener('doShowRulerX', this, function (me) {return function (data) { aview.showRulerX(data.isShow); }}(this));
		App.eventMapper.addEventListener('doShowRulerY', this, function (me) {return function (data) { aview.showRulerY(data.isShow); }}(this));
		App.eventMapper.addEventListener('doAnimatedShowRulerX', this, function (me) {return function (data) { aview.animatedShowRulerX(data.isShow); }}(this));
		App.eventMapper.addEventListener('doAnimatedShowRulerY', this, function (me) {return function (data) { aview.animatedShowRulerY(data.isShow); }}(this));
	},
	view_willRemoveElement: function (aview) {
		this._super(aview);
		App.eventMapper.removeEventListener('doShowRulerX', this);
		App.eventMapper.removeEventListener('doShowRulerY', this);
		App.eventMapper.removeEventListener('doAnimatedShowRulerX', this);
		App.eventMapper.removeEventListener('doAnimatedShowRulerY', this);
	}
});
App.register('controller:ruler', App.RulerController, {singleton: false });