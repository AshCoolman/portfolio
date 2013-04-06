
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
  Ember.Handlebars.registerHelper('control', function(path, contextString, options) {
    if (arguments.length === 2) {
      options = modelPath;
      contextString = undefined;
    }
	
	/**
	  Lookup both on root and on window. If the path starts with
	  a keyword, the corresponding object will be looked up in the
	  template's data hash and used to resolve the path.

	  @method get
	  @for Ember.Handlebars
	  @param {Object} root The object to look up the property on
	  @param {String} path The path to be lookedup
	  @param {Object} options The template's option hash
	*/
	
    var model, context;
	
    if (typeof contextString === 'string') { 
		var parentObj = options.contexts[1];
		context = Ember.Handlebars.get(parentObj, contextString, options);
		$.extend(options.hash.controller, options.hash);
		console.log('model path === string', context, contextString, parentObj);
    } else if (contextString) {
      context = Ember.Handlebars.get(this, contextString, options);
    }


	
	var controller = options.data.keywords.controller
    var view = options.data.keywords.view,
        children = Em.get(controller, '_childContainers'),
        controlID = options.hash.controlID,
        container, subContainer;


	for (var k in options.hash) {
		console.log('>', k, options.hash[k])
		controller.set(k, options.hash[k]);
	}
	
    if (children.hasOwnProperty(controlID)) {
      subContainer = children[controlID];
    } else {
      container = Em.get(controller, 'container'),
      subContainer = container.child();
      children[controlID] = subContainer;
    }
	
    var normalizedPath = path.replace(/\//g, '.');

    var childView = subContainer.lookup('view:' + normalizedPath) || subContainer.lookup('view:default'),
        childController = subContainer.lookup('controller:' + normalizedPath),
        childTemplate = subContainer.lookup('template:' + path);

    Ember.assert("Could not find controller for path: " + normalizedPath, childController);
    Ember.assert("Could not find view for path: " + normalizedPath, childView);

    Em.set(childController, 'target', controller);
    Em.set(childController, 'context', context);

  

	options.hash.template = childTemplate;
    options.hash.controller = controller;
	
    function observer() {
      var model = Ember.Handlebars.get(this, modelPath, options);
      Em.set(childController, 'context', context);
      childView.rerender();
    }

    Ember.Handlebars.helpers.view.call(this, childView, options);

  });