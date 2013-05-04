App.QuestionMarkView = App.EslEntityView.extend({
	templateName: 'question-mark',
	className: 'QuestionMarkView',
	label: 'question-mark',
	shp: null,
	handle: null,
	eslObjSettings: {
		width: 30,
		height: 30,
		x: 0,
		y: 0,
		fromController: ['x', 'y', 'width', 'height', 'visible']
	},
	
	override_createEsl: function () {
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
		Em.assert('App.PixelView.draw(): method can\'t run without eslObj being created. eslObj = '+ this.eslObj, this.eslObj);
		Em.assert('App.PixelView.draw(): method can\'t run without handle being created. handle = '+ this.handle, this.handle);
		Em.assert('App.PixelView.draw(): method can\'t run without shp being created. shp = '+ this.shp, this.shp);
		
		var settings = asettings ? asettings : this.eslObj,
			shp = this.shp,
			handle = this.handle;
			
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
		shp.graphics.beginFill('#FF0000');
		shp.graphics.drawRect( 0, 0, shp.width, shp.height);
		
		handle.x = Number(settings.x);
		handle.y = Number(settings.y);
		handle.visible = settings.visible;
		console.log('settings visible', settings.visible)
		this.handle = handle;
		this.shp = shp;

	},
	override_redraw: function () {
		
	}
	
});