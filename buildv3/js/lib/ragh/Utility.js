var ragh = ragh ? ragh : {};
ragh.chooseOne = ragh.one = function (options) {
	return options[Math.round(options.length * Math.random() - 0.5)];
};

ragh.createJsonMapFromImage = function (img, mapElementFunc, onCompleteFunc) {
	$('body').append('<canvas class="tempcreateJsonMapFromImage">');
	var $tcanvas = $('.tempcreateJsonMapFromImage', $('body'));
	this.tcanvas = $tcanvas[0];
	
	if (!this.tcanvas.getContext) {
		setTimeout( function (me) {
			return  function() {
				me.createJsonMapFromImage(img, mapElementFunc, onCompleteFunc);
			}
		}(this), 100);
	} else {		
		
		var map = [[[]]],
			w=img.width,
			h=img.height,
			pixel,
			c = this.tcanvas,
			ctx=c.getContext("2d"),
			imgData,
			id;

		ctx.drawImage( img, 0, 0 );
		imgData = ctx.getImageData( 0, 0, w, h );
		id = imgData.data;
		
		//build map from pixels
		for (var i = 0 ; i < id.length;i+=4) {
			pixel = i / 4;
			if (id[i+3] == 255) {
				var x = pixel % w;
				var y = Math.floor(pixel / w);
				if (!map[x]) map[x]=[];
				if (!map[x][y]) map[x][y]= [];
				var decColor = ( 65536 * id[i+0] + 256 * id[i+1] + id[i+2] ).toString(16);
				
				map[x][y][0] = {color: '#'+decColor};
			}
		}
		//Get maximums TODO get from imgData
		var maxX = maxY = maxZ = 0;
		for (var xs = 0; xs < map.length; xs++) { 
			if (!map[xs]) map[xs] = []
			for (var ys = 0; ys < map[xs].length; ys++) {
				if (!map[xs][ys]) map[xs][ys] = []
				for (var zs = 0; zs < map[xs][ys].length; zs++) {
					if (map[xs][ys][zs]) {
						maxX = Math.max(maxX, xs);
						maxY = Math.max(maxY, ys);
						maxZ = Math.max(maxZ, zs);
					}
				}
			}
		}
		console.log('set maxs', maxX, maxY, maxZ)
		//Call mapElementFunc
		for (var xs = 0; xs < map.length; xs++) {
			if (!map[xs]) map[xs] = []
			for (var ys = 0; ys < map[xs].length; ys++) {
				if (!map[xs][ys]) map[xs][ys] = []
				for (var zs = 0; zs < map[xs][ys].length; zs++) {
					if (map[xs][ys][zs]) {
						mapElementFunc(xs, ys, 0, map[xs][ys][0], maxX, maxY, 0);
					}
				}
			}
		}
		
		$tcanvas.remove('.temp-createJsonMapFromImage');
		this.$tcanvas = this.tcanvas = null;
		
		onCompleteFunc(map, mapElementFunc, onCompleteFunc);
	}	
};