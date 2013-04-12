PortfolioApp.World2dController = PortfolioApp.SmartController.extend({
	ashTest: null,
	easelEntitiesPending: [],
	init: function () {
		this._super();
		
		this.createEaselEntitiesPending = ( function(me) {
			return  function () {
				var e,
					view = me.get('view');
				
				console.log('me view', view._debugContainerKey)
				for (e = 0; e < me.easelEntitiesPending.length; e++) {
					view.view_createdEaselDisplayObject( me.easelEntitiesPending[e].label, me.easelEntitiesPending[e].childView);
				}
				this.easelEntitiesPending = [];
			}
		}(this));
		
		this.viewCreatedEaselDisplayObject = ( function(me) {
			return  function (label, childView) {
					me.easelEntitiesPending.push({
						label: label,
						childView: childView
					});

					if (me.get('isViewInserted')) {
						me.createEaselEntitiesPending();
					}
			}
		}(this));
	},
	view_didInsertElement: function (childView) {
		this._super(childView);
		this.createEaselEntitiesPending();
	},
	addSquare: function () {
		this.view.addSquare();
	}
})
