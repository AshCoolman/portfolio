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
	console.log('>>>>controller', controller._debugContainerKey, controller);
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


  Ember.Handlebars.registerHelper('control', function(path, modelPath, options) {
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
    Em.set(childController, 'model', model);

    options.hash.template = childTemplate;
    options.hash.controller = childController;

    function observer() {
      var model = Ember.Handlebars.get(this, modelPath, options);
      Em.set(childController, 'model', model);
      childView.rerender();
    }

    Ember.addObserver(this, modelPath, observer);
    childView.one('willDestroyElement', this, function() {
      Ember.removeObserver(this, modelPath, observer);
    });

    Ember.Handlebars.helpers.view.call(this, childView, options);
  });




window.logit = function(str) {
	$('.logit-old').html(
		$('.logit-new').text() + 
		$('.logit-old').html());
		
	$('.logit-new').html(str);

}
App = Ember.Application.create({
	rootElement:$('.container')[0],
	ready: function () {
		App.Router.map(function(){
		    this.route('index', {path:'/'});
		});
	}
});


App.IndexController = Em.ObjectController.extend({
	thingsAdded: [],
	thingsAddedStr:'none',
	view_didInsertElement: function(thing) { 
		console.log('viewDidInsertElement index')
		this.thingsAdded.push(thing);	
		this.set('thingsAddedStr', this.thingsAdded.join(', '));
	}
})


App.IndexRoute = Em.Route.extend({
	events: {
		didInsertElement: function() {
			console.log('IndexRoute inserted element')
		}
	}
})




App.ThingHolderView = Em.View.extend({
	templateName: 'thing-holder',
	didInsertElement: function () {
		this._super();
		$(this.get('element')).addClass(this.templateName);
		$(this.get('element')).addClass('box');
	}	
	
})

App.ThingHolderContainerView = Em.ContainerView.extend({
	templateName: 'thing-holder-container',
	didInsertElement: function () {
		this._super();
		$(this.get('element')).addClass(this.templateName);
		$(this.get('element')).addClass('box');
        
        setTimeout(function(me) {
            return function() {
		        me.pushObject(App.DynamicThingView.create({}))
			}
        }(this), 1000);
        setTimeout(function(me) {
            return function() {
		       me.pushObject(App.DynamicThingView.create({ controller: App.DynamicThingController.create({}) }));
            }
        }(this), 1300);

		

        setTimeout(function(me) {
            return function() {
		        me.pushObject(App.DynamicThingView.create({templateName:'dynamic-thing-with-control' }));
            }
        }(this), 3000);
        setTimeout(function(me) {
            return function() {
		       // me.pushObject(App.DynamicThingView.create({templateName:'dynamic-thing-with-control', controller: App.DynamicThingController.create({}) }));
            }
        }(this), 3300);


        setTimeout(function(me) {
            return function() { me.pushObject(App.DynamicThingWithControlView.create({}));
            }
        }(this), 4000);
        setTimeout(function(me) {
            return function() { 
				//me.pushObject(App.DynamicThingWithControlView.create({controller:Em.ObjectController.create({})}));
            }
        }(this), 4300);

	}	
	
})


App.StaticThingView = Em.View.extend({
	templateName: 'static-thing',
	didInsertElement: function() {
		this.get('controller').send('view_didInsertElement', 'static');
		$(this.get('element')).addClass('thing');
	}
});

App.StaticThingWithRenderView = App.StaticThingView.extend({
    templateName: 'static-thing-with-render'
});


App.StaticThingWithControlView = App.StaticThingView.extend({
    templateName: 'static-thing-with-control'
});




App.DynamicThingView = Em.View.extend({
    templateName: 'dynamic-thing',
	didInsertElement: function() {
		$(this.get('element')).addClass('thing');
		this.get('controller').send('view_didInsertElement', 'dynamic');
		this.get('controller').send('callDynamicController');
	}
});

 

App.DynamicThingWithRenderView = App.DynamicThingView.extend({
	templateName: 'dynamic-thing-with-render',
})

App.DynamicThingWithControlView = App.DynamicThingView.extend({
	templateName: 'dynamic-thing-with-control',
})


App.DynamicThingController = Em.ObjectController.extend({
	callDynamicController: function() {
		console.log('DynamicThingController.callDynamicController()');
	}
})

App.DynamicThingWithControlController = App.DynamicThingController.extend({
	callDynamicController: function() {
		this._super();
		console.log('DynamicThingWithControlController.callDynamicController()');
	}
})

App.KnobView = Em.View.extend({});

/**/
/*App.ThingHolderContainerController = 
App.ThingHolderController =
App.StaticThingWithRenderController = 
App.StaticThingWithControlController = 
App.StaticThingController = 
App.DynamicThingWithControlController = 
 App.DynamicThingController = 
App.KnobController = */
Em.ObjectController.extend({
	callDynamicController: function() {
		console.log('.callDynamicController()');
	}
});

