App.TemplatedPixelGroupController = App.EslEntityController.extend({
	className:'TemplatedPixelGroupController',
	label:'TemplatedPixelGroupController',
	pixels: [],
	CoggedPixelControllerCreated: function (apixelController) {
		var pixels = this.get('pixels');
		pixels.push(apixelController); //TODO THIS IS SO YUK: see CoggedPixelController.view_didInsertElement()
		this.set('pixels', pixels);
	},
	setVisible: function (val) {
		this.get('view').doShowPixelInChildren();
	},
	doShowPixelInChildren: function (dur) {
		this.get('view').doShowPixelInChildren(dur);
		
	},
	createPixel: function () {
		
	},
	
	doCogOpen: function (dur) {
		var rIndexAr = [],
			pixels = this.get('pixels'),
			step = dur/pixels.length;

		for (var r=0; r < pixels.length; r++) rIndexAr.push(r);
		rIndexAr.sort(function() {return 0.5 - Math.random()})

		for (var c=0; c < pixels.length; c++) {
			var r = rIndexAr[c];
			setTimeout( function (me, ar) {
				return function () {
					pixels[ar].doOpen();
				}
			}(this, r), step*c);
		}
	}
});
App.register('controller:templated-pixel-group', App.TemplatedPixelGroupController, {singleton:false})