App.World3dController = App.SmartController.extend({
	className: 'World3dController',
	label: 'World3dController',
	isQuestionMarkRotating: false,
	isQuestionMarkRotatingHint:false,
	doQuestionMarkRotate: function () {
		console.log('controller knows it is rotate time')
		this.set('isQuestionMarkRotating', true);
	},
	
	doRotateQuestionMarkHint: function () {
		console.log('doQuestionMarkRotateHint')
		this.set('isQuestionMarkRotatingHint', true)
	},
	
	view_doQuestionMarkRotateDone: function () {
		this.set('isQuestionMarkRotating', false);
		this.send('doQuestionMarkRotateDone');		
	}
	
})

App.register('controller:world-3d', App.World3dController, {singleton:false});