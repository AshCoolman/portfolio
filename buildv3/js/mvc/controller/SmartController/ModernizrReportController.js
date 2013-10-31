App.ModernizrReportController = App.SmartController.extend({
	modernizr: Modernizr,
	features: {min:[], low:[], full:[]},
	hasMinExp: true,
	listMinExp: [
		'canvas',
		'canvastext',
		'webgl',
		'hashchange',
		'history',
		'rgba',
		'svg',
		'inlinesvg'
	],
	hasLowExp: true,
	listLowExp: [
		'pointerevents',
		'svgclippaths',
		'backgroundsize',
		'opacity',
		'cssanimations',
		'cssgradients',
		'csstransitions',
		'fontface',
		'bgpositionshorthand'	
	],
	hasFullExp: true,
	listFullExp: [
		'boxshadow',
		/*'bgrepeatround',
		'bgrepeatspace',
		'bgsizecover',
		'bgpositionxy',*/
		'flexbox',
		'flexboxlegacy'
	],
	init: function () {
		var hasMinExp = this.get('hasMinExp'),
			listMinExp = this.get('listMinExp'),
			hasLowExp = this.get('hasLowExp'),
			listLowExp = this.get('listLowExp'),
			hasFullExp = this.get('hasFullExp'),
			listFullExp = this.get('listFullExp'),
			modernizr = this.get('modernizr'),
			features = this.get('features');
			
 			// https://github.com/Modernizr/Modernizr/issues/724
		    try {
		        modernizr.webgl = !!window.WebGLRenderingContext && !!document.createElement('canvas').getContext('experimental-webgl');
		    } catch(e) {
		        modernizr.webgl = false;
		    }
		
		for(var p in modernizr) {
			if (typeof modernizr[p] == 'boolean') {
				if (listMinExp.indexOf(p) != -1) {
					hasMinExp = (modernizr[p] && hasMinExp);
					features.min.push({ name: p, isSupported: modernizr[p]});
				}
			}
		}
		
		for(var p in modernizr) {
			if (typeof modernizr[p] == 'boolean') {
				if (listLowExp.indexOf(p) != -1) {
					hasLowExp = (modernizr[p] && hasLowExp && hasMinExp);
					features.low.push({ name: p, isSupported: modernizr[p]});
				}
			}
		}
		
		for(var p in modernizr) {
			if (typeof modernizr[p] == 'boolean') {
				if (listFullExp.indexOf(p) != -1) {
					hasFullExp = (modernizr[p] && hasFullExp && hasLowExp && hasMinExp);
					features.full.push({ name: p, isSupported: modernizr[p]});
				}
			}
		}
		
		this.set('features', features);
		this.set('hasMinExp', hasMinExp);
		this.set('hasLowExp', hasLowExp);
		this.set('hasFullExp', hasFullExp);
		return this._super();
	}
})