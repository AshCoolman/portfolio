App.PixelView = App.EaselEntityView.extend({
	label:'pixel',
	easelObjSettings: {
				width: 20,
				height: 20,
				x: 0,
				y: 0
			},
	gridSnap: 10,
	didInsertElement: function () {
		this._super();
		this.draw();
	},
	draw: function() {
		var shp, dragger, controller = this.get('controller'), controllerSettings = {};
		if (!this.easelObj) {
			Em.assert('App.PixelView.draw(): value of x in easelObj is not of type "number"', (typeof this.easelObjSettings.x == 'number'));
			Em.assert('App.PixelView.draw(): value of y in easelObj is not of type "number"', (typeof this.easelObjSettings.y == 'number'));
			Em.assert('App.PixelView.draw(): value of width in easelObj is not of type "number" '+this.easelObjSettings.width, (typeof this.easelObjSettings.width == 'number'));
			Em.assert('App.PixelView.draw(): value of height in easelObj is not of type "number"', (typeof this.easelObjSettings.height == 'number'));

			console.log('drawing new', this.easelObjSettings);
			
			controllerSettings = {};
			if (controller.x) controllerSettings.x = controller.x;
			if (controller.y) controllerSettings.y = controller.y;
			if (controller.width) controllerSettings.width = controller.width;
			if (controller.height) controllerSettings.height = controller.height;
			$.extend(this.easelObjSettings, controllerSettings); 
			//If controller has values, they were probably set from 
			
			shp = new createjs.Shape();
			shp.name = 'shp';
			shp.regX = - this.easelObjSettings.width / 2;
			shp.regY = - this.easelObjSettings.height / 2;
			shp.width = this.easelObjSettings.width;
			shp.height = this.easelObjSettings.height;
			
			dragger = new createjs.Container();
			dragger.addChild(shp);
			dragger.x = Number(this.easelObjSettings.x);
			dragger.y = Number(this.easelObjSettings.y);
			dragger.addEventListener("mousedown", 
				(function(me) {
					return function(evt) {
						var o={x: evt.target.x-evt.stageX, y: evt.target.y-evt.stageY };
						evt.addEventListener("mousemove", function(ev) {
						   	ev.target.x = me.snap(ev.stageX + o.x);
							ev.target.y = me.snap(ev.stageY + o.y);
						});

					}
				}(this)));
			this.easelObj = dragger;
		} else {
			console.log('drawing old', this.easelObj)
			dragger = this.easelObj;
			shp = dragger.getChildAt(0);
			shp.graphics.clear();
		}	
		//shp.regX = this.easelObj.regX;
		//shp.regY = this.easelObj.regY;
		console.log('drawing', shp);
		shp.graphics.beginFill('#FFFFFF');
		shp.graphics.drawRect( 0, 0, shp.width, shp.height);
		//shp.graphics.beginFill("#ff0000").drawRect(0, 0, 100, 100);
		
		

		this.get('controller').send('view_easelObjCreated', this);
	},
	redraw: function () {
		
	},
	snap: function (val) {
		return Math.round( val / this.gridSnap) * this.gridSnap;
	}
	
});