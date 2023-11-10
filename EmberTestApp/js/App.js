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
	viewDidInsertElement: function(thing) { 
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


App.ThingHolderController = Em.ObjectController.extend({
});

App.ThingHolderContainerController = Em.ObjectController.extend({
});

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
		this.pushObject(App.DynamicThingView.create({controller: Em.ObjectController.create()}));
	}	
	
})


App.StaticThingView = Em.View.extend({
	templateName: 'static-thing',
	didInsertElement: function() {
		this.get('controller').send('viewDidInsertElement', 'static');
		$(this.get('element')).addClass('thing');
	}
});


App.DynamicThingView = Em.View.extend({
	template: Em.Handlebars.compile('Dynamic Thing'),
	didInsertElement: function() {
		console.log('DynamicThingView didInsertElement')
		this.get('controller').send('viewDidInsertElement', 'dynamic');
		$(this.get('element')).addClass('thing');
	}
});
