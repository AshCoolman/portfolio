App.PixelView = App.EaselEntityView.extend({
	label:'pixel',
	shp: null,
	handle: null,
	gridSnap: 10,
	
	easelObjSettings: {
		width: 20,
		height: 20,
		x: 0,
		y: 0
	},
	
	didInsertElement: function () {
		this._super();
		this.createEasel();
		this.initialDraw();			
		this.get('controller').send('view_easelObjCreated', this);
	},
	
	createEasel: function () {
		this.shp = new createjs.Shape();
		this.handle = new createjs.Container();
		this.handle.addChild(this.shp);
		this.handle.addEventListener("mousedown",  (function(me) { return function(evt) {
					var o={x: evt.target.x-evt.stageX, y: evt.target.y-evt.stageY };
					evt.addEventListener("mousemove", function(ev) {
					   	ev.target.x = me.snap(ev.stageX + o.x);
						ev.target.y = me.snap(ev.stageY + o.y);
					});
			} }(this)));
		return this.easelObj = this.handle;
	},
	
	initialDraw: function () {
		var controller = this.get('controller'),
			controllerSettings = {};
		if (controller.x) controllerSettings.x = controller.x;
		if (controller.y) controllerSettings.y = controller.y;
		if (controller.width) controllerSettings.width = controller.width;
		if (controller.height) controllerSettings.height = controller.height;
		this.draw( $.extend(this.easelObjSettings, controllerSettings) );
	},
	
	draw: function(asettings) {
		Em.assert('App.PixelView.draw(): method can\'t run without easelObj being created. easelObj = '+ this.easelObj, this.easelObj);
		Em.assert('App.PixelView.draw(): method can\'t run without handle being created. handle = '+ this.handle, this.handle);
		Em.assert('App.PixelView.draw(): method can\'t run without shp being created. shp = '+ this.shp, this.shp);
		
		var settings = asettings ? asettings : this.easelObj,
			shp = this.shp,
			handle = this.handle;
			
		Em.assert('App.PixelView.draw(): value of x in easelObj is not of type "number"', (typeof settings.x == 'number'));
		Em.assert('App.PixelView.draw(): value of y in easelObj is not of type "number"', (typeof settings.y == 'number'));
		Em.assert('App.PixelView.draw(): value of width in easelObj is not of type "number" ' + settings.width, (typeof settings.width == 'number'));
		Em.assert('App.PixelView.draw(): value of height in easelObj is not of type "number" ' + settings.height, (typeof settings.height == 'number'));
	
		shp.regX = - settings.width / 2;
		shp.regY = - settings.height / 2;
		shp.width = settings.width;
		shp.height = settings.height;
		shp.graphics.clear();
		shp.graphics.beginFill('#FFFFFF');
		shp.graphics.drawRect( 0, 0, shp.width, shp.height);
		
		handle.x = Number(settings.x);
		handle.y = Number(settings.y);
		
		this.handle = handle;
		this.shp = shp;

	},
	redraw: function () {
		
	},
	snap: function (val) {
		return Math.round( val / this.gridSnap) * this.gridSnap;
	}
	
});