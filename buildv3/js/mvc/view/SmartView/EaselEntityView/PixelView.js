App.PixelView = App.EslEntityView.extend({
	label:'pixel',
	shp: null,
	handle: null,
	eslObjSettings: {
		width: 30,
		height: 30,
		x: 0,
		y: 0,
		fromController: ['x', 'y', 'width', 'height', 'col']
	},
	
	override_createEsl: function () {
		var shp, handle;
		this.set('shp', shp = new createjs.Shape());
		this.set('handle', handle = new createjs.Container());
		handle.addChild(shp);
		handle.addEventListener("mousedown",  (function(me) { return function(evt) {
					var o={x: evt.target.x-evt.stageX, y: evt.target.y-evt.stageY };
					evt.addEventListener("mousemove", function(ev) {
					   	ev.target.x = me.snap(ev.stageX + o.x);
						ev.target.y = me.snap(ev.stageY + o.y);
					});
			} }(this)));
		return handle;
	},
	
	override_draw: function(asettings) {
		Em.assert('App.PixelView.draw(): method can\'t run without eslObj being created. eslObj = '+ this.get('eslObj'), this.get('eslObj'));
		Em.assert('App.PixelView.draw(): method can\'t run without handle being created. handle = '+ this.handle, this.handle);
		Em.assert('App.PixelView.draw(): method can\'t run without shp being created. shp = '+ this.shp, this.shp);
		
		var settings = asettings ? asettings : this.get('eslObj'),
			shp = this.get('shp'),
			handle = this.get('handle'),
			col = asettings.col || '#FFFFFF';
			
		settings.x = Number(settings.x);	
		settings.y = Number(settings.y);
		//settings.height = Number(settings.height);	
	//	settings.width = Number(settings.width);
		Em.assert('App.PixelView.draw(): value of x in eslObj is not of type "number"', 	!isNaN(settings.x) );
		Em.assert('App.PixelView.draw(): value of y in eslObj is not of type "number"',  !isNaN(settings.y) );
		Em.assert('App.PixelView.draw(): value of width in eslObj is not of type "number" ' + settings.width, !isNaN(settings.width) );
		Em.assert('App.PixelView.draw(): value of height in eslObj is not of type "number" ' + settings.height,  !isNaN(settings.height) );
	
		shp.regX = settings.width / 2;
		shp.regY = settings.height / 2;
		shp.width = settings.width;
		shp.height = settings.height;
		shp.graphics.clear();
		shp.graphics.beginFill(col);
		shp.graphics.drawRect( 0, 0, shp.width, shp.height);
		
		handle.x = Number(settings.x);
		handle.y = Number(settings.y);
		
		
		this.set('handle', handle);
		this.set('shp', shp);

	},
	override_reDraw: function () {
		
	}
	
});