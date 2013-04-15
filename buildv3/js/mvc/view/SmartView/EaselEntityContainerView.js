PortfolioApp.EaselEntityContainerView = Em.ContainerView.extend({
	templateName:'easel-entitiy-container',
	didInsertElement: function() {
		this._super();
		console.log('EaselEntityContainerView.didInsertElement()', this.get('controller'));
		this.get('controller').send('easelEntityContainerView_didInsertElement', this);
		this.get('controller').send('view_didInsertElement', this);
	}
});