App.SmartRoute = Em.Route.extend({
	label: 'smartRoute',
	ClassName: 'SmartRoute',
	isStarted: false,
	isStartedObserver: function (observed, val) {
		if (val) {
			this.get('events').doDimensionNavHover(false);
		}
	}.observes('isStarted'),
	init: function () {
		this._super();
	},
	activate: function () {
		this._super();
		this.set('isStarted', false);
		
	},
	deactivate: function () {
		this._super();
		this.set('isStarted', false);
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
			App.eventMapper.trigger('setRuler', {posStr: rulerPosStr});
			
		}
	},
	addEvents: function (added) {
		var events = this.get('events');
		$.extend(events, added);
		this.set('events', events);
	}
});