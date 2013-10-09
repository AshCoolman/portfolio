App.UserView = App.TemplatedPixelGroupView.extend({
	templateName: 'user',
	className: 'UserView',
	label: 'user',
	imgPreloadId: 'face-user-pixel',
	faceChangeMaps:[],
	faceChangeImgPreloadIds:['face-user-pixel-change01', 'face-user-pixel-change02', 'face-user-pixel-change03'],
	didInsertElement: function () {
		this._super();
		console.log('USER VIEW INSERTED', this);
		
		var ids = this.get('faceChangeImgPreloadIds');
		for (var f = 0; f < ids.length; f++) {
			this.setFaceChangeMap(ids[f]);
		}
		
	},
	willDestroyElement: function ( ) {
		this._super();
		this.set('faceChangeMaps', null);
		this.set('faceChangeImgPreloadIds', null);
	},
	doActivate: function () {
		console.log('UserView.doActivate() child views', this.get('childViews').length)
		this.clearFace();
		this.makeFaceChange();
	},
	
	clearFace: function () {
		var pixels = this.get('childViews'),
			pixelW = pixelH = App.PIXEL_SIZE;
			
		for (var c = 0; c < pixels.length; c++ ) {
			pixelShp = pixels[c].get('shp');
			pixelShp.graphics.clear();
			pixelShp.graphics.beginFill('#FFFFFF');
			pixelShp.graphics.drawRect( 0, 0, pixelW, pixelH);

		}
	},
	
	makeFaceChange: function (acol) {
		var faceChangeMaps = this.get('faceChangeMaps'),
			changeMap = faceChangeMaps[0],
			pixels = this.get('childViews'),
			pixelShp,
			pixelW = pixelH = App.PIXEL_SIZE,
			col = acol || '#666666';
			
		
		faceChangeMaps.splice(0, 1);
		faceChangeMaps.push(changeMap);
		this.set('faceChangeMaps', faceChangeMaps);
		
		for (var x = 0; x < changeMap.length; x++) {
			for (var y = 0; y < changeMap[x].length; y++) {
				var coord = changeMap[x][y][0];
				if (coord) {
					var x2d = coord.x2d,
						y2d = coord.y2d;
					
					//TODO this is inefficient...
					var childEslObj;
					for (var c = 0; c < pixels.length; c++ ) {
						childEslObj = pixels[c].get('eslObj');
						if (childEslObj.x == x2d && childEslObj.y ==y2d && coord.color) {
							pixelShp = pixels[c].get('shp');
							pixelShp.graphics.clear();
							pixelShp.graphics.beginFill(col);
							pixelShp.graphics.drawRect( 0, 0, pixelW, pixelH);
						}
					}
					
				}
				
			}
		}
	},
	setFaceChangeMap: function (aimgPreloadId) {
		var img = App.preloadedImages[aimgPreloadId];
		
		if (img) {
			var mapElementFunc = function (me) {
					return function (x, y, z, el, maxX, maxY, maxZ) {
						el.x2d = (-15+(x+2)*App.PIXEL_SIZE);
						el.y2d = (240+(0.5-maxY+y)*App.PIXEL_SIZE);
					}
				}(this),
				onCompleteFunc = function (me) {
					return function (amap) {
						//console.log('map is completed')
						me.get('faceChangeMaps').push(amap);
					}
				}(this);
			ragh.createJsonMapFromImage(img, mapElementFunc, onCompleteFunc);
		}
	}
});
