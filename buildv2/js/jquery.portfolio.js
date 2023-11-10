/**
 *	 v1.1
 * Added setDomData and getDomData, preloadImages
 **/
var jQuery;
(function ($) {
	// Define console if it isn't (for older browsers)
	if (typeof console === "undefined") {
		this.console = {
			log: function () {}
		};
	}
	/**
	 *	 Major property <code>me</code> holds plugin properties that are set at runtime
	 **/
	var me = {},
	preloadImages = {}, /*{'img/leftSquareFaceAlpha.png':null, 'img/leftSquareBrainAlpha.png':null},*/
	preloadImagesDone = 0,
		/**
		 *	 Major property <code>settings</code> holds plugin properties that are set before runtime
		 **/
		settings = {},
		/**
		 *	 Major property <code>plugin</code> holds descriptive information about this plugin
		 **/
		plugin = {
			author: 'Ashley Coleman',
			version: 'a1.0',
			name: 'portfolio'
		},
		/**
		 *	Major property <code>data</code> holds plugin properties that are set during runtime
		 *	 
		 *	Not using jQuery.data() method because the function breaks call by reference to data object,
		 *	and needs to be constantly "saved" using $(dom).data('key', value) - which is annoying.
		 *
		 *	This function should be used in methods that access data frequently / are "control" methods
		 *
		 *	Usage: var data = getDomData($this); //Now data can be modified directly without needing set using dom.data(updatedDataObj);
		 **/
		_domDataObjList = [],
		getDomData = function ($dom) {
			var d;
			for (d = 0; d < _domDataObjList.length; d++) {
				if (_domDataObjList[d]['$dom'] == $dom) break;
			}
			return _domDataObjList[d];
		},
		setDomData = function ($dom, dataObj) {
			if (typeof (dataObj['$dom']) != 'undefined') throw new Error('setDomData() ERROR: property "$dom" is already used to store reference to dom object');
			var d;
			for (d = 0; d < _domDataObjList.length; d++) {
				if (_domDataObjList[d]['$dom'] == $dom) break;
			}
			dataObj['$dom'] = $dom;
			_domDataObjList[d] = dataObj;
		},
		/**
		 *	
		 **/
		methods = {
			/* FUNCTION */
			init: function (options) {
				me.methods.preload(this, options);
			},
			preload: function (athis, options) {
				for (var p in preloadImages) {
					var img = new Image();
					preloadImages[p] = $('<image>', {
						src: p
					}).load(

					function () {
						console.log('image loaded', p, preloadImagesDone, preloadImages.length);
						preloadImagesDone++;
						if (preloadImagesDone == Object.keys(preloadImages)) me.methods.start(athis, options);
					})[0];
				}
				if (preloadImagesDone == Object.keys(preloadImages)) me.methods.start(athis, options);
			},
			start: function (athis, options) {
				return athis.each(function (index, value) {
					var $this = $(value);
					setDomData($this, {});
					var data = getDomData($this);
					$.extend(data, me, settings, options);
					if (typeof options == 'undefined') throw plugin.name + ': no options passed';
					//Do something
					//soooo setup the basic container? no...
					//assume...nothing.
					//add:
					//	-Preload
					//	-Functionality
					//
					//plugins to this:
					//	-use html snippet (data)
					//	-use css file (style)
					//
					console.log('doing something');
				});
			}
		};
	$.fn.portfolio = function (method) {
		me.methods = methods;
		me.settings = settings;
		me.preloadImages = preloadImages;
		// Method calling logic
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist in ' + plugin.name);
		}
	};
}(jQuery));