PortfolioApp.World2dController = PortfolioApp.SmartController.extend({
	ashTest: null,
	easelEntitiesPending: [],
	init: function () {
		this._super();
		
		PortfolioApp.eventMapper.addEventListener('world2dEditorAddSquare', this, this.addSquare);
	 
		
	},
	createEaselEntitiesPending: function() {

			var e,
				view = this.get('view');
			
			console.log('view', view._debugContainerKey)
			for (e = 0; e < this.easelEntitiesPending.length; e++) {
				view.easelDisplayObjectCreatedByChildView( this.easelEntitiesPending[e].label, this.easelEntitiesPending[e].childView);
			}
			this.easelEntitiesPending = [];
		
	},
	easelDisplayObjectCreatedByChildView: function (label, childView) {
			console.log('easelDisplayObjectCreatedByChildView...', label, childView._debugContainerKey)

			this.easelEntitiesPending.push({
				label: label,
				childView: childView
			});

			if (this.get('isViewInserted')) {
				console.log('easelDisplayObjectCreatedByChildView && isWorld2dViewInseted', label, childView._debugContainerKey)
				this.createEaselEntitiesPending();
			}
	},
	
	view_didInsertElement: function (childView) {
		this._super(childView);
		console.log('adocbc 2', childView._debugContainerKey);
		this.createEaselEntitiesPending();
	},
	addSquare: function () {
		this.view.addSquare();
		
	},
	easelEntityContainerView_didInsertElement: function(aview) {
		this.view.easelEntityContainerView = aview;
	}
})
