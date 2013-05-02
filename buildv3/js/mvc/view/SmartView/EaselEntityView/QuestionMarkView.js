App.QuestionMarkView = App.EslEntityView.extend({
	templateName: 'question-mark',
	className: 'QuestionMarkView',
	label: 'question-mark',
	eslObjSettings: {
		x: 0,
		y: 0,
		fromController: ['x', 'y'],
	},
	override_createEsl: function () {
		return new createjs.Container();
	},
	override_draw: function (asettings) {
		var settings = asettings ? asettings : this.eslObj;
		settings.x = Number(settings.x);	
		settings.y = Number(settings.y);
		Em.assert('App.ScalarView.override_draw(): value of x in eslObj is not of type "number"', 	!isNaN(settings.x) );
		Em.assert('App.ScalarView.override_draw(): value of y in eslObj is not of type "number"',  !isNaN(settings.y) );

		this.eslObj.x = Number(settings.x);
		this.eslObj.y = Number(settings.y);	
		return this.eslOb;
	},
	override_redraw: function (dur) {
		var change = 30/1000 * dur; //per second
		if (this.eslObj) {
			with (this.eslObj) {
				x = (x > 1200) ? -300 : x+change;
			}
		}
	}
});