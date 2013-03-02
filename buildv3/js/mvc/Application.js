
App = Ember.Application.create({
	rootElement:$('.application-container')[0]
});

App.ApplicationView = Ember.View.extend({
  templateName: 'application'
});
App.ApplicationController = Ember.Controller.extend({
	name:'test name'
});


App.Router.map(function(){
	console.log('routing App')
    this.route('index', {path:'/'});
    this.route('contributors', {path:'/con'});
});

App.ApplicationRoute = Em.Route.extend({
	model: function(){
		console.log('ApplicationRoute.model()')
	}
});

App.IndexRoute = Em.Route.extend({
	model:function() { 
		console.log('IndexRoute.model()');
	 	return [{login:'wycats'},{login:'tomdale'}];
	},
	activate: function() {
		console.log('IndexRoute.activate()');
	},
	render: function() {
		console.log('IndexRoute.render()');
	},
	renderTemplate: function() {
		var controlller = App.SimpleBtnController.create({});
		var btn = App.SimpleBtnView.create({controller:controlller}).appendTo('.application-container');
		console.log('IndexRoute.renderTemplate()', btn.controller, controlller);

	}
})

App.ContributorsRoute = Ember.Route.extend({
	model:function() { return [{login:'wycats'},{login:'tomdale'}]}
});

 
App.AllContributorsController = Ember.ArrayController.extend();
App.AllContributorsView = Ember.View.extend({
  templateName: 'contributors'
});





App.SimpleBtnController = Em.Controller.extend({
	doStart:function() {console.log('clicked')}
});
App.SimpleBtnView = Ember.View.extend({
  templateName: 'simple-btn'
});


