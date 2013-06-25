App.EslEntityView = App.SmartView.extend({
	eslObj: null,
	tag: 'span',
	className: 'EslEntityView',
	parentEslObj: null,
	eslObjSettings: {
		x: 0,
		y: 0,
		fromController: ['x', 'y']
	},
	override_createEsl: function () {
		throw 'EslEntityView.override_createEsl() is a stub function. Must be overridden without a this._super() call';
		return null
	},
	override_draw: function(asettings) {
		throw 'EslEntityView.override_draw() is a stub function. Must be overridden without a this._super() call';
	},
	override_update: function () {
		throw 'EslEntityView.override_update() is a stub function. Must be overridden without a this._super() call';
	},
	didInsertElement: function () {
		this._super();
		this.eslObj = this.override_createEsl();
		if (this.get('parentView').eslObj) {
			this.parentEslObj = this.get('parentView').eslObj;
		}
		this.initialDraw();		
		this.get('controller').send('view_eslEntityCreated', this.get('controller'));
		this.dispatchEvent($.extend(new Event('eslObjCreated'), {view:this, eslObj:this.eslObj, parentEslObj: this.parentEslObj}));
	},
	initialDraw: function () {
		
		var controllerSettings = {},
			eslObjSettings = this.get('eslObjSettings'),
			controller = this.get('controller'),
			fromController = eslObjSettings.fromController;
			
			
		for (var i = 0, s = fromController[i]; i < fromController.length; i++) {
			 s = fromController[i];
			//console.log('from controller', this.get('className'), s, controller[s]);
			
			if (typeof controller[s] != 'undefined')  {
				controllerSettings[s] = controller[s];
			}
		}	
		//console.log('this.override_draw()', eslObjSettings, controllerSettings );
		this.override_draw( $.extend({}, eslObjSettings, controllerSettings) );
	},
	willDestroyElement: function () {

	},
	snap: function (val) {
		return Math.round( val / 5) * 5;
	}
	
});