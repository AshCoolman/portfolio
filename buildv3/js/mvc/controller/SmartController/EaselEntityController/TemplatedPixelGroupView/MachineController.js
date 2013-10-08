App.MachineController = App.TemplatedPixelGroupController.extend({
	className:'MachineController',
	label:'MachineController',
	targetController: null,
	isOn: false,
	isInteractive:false,
	CoggedPixelControllerCreated: function (apixelController) {
		this._super(apixelController);		
		var pixelEslObj = apixelController.get('view').addEventListener('eslObjCreated', function (me) {
			return function (e) {
				me.get('view').trySetPowerLed(e.eslObj, e.view.get('shp'));
				me.get('view').trySetActivityLed(e.eslObj, e.view.get('shp'));
			}
		}(this), false);
	},
	view_willDestroyElement: function () {
		this._super();
		this.set('isOn', false);
	},
	setTarget: function ( atarget) {
		this.set('targetController', atarget);
	},
	setInteractive: function (val) {
		if (!val) {
			this.set('isOn', false);
		}
		if ( val != this.get('isInteractive')) {
			this.set('isInteractive', val);
		}
	},
	
	togglePower: function ( ) {
		console.log('toggled power');
		this.set('isOn', !this.get('isOn'));
		if (this.get('isOn')) {
			this.send('doMachineTurnOn');
		} else {
			this.send('doMachineTurnOff');
		}
	},
	
	doActivateTarget: function () {
		var t = this.get('targetController');
		t && t.doActivate && t.doActivate();
	}
});
App.register('controller:machine', App.MachineController, {singleton: false});