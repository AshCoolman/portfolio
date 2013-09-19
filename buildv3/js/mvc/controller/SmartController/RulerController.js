App.RulerController = App.SmartController.extend({
	label: 'RulerController',
	className: 'RulerController',
	view_didInsertElement: function (aview) {
		this._super(aview);
		App.eventMapper.addEventListener('setRuler', this, function (me) {
			return function (type, data) {
				console.log('C:setRuler()', type, data)
				 aview.setRuler(data);
			}
		}(this));
	},
	view_willRemoveElement: function (aview) {
		this._super(aview);
		App.eventMapper.removeEventListener('setRuler', this);
	}
});
App.register('controller:ruler', App.RulerController, {singleton: false });