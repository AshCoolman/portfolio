PortfolioApp.SmartView = Ember.View.extend({
	className: 'PortfolioApp.SmartView',
	mappedEvents:[],
	smartViewObj:null,
	init: function () {	
		smartViewObj = this;
		return this._super();
	},
	didInsertElement: function (scope) {
		if (!scope) scope = this;
		console.log(scope.className, 'didInsertElement', scope);
		scope.$().addClass(scope.templateName);
		scope.get('controller').send('view_didInsertElement', this);
	},
	willDestroyElement: function () {
		this.get('controller').send('view_willDestroyElement', this);
	}
});