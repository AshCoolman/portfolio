App.AshController = App.EaselEntityController.extend({
	label: 'ash',
	view_easelObjectCreated: function(aview) {
		App.eventMapper.triggerEvent(ragh.MEvt.create('viewAddedEasel', {label: this.label, view: aview}));
	}
});
