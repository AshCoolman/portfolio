App.AshController = App.EaselEntityController.extend({
	label: 'ash',
	view_easelObjectCreated: function(aview) {
		var data = {label:this.label, childView:aview};
		App.eventMapper.triggerEvent(ragh.MEvt.create('easelCreatedByChildView', data));
	}
});
