App.ApplicationController = Em.Controller.extend({
	className: 'App.ApplicationController',
	currentRoute: null,
	notifyChange: function () {
	previousPath: undefined,
	Ember.run.schedule('afterRender', this, function() {
	      App.eventMapper.trigger('doRoute', {routePath:this.get('currentPath')});
	    });
		console.log('currentPath', this.get('currentPath'))
		
		switch (this.get('currentPath')) {
			case 'index': 		App.eventMapper.trigger('doHideRulers'); break;
			case 'dimension1':	App.eventMapper.trigger('doShowRulerX'); break;
			case 'dimension2':	App.eventMapper.trigger('doShowRulerY'); break;
			case 'dimension3':	App.eventMapper.trigger('doShowRulerY'); break;
		}
		
		if (App.transitionView) {
			switch (this.get('previousPath')+'>'+this.get('currentPath')) {
				case 'dimension2>dimension3': App.transitionView.show();	break;
				default: App.transitionView.hide();	break;
			} 
		}
		this.set('previousPath', this.get('currentPath'));
  }.observes('currentPath')

});