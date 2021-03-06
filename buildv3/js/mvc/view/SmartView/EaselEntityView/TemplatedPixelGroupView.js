App.TemplatedPixelGroupView = App.EslEntityView.extend({
	templateName: 'templated-pixel-group',
	className: 'TemplatedPixelGroupView',
	label: 'templated-pixel-group',
	isCreateFromImage: false,
	pixelHash: {},
	pixelsFromImgMap: null,
	pixelsFromImgList: null,
	//TODO Improve coord system, then use pixel cords
	addPixel: function (pixCon) {
		var pixelHash = this.get('pixelHash'),
			mapX = String( pixCon.x ),
			mapY = String( pixCon.y );
		if (!pixelHash[mapX]) pixelHash[mapX] = {};
		pixelHash[mapX][mapY] = pixCon;
		this.set('pixelhash', pixelHash);
	},
	removePixel: function (pixCon) {
		var pixelHash = this.get('pixelHash'),
			mapX = String( pixCon.x ),
			mapY = String( pixCon.y );
			coordArr = pixelHash[mapX][mapY];
		coordArr.splice(coordArr.indexOf(pixCon), 1);
		this.set('pixelhash', pixelHash);
	},
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
		
		//create string for template
		if (img) {
			var mapElementFunc = function (me) {
					return function (x, y, z, el, maxX, maxY, maxZ) {
						
						var x2d = (App.USER_X+(x+2)*App.PIXEL_SIZE),
							y2d = (App.USER_Y+(0.5-maxY+y)*App.PIXEL_SIZE);
						
						str += '{{controlWithVars "cogged-pixel" cogged-pixel x='+x2d+' y='+y2d+' height='+App.PIXEL_SIZE+' width='+App.PIXEL_SIZE+' col="'+el.color+'"}}\n'
						el.x2d = x2d;
						el.y2d = y2d;
						
						if (me.get('isCreateFromImage')) {
							
							var pixelsFromImgList = me.get('pixelsFromImgList') || [],
								container = new createjs.Container(),
								shp = new createjs.Shape();
								
							container.addChild(shp);
							shp.width = App.PIXEL_SIZE;
							shp.height = App.PIXEL_SIZE;
							shp.graphics.clear();
							shp.graphics.beginFill(el.color);
							shp.graphics.drawRect( 0, 0, shp.width, shp.height);
							container.regX = App.PIXEL_SIZE / 2;
							container.regY = App.PIXEL_SIZE / 2;
							container.x = x2d;
							container.y = y2d;
							me.get('eslObj').addChild(container);
							el.container = container;
							el.shp = shp;
							pixelsFromImgList.push(el)
							me.set('pixelsFromImgList', pixelsFromImgList);
							
						}

					}
				}(this),
				onCompleteFunc = function (me) {
					return function (amap) {
						//console.log('map is completed\n'+str)
						if (me.get('isCreateFromImage')) {
							me.set('pixelsFromImgMap', amap);
						}
					}
				}(this);
			ragh.createJsonMapFromImage(img, mapElementFunc, onCompleteFunc);
			

		}
	},
	
	doShowPixelChildrenTo: function (isVis, dur) {
		var handle = this.get('handle');
		handle.visible = true;
		var rIndexAr = [],
			pixels = handle.children,
			step = dur/pixels.length;
		
		for (var r=0; r < pixels.length; r++) rIndexAr.push(r);
		rIndexAr.sort(function() {return 0.5 - Math.random()})
		
		for (var c=0; c < handle.children.length; c++) {
			var r = rIndexAr[c];
			handle.children[r].visible = !isVis;
			setTimeout( function (me, ar, aisVis) {
				return function () {
					me.handle.children[ar].visible = aisVis;
				}
			}(this, r, isVis), step*c);
		}
		
	},	
	
	
	
	doShowLineInChildren: function (dur) {
		var handle = this.get('eslObj'),
			shp = this.get('shp'),
			rIndexAr = [],
			pixels = this.handle.children,
			maxY = 0,
			minY = 0,
			yRange,
			step;
		
		handle.visible = true;
		
		for (var c=0; c < pixels.length; c++) {
			maxY = Math.max(pixels[c].y, maxY);
			minY = Math.min(pixels[c].y, minY);
		}
		maxY = maxY / App.PIXEL_SIZE;
		minY = minY / App.PIXEL_SIZE;
		yRange = Math.abs(maxY - minY)
		step = dur / yRange;
 		//console.log('yRange='+yRange, 'maxY='+maxY, 'minY='+minY);
		for (var c=0; c < pixels.length; c++) {
			var pix = pixels[c];
			pix.visible = false;
			setTimeout( function (me, apix) {
				return function () {
					apix.visible = true;
				}
			}(this, pix), step*Math.abs(maxY - pix.y/ App.PIXEL_SIZE));
		}
		
	},
	
	override_createEsl: function () {
		var shp, handle;
		this.set('shp',  shp = new createjs.Shape());
		this.set('handle', handle = new createjs.Container());
		handle.addChild( shp );
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
			handle = this.get('handle');
			
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
		this.set('handle', handle);
		this.set('shp', shp);

	},
	override_reDraw: function () {
		
	}
	
});