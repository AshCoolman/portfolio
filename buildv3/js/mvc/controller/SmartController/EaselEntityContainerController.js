App.EslEntityContainerController = App.SmartController.extend({
	view_didInsertElement: function (aview) {
		if (!this.get('view')) {
		this._super(aview);
		App.static_eslEntityContainerView = aview;
		} else {
			//aview.didInsertElement();
		}
	//	App.eventMapper.trigger('static_eslEntityContainerViewAdded'));
	},
	
	view_eslEntityCreated: function (eslEntityController) {
		console.log(' view_eslEntityCreated', eslEntityController)
		App.eventMapper.trigger('eslViewAddedEsl', {label: eslEntityController.label, view: eslEntityController.get('view'), parentEslObj: eslEntityController.get('view').parentEslObj});

	},
});