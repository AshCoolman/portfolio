App.TransitionsHolderView = App.SmartContainerView.extend({
	className: 'TransitionsHolderView',
	templateName: 'transitions-holder',
	tagName: 'div', /*IE work around http://stackoverflow.com/questions/9385213/how-to-make-internet-explorer-emulate-pointer-eventsnone*/
	didInsertElement: function() {
		this._super();
	},
	
	doTransition: function() {
		console.log('doTransition');
		this.pushObject( App.TransitionView.create( { controller: App.TransitionController.create() }));
	}
})