PortfolioApp.Dimension1Route = Em.Route.extend({
	subtitleView:null, 
	subtitleController:null,
	scriptModel:null,
	init: function () {
		this._super();
	},
	model: function () {
		return (PortfolioApp.dimension1Model) ? PortfolioApp.dimension1Model : PortfolioApp.Dimension1Model.create();
	},
	activate: function () { 
		//Application state
		scriptModel = PortfolioApp.ScriptModel.create({});
	},
	deactivate: function () {
		scriptModel.destroy();
	},
	setupController: function (controller, model) {
		controller.set('content', model);
	},
	renderTemplate: function () {
		//UI
		this.render('dimension1');
	},
	events: {
		SubtitleView_InsertViewDone: function (achildview, another) {
			if ('Subtitle' == achildview.name) {
				subtitleView = achildview;
				subtitleController = subtitleView.get('controller');
				subtitleController.set('content', scriptModel);
				
			}
		}
	}
})