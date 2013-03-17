/*jslint todo:true */
/**
* TODO Use real js events, or maybe rename 'SignalMapper'
* listener hash for quicker removing
**/
var ragh = {};
ragh.EventMapper = (function () {
	'use strict';
	return {
		eventsAndListeners: {},
		addEventListener: function (type, listener, callback) {
			if (!type) {
				throw 'raaagh.EventMapper: .addEventListener(): first parameter must be type from EmberMapper.createEvent()';
			}
			if (!listener) {
				throw 'raaagh.EventMapper: .addEventListener(): second parameter must be listener';
			}
			if (!callback) {
				throw 'raaagh.EventMapper: .addEventListener(): third parameter must be callback';
			}
			if (!this.eventsAndListeners.hasOwnProperty(type)) {
				this.eventsAndListeners[type] = [];
			}
			this.eventsAndListeners[type].push({ listener: listener, callback: callback });
		},
		removeEventListener: function (mappedEvent, listener) {
			assert(this.eventsAndListeners[type], 'raaagh.EventMapper: this.eventsAndListeners[mappedEvent.type] is undefined');
			this.eventsAndListeners[type] = this.eventsAndListeners[type].filter(function (el) {
				return (el.listener === listener);
			});
		},
		triggerEvent: function (type) {
			if (!this.eventsAndListeners.hasOwnProperty(type)) {
				this.eventsAndListeners[type] = [];
			}
			this.eventsAndListeners[type].filter(function (el) {
				 el.callback(type, el.listener);
				return true;
			});
		}
	};
}());



/*ignore jslint start*/

if (!this.assert) {
	'use strict';
	this.assert = function (condition, failMsg, succeedMsg) {
		if (condition) {
			console.info(failMsg);
		} else if (succeedMsg) {
			console.info(succeedMsg);
		}
	}
}


//For IE, you can include the following method for compatibility: http://goo.gl/afLtG
if (!Array.prototype.filter) {
  Array.prototype.filter = function(fun /*, thisp*/) {
    var len = this.length >>> 0;
    if (typeof fun != "function")
    throw new TypeError();

    var res = [];
    var thisp = arguments[1];
    for (var i = 0; i < len; i++) {
      if (i in this) {
        var val = this[i]
        if (fun.call(thisp, val, i, this))
        res.push(val);
      }
    }
    return res;
  };
}
/*ignore jslint end*/