App.MachineController = App.TemplatedPixelGroupController.extend({
	className:'MachineController',
	label:'MachineController',
	targetController: null,
	isOn: false,
	isInteractive:false,
	coggedPixelCreatedFunc:null,
	CoggedPixelControllerCreated: function (apixelController) {
		this._super(apixelController);		
		var pixelView = apixelController.get('view'),
			coggedPixelCreatedFunc = this.get('coggedPixelCreatedFunc');
		
		if (!coggedPixelCreatedFunc) {
			coggedPixelCreatedFunc = function (me) {
				return function (e) {
				if (e.eslObj.on('click', function (me) {
					return function () {
						console.log(me.eslObj);
					}
				}))
					me.get('view').trySetPowerLed(e.eslObj, e.view.get('shp'));
					me.get('view').trySetActivityLed(e.eslObj, e.view.get('shp'));
				}
			}(this);
			this.set('coggedPixelCreatedFunc', coggedPixelCreatedFunc);
		}
		
		pixelView.addEventListener('eslObjCreated', coggedPixelCreatedFunc, false);
		this.set('coggedPixelCreatedFunc', coggedPixelCreatedFunc)
	},
	view_willDestroyElement: function () {
		this._super();
		var pixels = this.get('pixels'),
			coggedPixelCreatedFunc = this.get('coggedPixelCreatedFunc');
		for (var p  = 0; p < pixels.length; p++) {
			pixels[p].removeEventListener('eslObjCreated', coggedPixelCreatedFunc);
		}
		this.set('isOn', false);
		this.set('isInteractive', false);
		this.set('targetController', null);
		
		
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