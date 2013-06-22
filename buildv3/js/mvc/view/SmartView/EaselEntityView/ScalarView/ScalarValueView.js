App.ScalarValueView = App.ScalarView.extend({
	templateName: 'scalar-value',
	value: 4000,
	scaleLabel: '64.4 kg',
	drawInstructions: {
		isMirrored: false,
		axis: {
			step: 10,
			count:0
		},
		smallMarks: {
			unit: 5,
			step: 5,
			count:0,
			markHeights: [5]
		},
		bigMarks: {
			step: 5,
			unit: 50,
			count:0,
			markHeights: [10] 	//[5, 7, 9, 10, 11, 12, 12.5, 13, 13.5, 14, 14.5, 15]
		}
	},
	init: function () {
		this._super();
		this.eslObjSettings.width = this.get('value') / this.get('drawInstructions').axis.step+100;
		return this;
	},
	override_createEsl: function () {
		var shp = this._super();
		var text = new createjs.Text(this.get('scaleLabel'), "10px Arial", "#666666");
	 	//text.x = this.eslObjSettings.width;
	 	//text.textBaseline = "alphabetic";
	console.log(shp)
		shp.addChild(text);
		return shp;
		
	}
});