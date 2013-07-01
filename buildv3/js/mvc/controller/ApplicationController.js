App.ApplicationController = Em.Controller.extend({
	className:'App.ApplicationController',
	currentRoute: null,
	notifyChange: function() {
	previousPath: undefined,
	Ember.run.schedule('afterRender', this, function() {
	      App.eventMapper.triggerEvent( ragh.MEvt.create('doRoute', {routePath:this.get('currentPath')}));
	    });
		//console.log('currentPath', this.get('currentPath'))
		if (App.transitionView) {
			switch (this.get('previousPath')+'>'+this.get('currentPath')) {
				case 'dimension2>dimension3': App.transitionView.show();	break;
				default: 	App.transitionView.hide();	break;
			} 
			console.log('PATH '+this.get('previousPath')+'>'+this.get('currentPath'));
		}
		this.set('previousPath', this.get('currentPath'));
  }.observes('currentPath')

});