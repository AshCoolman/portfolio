App.TemplatedPixelGroupController = App.EslEntityController.extend({
	className:'TemplatedPixelGroupController',
	label:'TemplatedPixelGroupController',
	pixels: [],
	view_didInsertElement: function (aview) {
		this._super(aview);
		this.set('pixels', []);
	},
	view_willDestroyElement: function (aview) {
		this._super(aview);
		this.set('pixels', null);
		
	},
	CoggedPixelControllerCreated: function (apixelController) {
		var pixels = this.get('pixels');
		pixels.push(apixelController); //TODO THIS IS SO YUK: see CoggedPixelController.view_didInsertElement()
		this.set('pixels', pixels);
		this.get('view').addPixel(apixelController);
	},
	CoggedPixelControllerDestroyed: function (apixelController) {
		var pixels = this.get('pixels');
		pixels.splice(pixels.indexOf(apixelController), 1); //TODO THIS IS SO YUK: see CoggedPixelController.view_willDestroyElement()
		this.set('pixels', pixels);
		this.get('view').removePixel(apixelController);
	},
	setVisible: function (val) {
		this.get('view').doShowPixelInChildren();
	},
	
	doShowPixelInChildren: function (dur) {
		this.get('view').doShowPixelChildrenTo(true, dur);
		
	},
	
	doShowPixelOutChildren: function (dur) {
		this.get('view').doShowPixelChildrenTo(false, dur);
		
	},
	doShowLineInChildren: function (dur) {
		this.get('view').doShowLineInChildren( dur);
		
	},
	
	createPixel: function () {
		
	},
	
	doCogClose: function (dur) {
		var rIndexAr = [],
			pixels = this.get('pixels'),
			step = dur/pixels.length;

		for (var r=0; r < pixels.length; r++) rIndexAr.push(r);
		rIndexAr.sort(function() {return 0.5 - Math.random()})

		for (var c=0; c < pixels.length; c++) {
			var r = rIndexAr[c];
			setTimeout( function (me, ar) {
				return function () {
					pixels[ar].doClose();
				}
			}(this, r), step*c);
		}
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
	},
	
	
	doCogOpenAndFadeOut: function (dur) {
		var rIndexAr = [],
			pixels = this.get('pixels'),
			step = dur/pixels.length;

		for (var r=0; r < pixels.length; r++) rIndexAr.push(r);
		rIndexAr.sort(function() {return 0.5 - Math.random()})

		for (var c=0; c < pixels.length; c++) {
			var r = rIndexAr[c];
			setTimeout( function (me, ar) {
				return function () {
					
					pixels[ar].doOpenAndFadeOut();
				}
			}(this, r), step*c);
		}
	}
	
});
App.register('controller:templated-pixel-group', App.TemplatedPixelGroupController, {singleton:false})