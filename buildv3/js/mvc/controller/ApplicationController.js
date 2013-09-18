App.ApplicationController = Em.Controller.extend({
	className:'App.ApplicationController',
	currentRoute: null,
	notifyChange: function() {
	previousPath: undefined,
	Ember.run.schedule('afterRender', this, function() {
	      App.eventMapper.triggerEvent( ragh.MEvt.create('doRoute', {routePath:this.get('currentPath')}));
	    });
		console.log('currentPath', this.get('currentPath'))
		
		switch (this.get('currentPath')) {
			case 'index':
			console.log('offing everything', $('.x-ruler'))
				$('.x-ruler').css('display', 'none');
				$('.y-ruler').css('display', 'none');
				break;
			case 'dimension1':
				$('.x-ruler').css('display', 'block');
				$('.y-ruler').css('display', 'none');
				break;
			case 'dimension2':
				$('.x-ruler').css('display', 'block');
				$('.y-ruler').css('display', 'block');
				break;
			case 'dimension3':
				$('.x-ruler').css('display', 'block');
				$('.y-ruler').css('display', 'block');
				break;
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