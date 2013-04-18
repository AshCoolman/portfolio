App.CoggedPixelView = App.PixelView.extend({
	cogView: null,
	className: 'CoggedPixelView',
	//THIS MUST BE OVERRIDDEN. SUBCLASS CAN"T SEEM TO ACCESS...
	easelObjSettings: {
		width: 20,
		height: 20,
		x: 0,
		y: 0,
		fromController: ['x', 'y', 'width', 'height']
	},
	override_createEasel: function () {
		this.handle = this._super();
		var cogView = App.CogView.create( { controller: App.CogController.create() });
		App.static_easelEntityContainerView.pushObject(cogView);
		
		cogView.addEventListener('easelObjCreated', (function(me) {
			return function(e) {me.addCogEasel(e)};
		}(this)), false);
		setTimeout(
			(function(me) {
				return function() {me.doOpen();}
			}(this)), 2000+ Math.random() * 2000)
		return this.handle
	},
	addCogEasel: function (e) {
 		console.log('addCogEasel', e)
		this.e_cog = e.easelObj;
		//this.e_cog.x=this.e_cog.y=0;
		//this.shp.x=this.shp.y=0;
		this.handle.addChildAt(this.e_cog)
		console.log('>>> addCogEasel addCogEasel addCogEasel')
	},
	override_draw: function (settings) {
		this._super(settings);
		
	},
	override_redraw: function () {

	},
	doOpen: function() {
		this.shp.x += 30; //TODO Tween engine
	}

	
})