PortfolioApp.World2dController = PortfolioApp.SmartController.extend({
	ashTest: null,
	ashPending: null,
	view_createdEaselDisplayObject: function(label, easelObj, childView) {
	
		if (label === 'ash') {
			this.ashPending = {
				label: label,
				object: easelObj,
				childView: childView
			}
		}
		
		if (this.get('isViewInserted') ) {
			this.get('view').view_createdEaselDisplayObject(this.ashPending.label, this.ashPending.object, this.ashPending.childView);
			this.ashPending = null;
		} //else wait till did insert view element

	},
	view_didInsertElement: function (childView) {
		this._super(childView);
		if (this.ashPending) {		
			this.get('view').view_createdEaselDisplayObject(this.ashPending.label, this.ashPending.object, this.ashPending.childView);
			this.ashPending = null;
		}
		 
		 
	}
})
