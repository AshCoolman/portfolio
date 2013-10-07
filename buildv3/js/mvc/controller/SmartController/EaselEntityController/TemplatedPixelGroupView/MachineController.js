App.MachineController = App.TemplatedPixelGroupController.extend({
	className:'MachineController',
	label:'MachineController',
	targetController: null,
	isOn: false,
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
	doActivateTarget: function () {
		var t = this.get('targetController');
		t && t.doActivate && t.doActivate();
	}
});
App.register('controller:machine', App.MachineController, {singleton: false});