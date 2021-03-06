App.CoggedPixelView = App.PixelView.extend({
	cogView: null,
	label:'cogged-pixel',
	className: 'CoggedPixelView',
	init: function () {
		this._super();
	},

	//THIS MUST BE OVERRIDDEN. SUBCLASS CAN"T SEEM TO ACCESS...
	eslObjSettings: {
		width: 30,
		height: 30,
		x: 0,
		y: 0,
		fromController: ['x', 'y', 'width', 'height', 'col']
	},
	override_createEsl: function () {
		this.handle = this._super();
		var cogView = App.CogView.create( { controller: App.CogController.create() });
		App.static_eslEntityContainerView.pushObject(cogView);
		
		cogView.addEventListener('eslObjCreated', (function(me) {
			return function(e) {me.addCogEsl(e)};
		}(this)), false);
	
			
		return this.handle
	},
	addCogEsl: function (e) {
		var e_cog;
		this.set('e_cog', e_cog = e.eslObj);
		e_cog.x=e_cog.y=0;
		this.handle.addChildAt(e_cog)
	},
	override_draw: function (settings) {
		this._super(settings);
		
	},
	override_reDraw: function () {

	},
	doOpen: function() {

		(function(me) {
			var t0 = {}, 
				t1 = {},
				prop = ragh.one(['x', 'y']), 
				dir = ragh.one([1, -1]) * me.shp.width * 0.8;
			t0[ prop ] = me.shp[ prop ];	
			t1[ prop ] = dir;
			window.createjs.Tween.get(me.shp).to(t1, 750).wait(2000).to(t0, 750);	
		}(this));

		(function(me) {
			var t0 = {}, 
				t1 = {},
				prop = 'rotation', 
				dir = ragh.one([1, -1]) * 20 * 2 *Math.PI;
			t0[ prop ] = me.shp[ prop ];	
			t1[ prop ] = dir;
			window.createjs.Tween.get(me.e_cog).to(t1, 750).wait(2000).to(t0, 750);	
		}(this));
		
	},
	doOpenAndFadeOut: function() {

		(function(me) {
			var t0 = {}, 
				t1 = {},
				prop = ragh.one(['x', 'y']), 
				dir = ragh.one([1, -1]) * me.shp.width * 0.8;
			t0[ prop ] = me.shp[ prop ];	
			t1[ prop ] = dir;
			t0['alpha'] = 1;
			t1['alpha'] = 0;
			window.createjs.Tween.get(me.shp).to(t1, 750).wait(2000);	
		}(this));

		(function(me) {
			var t0 = {}, 
				t1 = {},
				t2 = {},
				prop = 'rotation', 
				dir = ragh.one([1, -1]) * 20 * 2 *Math.PI;
			scale = {scaleX: 1.2, scaleY:1.2};
			t0[ prop ] = me.shp[ prop ];	
			t1[ prop ] = dir;
			t2.alpha = 0;
			t2[ prop ] = dir*2;
			window.createjs.Tween.get(me.get('e_cog')).to(scale, 500).to(t1, 1500).to(t2, 1500);	
		}(this));
		

	}

	
})
