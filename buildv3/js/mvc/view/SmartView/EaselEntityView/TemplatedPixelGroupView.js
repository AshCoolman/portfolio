App.TemplatedPixelGroupView = App.EslEntityView.extend({
	templateName: 'templated-pixel-group',
	className: 'TemplatedPixelGroupView',
	label: 'templated-pixel-group',
	pixels: [],
	shp: null,
	handle: null,
	imgPreloadId: 'question-pixel',
	eslObjSettings: {
		width: App.PIXEL_SIZE,
		height: App.PIXEL_SIZE,
		x: 0,
		y: 0,
		fromController: ['x', 'y', 'width', 'height', 'visible']
	},
	didInsertElement: function () {
		this._super();
		var img = App.preloadedImages[this.get('imgPreloadId')],
			str = '\n'+this.get('imgPreloadId')+'\n';
		
		if (img) {
			var mapElementFunc = function (me) {
					return function (x, y, z, el, maxX, maxY, maxZ) {
					
						var x2d = (-15+(x+2)*App.PIXEL_SIZE),
							y2d = (240+(0.5-maxY+y)*App.PIXEL_SIZE);
						
						str += '{{controlWithVars "cogged-pixel" cogged-pixel x='+x2d+' y='+y2d+' height='+App.PIXEL_SIZE+' width='+App.PIXEL_SIZE+'}}\n'
					}
				}(this),
				onCompleteFunc = function (me) {
					return function (amap) {
						console.log('map is completed\n'+str)
					}
				}(this);
			ragh.createJsonMapFromImage(img, mapElementFunc, onCompleteFunc);
		}
	},
	
	doShowPixelInChildren: function (dur) {

		console.log('view.doShowPixelInChildren');
		this.handle.visible = true;
		var rIndexAr = [],
			pixels = this.handle.children,
			step = dur/pixels.length;
		
		for (var r=0; r < pixels.length; r++) rIndexAr.push(r);
		rIndexAr.sort(function() {return 0.5 - Math.random()})
		
		for (var c=0; c < this.handle.children.length; c++) {
			var r = rIndexAr[c];
			this.handle.children[r].visible = false;
			setTimeout( function (me, ar) {
				return function () {
					me.handle.children[ar].visible = true;
				}
			}(this, r), step*c);
		}
		
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
		Em.assert('App.PixelView.draw(): method can\'t run without eslObj being created. eslObj = '+ this.get('eslObj'), this.get('eslObj'));
		Em.assert('App.PixelView.draw(): method can\'t run without handle being created. handle = '+ this.handle, this.handle);
		Em.assert('App.PixelView.draw(): method can\'t run without shp being created. shp = '+ this.shp, this.shp);
		
		var settings = asettings ? asettings : this.get('eslObj'),
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
	
		if (App.DEBUG) {
			shp.graphics.beginFill('#FF0000');
			shp.graphics.drawRect( 0, 0, shp.width, shp.height);
		}
		handle.x = Number(settings.x);
		handle.y = Number(settings.y);
		handle.visible = settings.visible;
		//console.log('settings visible', settings.visible)
		this.handle = handle;
		this.shp = shp;

	},
	override_reDraw: function () {
		
	}
	
});