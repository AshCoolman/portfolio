App.EaselEntityContainerController = App.SmartController.extend({
	view_didInsertElement: function (aview) {
		this._super(aview);
		App.static_easelEntityContainerView = aview;
	//	App.eventMapper.triggerEvent(ragh.MEvt.create('static_easelEntityContainerViewAdded'));
	}
});