App.Dimension1NavController = App.SmartController.extend({
	isShowStart: true,
	isShowEnd: false,
	label: 'Dimension1NavController',
	view_didInsertElement: function (aview) {
		this._super(aview);
		App.eventMapper.addEventListener( 'sub_isFinish', this, function (me) {
			return function () {
				me.isShowStart = false;
				me.isShowEnd = true;
			}
		}(this) );
	},
	view_willDestroyElement: function () {
		App.eventMapper.removeEventListener( 'sub_isFinish', this);
	},
	doStart: function () {
		App.eventMapper.triggerEvent(ragh.MEvt.create('dim1Nav_start'));
	}
});

App.register('controller:dimension1-nav', App.Dimension1NavController, {singleton: false }); 