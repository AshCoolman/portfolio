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
		fromController: ['x', 'y', 'width', 'height']
	},
	override_createEsl: function () {
		this.handle = this._super();
		var cogView = App.CogView.create( { controller: App.CogController.create() });
		App.static_eslEntityContainerView.pushObject(cogView);
		
		cogView.addEventListener('eslObjCreated', (function(me) {
			return function(e) {me.addCogEsl(e)};
		}(this)), false);
		setTimeout(
			(function(me) {
				return function() {me.doOpen();}
			}(this)), 2000+ Math.random() * 2000)
		return this.handle
	},
	addCogEsl: function (e) {
		this.e_cog = e.eslObj;
		this.e_cog.x=this.e_cog.y=0;
		this.handle.addChildAt(this.e_cog)
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
		
	}

	
})
