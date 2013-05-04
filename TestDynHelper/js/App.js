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
			if (!controller.get('container')) {
				controller.set('container', options.data.keywords.controller.container)
			}
					console.log('container', controller.get('container'));
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

		

	    Ember.assert("ControlWithVars: Could not find controller for path: " + normalizedPath, childController);
	    Ember.assert("ControlWithVars: Could not find view for path: " + normalizedPath, childView);

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






//				APPLICATION
//==========================================
App = Ember.Application.create({
	rootElement:$('.container')[0],
	ready: function () {
		App.Router.map(function(){
		    this.route('index', {path:'/'});
		});
	}
});






//					ROUTE
//==========================================
App.IndexRoute = Em.Route.extend({
	
	events: {
		addDynamic: function () { 
			var dc = App.dynamicContainer;
			dc.pushObject( dc.createChildView(App.DynamicView, {}) );
			//App.dynamicContainer.pushObject(App.DynamicView.create({}));
		},
		addDynamicWithControl: function () {
			var dc = App.dynamicContainer;
			dc.pushObject( dc.createChildView(App.DynamicWithControlView, {}) );
		},
		addDynamicManualController: function () {
			var dc = App.dynamicContainer;
			dc.pushObject( dc.createChildView(App.DynamicView, { controller: App.DynamicController.create({}) }) );
		},
		addDynamicWithRenderManualController: function () {
			var dc = App.dynamicContainer;
			dc.pushObject( dc.createChildView( App.DynamicWithRenderView, { controller: App.DynamicWithRenderController.create({}) }) );
		},
		addDynamicWithControlManualController: function () {
			var dc = App.dynamicContainer;
			dc.pushObject( dc.createChildView( App.DynamicWithControlView, { controller: App.DynamicWithControlController.create({}) }) );
		}
	}	
});







//					VIEWS
//==========================================
App.StaticContainerView = Em.View.extend({
	templateName: 'static-container',
	didInsertElement: function () {
		this._super();
		$(this.get('element')).addClass(this.templateName);
		$(this.get('element')).addClass('box');
	}
	
})


App.DynamicContainerView = Em.ContainerView.extend({
	templateName: 'dynamic-container',
	didInsertElement: function () {
		App.dynamicContainer = this;
		this._super();
		$(this.get('element')).addClass(this.templateName);
		$(this.get('element')).addClass('box');
	}	
	
})


App.StaticView = Em.View.extend({
	templateName: 'static',
	didInsertElement: function() {
		this.get('controller').send('view_didInsertElement', 'static', this.templateName, this.get('controller')._debugContainerKey);
		$(this.get('element')).addClass(this.templateName);
		$(this.get('element')).addClass('thing');
	}
});


App.StaticWithRenderView = App.StaticView.extend({
    templateName: 'static-with-render'
});


App.StaticWithControlView = App.StaticView.extend({
    templateName: 'static-with-control'
});


App.DynamicView = Em.View.extend({
    templateName: 'dynamic',
	didInsertElement: function() {
		$(this.get('element')).addClass('thing');
		$(this.get('element')).addClass(this.templateName);
		this.get('controller').send('view_didInsertElement', 'dynamic', this.templateName, this.get('controller')._debugContainerKey);
		//need to delay, else it fires before 'view_didInsertElement
		setTimeout(function(me){
			return function () {
				me.get('controller').send('callDynamicController');
			}
		}(this), 200);
		
	}
});

 
App.DynamicWithRenderView = App.DynamicView.extend({
	templateName: 'dynamic-with-render'
})


App.DynamicWithControlView = App.DynamicView.extend({
	templateName: 'dynamic-with-control'
})


App.KnobView = Em.View.extend({});










//				CONTROLLER
//==========================================
App.IndexController = Em.ObjectController.extend({
	thingsAdded: [],
	thingsAddedStr: 'none',
	view_didInsertElement: function(thing, cssclass, acontroller) { 
		console.log('view did insert element');
		
		App.indexController = this;
		if (typeof acontroller != 'undefined') {
			this.thingsAdded.push('<span class="'+cssclass+'">'+thing+' ('+acontroller+')</span>');
		} else {
			this.thingsAdded.push('<span class="'+cssclass+'">'+thing+'</span>');	
		}
			this.set('thingsAddedStr', this.thingsAdded.join('<br/>'));
	}
})


App.DynamicController = Em.ObjectController.extend({
	className: 'App.DynamicWithRenderController',
	callDynamicController: function() {
		console.log('DynamicController.callDynamicController()');
	}	,
		view_didInsertElement: function(thing, cssclass) { 
			App.indexController.view_didInsertElement(thing, cssclass);
		}
})



App.DynamicWithRenderController = App.DynamicController.extend({
	className: 'App.DynamicWithRenderController',
	callDynamicController: function() {
		this._super();
	},
	view_didInsertElement: function(thing, cssclass) { 
		App.indexController.view_didInsertElement(thing, cssclass);
	}
});


App.DynamicWithControlController = App.DynamicController.extend({
	className: 'App.DynamicWithControlController',
	init: function () {
		console.log('DynamicWithControlController.init() ');
		return this._super();
	},
	callDynamicController: function() {
		this._super();
	},
	view_didInsertElement: function(thing, cssclass) { 
		App.indexController.view_didInsertElement(thing, cssclass);
	}
})


App.ThingHolderContainerController = Em.ObjectController.extend({});
App.register('controller:dynamic', App.DynamicController, {singleton:false});
App.register('controller:dynamic-with-control', App.DynamicWithControlController, {singleton:false});
App.register('controller:dynamic-with-render', App.DynamicWithRenderController, {singleton:false});


/*

App.StaticController =
App.ThingHolderController =
App.StaticWithRenderController = 
App.DynamicWithControlController = 
 App.DynamicController = 
App.KnobController =
*/

App.StaticWithControlController =
Em.ObjectController.extend({
	callDynamicController: function() {
		console.log('Holder Container callDynamicController()');
	}
}); 

