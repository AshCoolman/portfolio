
PortfolioApp = Ember.Application.create({
	rootElement:$('.portfolio-app-container')[0],
	ready: function () {
		PortfolioApp.Router.map(function(){
		    this.route('index', {path:'/'});
		    this.route('dimension1', {path:'/d1'});
		    this.route('dimension2', {path:'/d2'});
		});
	},
	eventMapper: ragh.EventMapper
});


Em.Object.reopenClass({
	create: function (config) {
		return this._super().setProperties(config);
	}
});
