App.PixelView = App.EaselEntityView.extend({
	label:'pixel',
	shp: null,
	handle: null,
	easelObjSettings: {
		width: 30,
		height: 30,
		x: 0,
		y: 0,
		fromController: ['x', 'y', 'width', 'height']
	},
	
	override_createEasel: function () {
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
		return this.handle;
	},
	
	override_draw: function(asettings) {
		Em.assert('App.PixelView.draw(): method can\'t run without easelObj being created. easelObj = '+ this.easelObj, this.easelObj);
		Em.assert('App.PixelView.draw(): method can\'t run without handle being created. handle = '+ this.handle, this.handle);
		Em.assert('App.PixelView.draw(): method can\'t run without shp being created. shp = '+ this.shp, this.shp);
		
		var settings = asettings ? asettings : this.easelObj,
			shp = this.shp,
			handle = this.handle;
			
		settings.x = Number(settings.x);	
		settings.y = Number(settings.y);
		//settings.height = Number(settings.height);	
	//	settings.width = Number(settings.width);
		Em.assert('App.PixelView.draw(): value of x in easelObj is not of type "number"', 	!isNaN(settings.x) );
		Em.assert('App.PixelView.draw(): value of y in easelObj is not of type "number"',  !isNaN(settings.y) );
		Em.assert('App.PixelView.draw(): value of width in easelObj is not of type "number" ' + settings.width, !isNaN(settings.width) );
		Em.assert('App.PixelView.draw(): value of height in easelObj is not of type "number" ' + settings.height,  !isNaN(settings.height) );
	
		shp.regX = settings.width / 2;
		shp.regY = settings.height / 2;
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
	override_redraw: function () {
		
	}
	
});