App.QuestionMarkController = App.EslEntityController.extend({
	className:'QuestionMarkController',
	label:'QuestionMarkController',
	pixels: [],
	view_eslEntityCreated: function (acontroller) {
		this._super(acontroller);
	},
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
App.register('controller:question-mark', App.QuestionMarkController, {singleton:false})