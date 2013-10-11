App.SmartView = Ember.View.extend({
	className: 'App.SmartView',
	mappedEvents:[],
	smartViewObj:null,
	el: null,
	$el: null,
	controllerAdded: function() {
		this.get('controller').send('view_didSetController', this);
	}.observes('controller'),
	init: function () {	
		smartViewObj = this;
		this._super();
		return this
	},

	didInsertElement: function (scope) {
		this._super();
		if (!scope) scope = this;
		this.set('el', this.get('element'));
		
		this.set('$el', $(this.get('el')));
		var el = $(this.get('el'));
		selector = '#'+el[0].id;
		if (this.get('layoutName') == 'lo-subtitle-instruction-row') {
			console.log(selector);
		}
		
		//selector = selector.split('#')[1];
		//selector = selector.split('.')[0]; 
		//this.set('$elOuterMost', this.get('layout') ? $(this.get('layout')) : this.get('$el')); 
		scope.$().addClass(scope.templateName);
		scope.get('controller').send('view_didInsertElement', this);
	},
	willDestroyElement: function () {
		this._super();
		this.get('controller').send('view_willDestroyElement', this);
		this.destroy();
	},


	addEventListener: function ( type, listener ) {
		if ( this._listeners === undefined ) this._listeners = {};
		var listeners = this._listeners;
		if ( listeners[ type ] === undefined ) {
			listeners[ type ] = [];
		}
		if ( listeners[ type ].indexOf( listener ) === - 1 ) {
			listeners[ type ].push( listener );
		}
	},

	hasEventListener: function ( type, listener ) {
		if ( this._listeners === undefined ) return false;
		var listeners = this._listeners;
		if ( listeners[ type ] !== undefined && listeners[ type ].indexOf( listener ) !== - 1 ) {
			return true;
		}
		return false;
	},

	removeEventListener: function ( type, listener ) {
		if ( this._listeners === undefined ) return;
		var listeners = this._listeners;
		var index = listeners[ type ].indexOf( listener );
		if ( index !== - 1 ) {
			listeners[ type ].splice( index, 1 );
		}
	},

	dispatchEvent: function ( event ) {
		if ( this._listeners === undefined ) return;
		var listeners = this._listeners;
		var listenerArray = listeners[ event.type ];
		if ( listenerArray !== undefined ) {
			event.target = this;
			for ( var i = 0, l = listenerArray.length; i < l; i ++ ) {
				listenerArray[ i ].call( this, event );
			}
		}
	}
});