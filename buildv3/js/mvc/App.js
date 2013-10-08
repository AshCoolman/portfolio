Ember.Handlebars.registerHelper('controlWithVars', function(path, modelPath, options) {
    if (arguments.length === 2) {
      options = modelPath;
      modelPath = undefined;
    }

    var model;

    if (modelPath) {
      model = Ember.Handlebars.get(this, modelPath, options);
    }

    var controller = options.data.keywords.controller,
        view = options.data.keywords.view,
        children = Em.get(controller, '_childContainers'),
        controlID = options.hash.controlID,
        container, subContainer; 

    if (children.hasOwnProperty(controlID)) {
      subContainer = children[controlID];
    } else {
      container = controller.get('container'),
      subContainer = container.child();
      children[controlID] = subContainer;
    }

    var normalizedPath = path.replace(/\//g, '.');

    var childView = subContainer.lookup('view:' + normalizedPath) || subContainer.lookup('view:default'),
        childController = subContainer.lookup('controller:' + normalizedPath),
        childTemplate = subContainer.lookup('template:' + path);
		
		
		if (!window['controller']) window['controller'] = 0;

		for (var k in options.hash) {
			//TODO test if typeof Ember.Controller 	//childController.set(k, val);
			childController[k]=options.hash[k]; //TODO test if typeof Ember.ObjectController
		}

		

    Ember.assert("Could not find controller for path: " + normalizedPath, childController);
    Ember.assert("Could not find view for path: " + normalizedPath, childView);

    Em.set(childController, 'target', controller);
    Em.set(childController, 'model', model);

    options.hash.template = childTemplate;
    options.hash.controller = childController;

    function observer() {
      var model = Ember.Handlebars.get(this, modelPath, options);
      set(childController, 'model', model);
      childView.rerender();
    }

    Ember.addObserver(this, modelPath, observer);
    childView.one('willDestroyElement', this, function() {
      Ember.removeObserver(this, modelPath, observer);
    });

    Ember.Handlebars.helpers.view.call(this, childView, options);
  });





//http://stackoverflow.com/questions/14667727/rendering-a-partial-multiple-times-in-ember
  /**
    The control helper is currently under development and is considered experimental.
    To enable it, set `ENV.EXPERIMENTAL_CONTROL_HELPER = true` before requiring Ember.

    @method control
    @for Ember.Handlebars.helpers
    @param {String} path
    @param {String} modelPath
    @param {Hash} options
    @return {String} HTML string
  */
Ember.Handlebars.registerHelper('controlWithVarsold', function(path, contextString, options) {		
	var model, context, view, controller, parentObj, container, subContainer, childContainers;	
    var normalizedPath = path.replace(/\//g, '.');

	console.log('controlWithVars', path);
	console.log('>path', path);
	console.log('>contextString', contextString);
	console.log('>options', options);
	console.log('>container',  options.data.keywords.controller.container);
	console.log('keywords>', options.data.keywords);
	
    if (arguments.length === 2) {
      options = contextString;
      contextString = undefined;
    }

    container = options.data.keywords.controller.container;

    if (typeof contextString === 'string') { 
		parentObj = options.contexts[1];
		context = Ember.Handlebars.get(parentObj, contextString, options);
		
		console.log('>(contextString is string) context', context);
    } else if (contextString) {
		context = Ember.Handlebars.get(this, contextString, options);
    }
	
    if (controller = options.hash.controller) {
      //controller = container.lookup('controller:' + controller);
    } else {
      controller = Ember.controllerFor(container, normalizedPath, context);
    } 

	view = options.data.keywords.view;
	
	childContainers = Em.get(controller, '_childContainers'),
    controlID = options.hash.controlID;
	
    if (childContainers.hasOwnProperty(controlID)) {
		subContainer = childContainers[controlID];
    } else {
		container = Em.get(controller, 'container'),
		subContainer = container.child();
		childContainers[controlID] = subContainer;
    }
    var childView = subContainer.lookup('view:' + normalizedPath) || subContainer.lookup('view:default'),
        childController = subContainer.lookup('controller:' + normalizedPath),
        childTemplate = subContainer.lookup('template:' + path);
		
		

		for (var k in options.hash) {
			childController.set(k, options.hash[k]);
		}
		
		console.log('view?', view)
		console.log('childView?', childView)
		console.log('childController?', childController)
		
    Ember.assert("Could not find controller for path: " + normalizedPath, childController);
    Ember.assert("Could not find view for path: " + normalizedPath, childView);

	
    Em.set(childController, 'target', controller);
    Em.set(childController, 'context', context);

	options.hash.template = childTemplate;
    options.hash.controller = controller;
	/*
    function observer() {
      var model = Ember.Handlebars.get(this, modelPath, options);
      Em.set(childController, 'context', context);
      childView.rerender();
    }

  
    Ember.addObserver(this, contextString, observer);

    childView.one('willDestroyElement', this, function() {
      Ember.removeObserver(this, modelPath, observer);
    });
	*/
	console.log('adding via view:', childView);
    Ember.Handlebars.helpers.view.call(this, childView, options);

  });


//http://jsfiddle.net/dain/NRjUb/
Ember.Handlebars.registerHelper('renderWithVars', function(name, contextString, options) { 
    Ember.assert("You must pass a template to render", arguments.length >= 2);
    var container, router, controller, view, context;

    if (arguments.length === 2) {
		options = contextString;
		contextString = undefined;
    }
	
	
    if (typeof contextString === 'string') { 
		context = Ember.Handlebars.get(options.contexts[1], contextString, options);
		//$.extend(options.hash.controller, options.hash);
    }

    name = name.replace(/\//g, '.');
    container = options.data.keywords.controller.container;

    router = container.lookup('router:main');

    Ember.assert("This view is already rendered", !router || !router._lookupActiveView(name));
	
    view = container.lookup('view:' + name) || container.lookup('view:default');
	$.extend( options.hash.controller, options.hash); 
    if (controller = options.hash.controller) {
		
      controller = container.lookup('controller:' + controller);
		console.log('controller')
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

    //controller.set('target', options.data.keywords.controller);

    options.hash.viewName = Ember.String.camelize(name);
    options.hash.template = container.lookup('template:' + name);
    options.hash.controller = controller;

    if (router) {
      router._connectActiveView(name, view);
    }
    Ember.Handlebars.helpers.view.call( this, view, options);
  });




createjs.CSSPlugin.install();
//createjs.Ticker.addEventListener = createjs.EventDispatcher.prototype.addEventListener;

App = Ember.Application.create({
	DEBUG: false,
	PRELOADER: {},
	preloadedImages:{},
	scriptModel: null,
	rootElement:$('.app')[0],
	ready: function () {
		
		App.scriptModel = App.ScriptModel.create({});
		
		App.Router.map(function(){
		    this.route('index', {path:'/'});
		    this.route('dimension1', {path:'/d1'});
		    this.route('dimension2', {path:'/d2'});
		    this.route('dimension3', {path:'/d3'});
		});
		
	},
	readyAndLoaded: function () {
		console.log('readyAndLoaded')

	},
	eventMapper: ragh.eventMapper,
	colors: ['#FF0000', '#993366', '#3399CC', '#0099FF', '#00CC33', '#00FF00']
});


App.BREAKPOINT = {
	WIDTH_2: 1200 ,
	HEIGHT_2: 600,
	WIDTH_1: 800,
	HEIGHT_1: 400,
	WIDTH_0: 600,
	HEIGHT_0: 300
}
App.PIXEL_SIZE = 30;

App.dictionary = Em.Object.create({
	copy: {},
	isReady: false,
	init: function() {
		App.eventMapper.addEventListener('preloaderIsLoaded', this, function(me) {
			return function(type, data) {
				var allLines = data.target.getResult('copy').split('=\n');
				allLines = allLines.splice( 1, allLines.length - 1 );
				var obj = allLines.forEach( function(el, index, ar) {
					var lines = el.split('\n');
					var heading = lines.splice(0, 1);
					me.copy[heading[0]] = lines.join('\n');
					//console.log('dictionary read', heading[0], '\n', lines.join('\n'))
				});
				me.isReady = true;
				App.eventMapper.trigger('isDictionaryReady');
			}
		}(this));
	}
});

Em.Object.reopenClass({
	create: function (config) {
		return this._super().setProperties(config);
	}
});



App.KnobController = 
Em.ObjectController.extend({
	callDynamicController: function() {
		console.log('.callDynamicController()');
	}
});


App.KnobView = Em.View.extend({
	templateName: 'knob'
});


if (App.DEBUG) {
	var stats = new Stats();
	stats.setMode(1); // 0: fps, 1: ms

	// Align top-left
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';

	document.body.appendChild( stats.domElement );

	setInterval( function () {

	    stats.begin();

	    // your code goes here

	    stats.end();

	}, 1000 / 60 );
	
	
	

	
	
}
