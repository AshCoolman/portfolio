App.ApplicationController = Em.Controller.extend({
	className:'App.ApplicationController',
	currentRoute: null,
	notifyChange: function() {
   // window.document.title = this.controllerFor(this.currentPath).get('title');
	Ember.run.schedule('afterRender', this, function() {
	      App.eventMapper.triggerEvent( ragh.MEvt.create('doRoute', {routePath:this.get('currentPath')}));
	    });
		
		console.log('currentPath', this.get('currentPath'))
  }.observes('currentPath')
});