App.World3dController = App.SmartController.extend({
	className: 'World3dController',
	modernizr: Modernizr,
	label: 'World3dController',
	isQuestionMarkRotating: false,
	isQuestionMarkRotatingHint:false,
	doQuestionMarkRotate: function () {
		
		if (Modernizr.webgl) this.set('isQuestionMarkRotating', true);
	},
	
	doRotateQuestionMarkHint: function () {
		if (Modernizr.webgl) this.set('isQuestionMarkRotatingHint', true)
	},
	
	view_doQuestionMarkRotateDone: function () {
		if (Modernizr.webgl) {
			this.set('isQuestionMarkRotating', false);
			this.send('doQuestionMarkRotateDone');
		}		
	}
	
})

App.register('controller:world-3d', App.World3dController, {singleton:false});