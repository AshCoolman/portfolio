//http://jsfiddle.net/dain/NRjUb/

Ember.Handlebars.registerHelper('renderWithVars', function(name, contextString, options) { 
    Ember.assert("You must pass a template to render", arguments.length >= 2);
    var container, router, controller, view, context;

    if (arguments.length === 2) {
		console.log('arguments.length', arguments.length);
		options = contextString;
		contextString = undefined;
    }
	
	
    if (typeof contextString === 'string') { 
		context = Ember.Handlebars.get(options.contexts[1], contextString, options);
		$.extend(options.hash.controller, options.hash);
    }

    name = name.replace(/\//g, '.');
    container = options.data.keywords.controller.container;

    router = container.lookup('router:main');

    Ember.assert("This view is already rendered", !router || !router._lookupActiveView(name));
	
    view = container.lookup('view:' + name) || container.lookup('view:default');
	$.extend( options.hash.controller, options.hash); 
    if (controller = options.hash.controller) {
      controller = container.lookup('controller:' + controller);
    } else {
      controller = Ember.controllerFor(container, name, context);
    }
	
	$.extend(controller, options.hash);
	
    if (controller && context) {
      controller.set('model', context);
    }

    var root = options.contexts[1];

    if (root) { 
      view.registerObserver(root, contextString, function() {
        controller.set('model', Ember.Handlebars.get( root, contextString, options));
      });
    }

    controller.set('target', options.data.keywords.controller);

    options.hash.viewName = Ember.String.camelize(name);
    options.hash.template = container.lookup('template:' + name);
    options.hash.controller = controller;

    if (router) {
      router._connectActiveView(name, view);
    }
    Ember.Handlebars.helpers.view.call( this, view, options);
  });





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
