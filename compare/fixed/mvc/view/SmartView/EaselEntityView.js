App.EaselEntityView = App.SmartView.extend({
	easelObj: null,
	tag: 'span',
	className: 'EaselEntityView',
	easelObjSettings: {
		x: 0,
		y: 0,
		fromController: ['x', 'y'],
	},
	override_createEasel: function () {
		//throw 'EaselEntityView.override_createEasel() is a stub function. Must be overridden without a this._super() call';
		return null
	},
	override_draw: function(asettings) {
		//throw 'EaselEntityView.override_draw() is a stub function. Must be overridden without a this._super() call';
	},
	override_update: function () {
		//throw 'EaselEntityView.override_update() is a stub function. Must be overridden without a this._super() call';
	},
	didInsertElement: function () {
		this._super();
		this.easelObj = this.override_createEasel();
		this.initialDraw();			
		this.get('controller').send('view_easelObjCreated', this);
		this.dispatchEvent($.extend(new Event('easelObjCreated'), {view:this, easelObj:this.easelObj}));
	},
	initialDraw: function () {
		var controllerSettings = {},
			controller = this.get('controller'),
			fromController = this.easelObjSettings.fromController;
		for (var i = 0, s = fromController[i]; i < fromController.length; s = fromController[i+1+(i++)]) {
			if (controller[s])  {
				controllerSettings[s] = controller[s];
			}
		}	
		this.override_draw( $.extend({}, this.easelObjSettings, controllerSettings) );
	},
	willDestroyElement: function () {

	},
	snap: function (val) {
		return Math.round( val / 5) * 5;
	}
	
});