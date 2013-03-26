PortfolioApp.Dimension2Route = Em.Route.extend({ 
	init: function () {
		this._super();
	},
	model: function () {
		return (PortfolioApp.dimension2Model) ? PortfolioApp.dimension2Model : PortfolioApp.Dimension2Model.create();
	},
	activate: function () { 
		//Application state 
	},
	deactivate: function () { 
	},
	setupController: function (controller, model) {
		controller.set('content', model);
	},
	renderTemplate: function () {
		//UI
		this.render('dimension2');
	},
	events: {
	}
})