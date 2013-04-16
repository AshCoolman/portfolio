App.EaselEntityContainerController = App.SmartController.extend({
	view_didInsertElement: function (aview) {
		this._super(aview);
		App.static_easelEntityContainerView = aview;
		console.log('EaselEntityContainerController.view_didInsertElement()', App.static_easelEntityContainerView);
	//	App.eventMapper.triggerEvent(ragh.MEvt.create('static_easelEntityContainerViewAdded'));
	}
});