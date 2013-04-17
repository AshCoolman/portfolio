/*jslint todo:true */
/**
* TODO Use real js events, or maybe rename 'SignalMapper'
* listener hash for quicker removing
**/
var ragh = {};
ragh.eventMapper = (function () {
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
				console.log(type, listener);
				throw 'raaagh.EventMapper: .addEventListener(): third parameter must be callback '+type+', '+listener;
			}
			if (!this.eventsAndListeners.hasOwnProperty(type)) {
				this.eventsAndListeners[type] = [];
			}
			
			var matched = this.eventsAndListeners[type].filter( function (el) {
				return (el.listener == listener);
			});
			
			if (matched.length == 0) {
				this.eventsAndListeners[type].push({ listener: listener, callback: callback });
			}
			return type;
		},
		removeEventListener: function (type, listener) { 
			assert(this.eventsAndListeners[type], 'raaagh.EventMapper: this.eventsAndListeners[' + type + '] is undefined');
			this.eventsAndListeners[type] = this.eventsAndListeners[type].filter(function (el) {
				return (el.listener != listener);
			});
		},
		triggerEvent: function ( e) {
 			console.log('triggerEvent', e)
			if (!this.eventsAndListeners.hasOwnProperty(e.type)) {
				this.eventsAndListeners[e.type] = [];
			}
			this.eventsAndListeners[e.type].filter(function (el) {
				 el.callback.call(el.listener, e.type, e.data);
				return true;
			});
		}
	};
}());

ragh.MappedEvent = ragh.MEvt = {
	type: null,
	data: null,
	create: function (atype, adata) {
		if (!atype) 
			throw "ragh.MappedEvent.create() expects first parameter to be a String describing event type";
		
		if (typeof atype  != "string") 
			throw "ragh.MappedEvent.create() expects first parameter to be String describing event type. Currently "+ (typeof atype );
		
		this.type = atype;
		this.data = adata;
		
		return this;
	}
}


/*ignore jslint start*/

if (!this.assert) {
	'use strict';
	this.assert = function (condition, failMsg, succeedMsg) {
		if (!condition) {
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