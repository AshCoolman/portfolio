App.SmartContainerView = Ember.ContainerView.extend({
	className: 'App.SmartContainerView',
	mappedEvents:[],
	smartViewObj:null,
	el: null,
	$el: null,
	
	init: function () {	
		smartViewObj = this;
		return this._super();
	},
	
	didInsertElement: function (scope) {
		if (!scope) scope = this;
		this._super(scope);
		this.set('el', this.get('element'));
		this.set('$el', $(this.el)); 
		scope.$().addClass(scope.templateName);
		scope.get('controller').send('view_didInsertElement', this);
	},
	
	willDestroyElement: function () {
		this.get('controller').send('view_willDestroyElement', this);
	}
	
});