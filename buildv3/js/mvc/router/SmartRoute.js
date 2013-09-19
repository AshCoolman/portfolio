App.SmartRoute = Em.Route.extend({
	label: 'smartRoute',
	ClassName: 'SmartRoute',
	init: function () {
		this._super();
	},
	activate: function () {
		this._super();
		this.events.doDimensionNavHover(false);
	},
	events: {
		//TODO window.location.hash optimum?
		doDimensionNavHover: function (isHoverOn) {
			var rulerPosStr;
			if (isHoverOn) {
				switch (window.location.hash) {
					case '': 	rulerPosStr = /*App.RulerController.*/'ANI_X'; break;
					case '#d1': 		rulerPosStr = /*App.RulerController.*/'ANI_XY'; break;
					case '#d2': 		rulerPosStr = /*App.RulerController.*/'ANI_XYZ'; break;
					case '#d3': 		rulerPosStr = /*App.RulerController.*/'ANI_XYZ'; break;
				}
			} else {
				switch (window.location.hash) {
					case '': 			rulerPosStr = /*App.RulerController.*/'ANI_0'; break;
					case '#d1': 		rulerPosStr = /*App.RulerController.*/'ANI_X'; break;
					case '#d2': 		rulerPosStr = /*App.RulerController.*/'ANI_XY'; break;
					case '#d3': 		rulerPosStr = /*App.RulerController.*/'ANI_XYZ'; break;
				}
			}
			//TODO maybe i can use the scheduleOnce method i keep seeing?
			setTimeout(function (me) {
				return function () {
					App.eventMapper.trigger('setRuler', {posStr: rulerPosStr});
				}
			}(this), 0);
			
		}
	},
	addEvents: function (added) {
		var events = this.get('events');
		$.extend(events, added)
		this.set('events', events);
	}
});