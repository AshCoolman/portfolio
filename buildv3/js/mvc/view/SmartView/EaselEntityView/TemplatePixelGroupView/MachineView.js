var MachineViewLed = function () {
	this.COL_POWER_OFF = '#005500';
	this.COL_POWER_ON = '#33CC33';
	this.COL_ACTIVITY_OFF = '#557777';
	this.COL_POWER_ON = '#5555CC';
	this.colOn = '#33CC33';
	this.colOff = '#005500';
	this.shp = null;
}

MachineViewLed.prototype = {
	init: function (aplan) {
		this.colOn = aplan.colOn || this.colOn;
		this.colOff = aplan.colOff || this.colOff;
		this.shp = aplan.shp || this.shp;
	},
	showOn: function () {
		this._show(this.colOn);
	},
	showOff: function () {
		this._show(this.colOff);
	},
	_show: function (col) {
		if (this.shp) {
			this.shp.graphics.clear();
			this.shp.graphics.beginFill(col);
			this.shp.graphics.drawRect( 0, 0, this.shp.width, this.shp.height);
		}
	}
}
		
App.MachineView = App.TemplatedPixelGroupView.extend({
	templateName: 'machine',
	className: 'MachineView',
	label: 'machine',
	imgPreloadId: 'machine-pixel',
	ledHash:{},
	isOnObserver: function (obj, val) {
		var ledHash = this.get('ledHash');
		if (this.get(val)) {
			var toggleActivityInterval = setInterval(function (me) {
				return function () {
					me.set('isActivity', !me.get('isActivity'));
				}
			}(this), 1000);
			this.set('toggleActivityInterval', toggleActivityInterval);
			ledHash.power && ledHash.power.showOn();
		} else {
			clearInterval(this.get('toggleActivityInterval'));
			this.set('toggleActivityInterval', null);
			ledHash.power && ledHash.power.showOff();
		}
	}.observes('controller.isOn'),
	activityCycleInterval: null,
	isActivity:false,
	isActivityObserver: function (obj, val) {
		var ledHash = this.get('ledHash');
		if (this.get(val)) {
			ledHash.activity && ledHash.activity.showOn();	
		} else {
			ledHash.activity && ledHash.activity.showOff();
		}
	}.observes('isActivity'),
	activateOn: function () {
		
	},
	trySetPowerLed: function ( eslObj, shp ) {
		var ledHash = this.get('ledHash');
		if (!ledHash.power) {
			
			ledHash.power = Object.createFromPrototype(MachineViewLed, {});
			ledHash.power.shp = shp;
			ledHash.power.showOff();
		}
	},
	
	trySetActivityLed: function ( eslObj, shp ) {
		var ledHash = this.get('ledHash');
		if (ledHash.power && !ledHash.activity && ledHash.power.shp != shp) {
			ledHash.activity = Object.createFromPrototype(MachineViewLed, {});
			ledHash.activity.shp = shp;
			ledHash.activity.colOn = '#0040FF';
			ledHash.activity.colOff = '#EB9946';
			ledHash.activity.showOff();
		}
	}
});
