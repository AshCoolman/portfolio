var MachineViewLed = function () {
	this.COL_POWER_OFF = '#005500';
	this.COL_POWER_ON = '#33CC33';
	this.COL_ACTIVITY_OFF = '#557777';
	this.COL_POWER_ON = '#5555CC';
	this.colOn = '#33CC33';
	this.colStandBy = '#33CC33';
	this.colOff = '#005500';
	this.shp = null;
	this.clickFunc = null;
}
MachineViewLed.prototype = {
	init: function (aplan) {
		this.colOn = aplan.colOn || this.colOn;
		this.colOff = aplan.colOff || this.colOff;
		this.colStandBy = aplan.colStandBy || this.colStandBy;
		this.shp = aplan.shp || this.shp;
		this.clickFunc = aplan.clickFunc || null;
		
		if (this.clickFunc) {
			this.shp.cursor = 'pointer';
			this.shp.addEventListener('click', this.clickFunc, false);
		}
	},
	showOn: function () {
		this._show(this.colOn);
	},
	showStandBy: function () {
		this._show(this.colStandBy);
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
	},
	cleanUp: function() {
		if (this.clickFunc) {
			this.shp.removeEventListener('click', this.clickFunc);
		}
		
		this.colOn = null;
		this.colOff =null;
		this.colStandBy = null;
		this.shp = null;
	}
}

var MachineViewRayParticle = function () {
	
	//				orange		Yellow		pink	aqua	blue
	this.COL_LIST = ['#40FF00', '#FFEA00', '#FF00CB', '#00FFEF', '#008FFF'];
	this.col = null;
	this.shp = null;
	this.eslObj = null;
	this.tween = null;
}
MachineViewRayParticle.prototype = {
	init: function (aplan) {
		var updateFunc,
			onCompleteFunc;
			
		aplan.w = aplan.w || App.PIXEL_SIZE * 6;	
		aplan.h = aplan.h || App.PIXEL_SIZE;
		aplan.x = aplan.x || 0;
		aplan.y = aplan.y || 0;
		aplan.col = aplan.col || this.COL_LIST[ Math.floor( Math.random() * this.COL_LIST.length ) ];
		
		this.eslObj = new createjs.Container();
		this.eslObj.addChild( this.shp = this.createShape(aplan) );
		this.eslObj.x = this.eslObj.proxyX = aplan.x;
		this.eslObj.y = this.eslObj.proxyY = aplan.y;
		this.eslObj.alpha = 0.8;
		
		updateFunc = function (me, aeslObj, w, h) {
			return function () {
				aeslObj.x = aeslObj.proxyX - (aeslObj.proxyX % App.PIXEL_SIZE);
				aeslObj.y = aeslObj.proxyY - (aeslObj.proxyY % App.PIXEL_SIZE);
			}
		}(this, this.eslObj, aplan.w, aplan.h);
		updateFunc();
		onCompleteFunc = function (me) {
			return function () {
				me.eslObj.removeAllChildren();
				if (me.eslObj.parent) {
					me.eslObj.parent.removeChild(me.eslObj);
					me.eslObj = me.shp = me.COL_LIST = me.col = null
				}
				me.cleanUp();
				
			}
		}(this);

		this.tween = TweenMax.to(this.eslObj, 0.1, {alpha:0.2, repeat:8, yoyo:true, onComplete: onCompleteFunc});
		//var tween = TweenMax.to(this.eslObj, 0.8, {alpha:0.2, proxyX: this.eslObj.proxyX + 4 * aplan.w, onUpdate: updateFunc, onComplete: onCompleteFunc});
	},
	createShape: function (aplan) {
		var shp = new createjs.Shape(),
			col = aplan.col;
		shp.width = aplan.w;
		shp.height = aplan.h;
		//shp.regX = -aplan.w/2;
		//shp.regY = +aplan.h/2;
		
		shp.graphics.clear();
		shp.graphics.beginFill(col);
		shp.graphics.drawRect( 0, 0, shp.width, shp.height);
		return shp;
	},
	cleanUp: function() {
		this.COL_LIST = null;
		this.col = null;
		this.shp = null;
		this.eslObj = null;
		this.tween && this.tween.kill && this.tween.kill();
		this.tween = null;
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
			this.set('isActivity', false);
			ledHash.power && ledHash.power.showOff();
		}
	}.observes('controller.isOn'),
	toggleActivityInterval: null,
	isActivity:false,
	isActivityObserver: function (obj, val) {
		
		var ledHash = this.get('ledHash');

		if (this.get(val) && this.get('controller.isOn')) {
			ledHash.activity && ledHash.activity.showOn();
			var ray = this.shootRay();
			this.get('controller').doActivateTarget({ray:ray});
		} else {
			ledHash.activity && ledHash.activity.showOff();
		}
	}.observes('isActivity'),
	activateOn: function () {
		
	},
	didInsertElement: function () {
		this._super();
		console.log('creating machine view')
	},
	willDestroyElement: function () {
		this._super();
		console.log('destroying machine view')
		clearInterval(this.get('toggleActivityInterval'));
		this.set('toggleActivityInterval', null);
		var ledHash = this.get('ledHash');
		if (ledHash) {
			ledHash.power && ledHash.power.cleanUp();
			ledHash.activity && ledHash.activity.cleanUp();
			ledHash.power = ledHash.activity = null;
		}
		this.set('ledHash', ledHash = null);
	},
	trySetPowerLed: function ( eslObj, shp ) {
		
		var ledHash = this.get('ledHash'),
			clickPowerFunc;
		if (!ledHash.power) {
			clickPowerFunc = function (me) {
				return function (e) {
					if (me.get('controller').isInteractive)
						me.get('controller').togglePower();
				}
			}(this);
			ledHash.power = Object.createFromPrototype(MachineViewLed, {clickFunc: clickPowerFunc, shp: shp});
			ledHash.power.showOff();
		} else {
			console.log('already this.get ledHash.power')
		}
	},
	
	trySetActivityLed: function ( eslObj, shp ) {
		var ledHash = this.get('ledHash');
		if (ledHash.power && !ledHash.activity && ledHash.power.shp != shp) {
			ledHash.activity = Object.createFromPrototype(MachineViewLed, {});
			ledHash.activity.shp = shp;
			ledHash.activity.colOn = '#0040FF';
			ledHash.activity.colOff = '#d2691e';
			ledHash.activity.colStandBy = '#EB9946';
			ledHash.activity.showOff();
		}
	},
	shootRay: function () {
		//Find Right Edge
		var eslObj = this.get('eslObj'),
			edge = [],
			edgeX,
			pixels = this.get('controller.pixels'),
			pix;
			
		console.log('shoot ray', pixels.length, pixels)
		for (var p = 0; p < pixels.length; p++) {
			pix = pixels[p].get('view.eslObj');
			if (!edgeX || pix.x > edgeX) {
				edgeX = pix.x;
				edge = [pix];
			} else if ( pix.x == edgeX ) {
				edge.push(pix);
			}
		}
		
		//create particle on edge
		for (var e = 0; e < edge.length; e++) {
			//console.log('particle', eslObj.x + edge[e].x, eslObj.y, edge[e].y)
			var rayParticle = Object.createFromPrototype(MachineViewRayParticle, {
						x: eslObj.x + edge[e].x + App.PIXEL_SIZE, 
						y: eslObj.y + edge[e].y
					});
			eslObj.parent.addChild(rayParticle.eslObj);
		}
		
		
	}
});
