App.SmartRoute=Em.Route.extend({label:"smartRoute",ClassName:"SmartRoute",isStarted:false,isStartedObserver:function(a,b){if(b){this.get("events").doDimensionNavHover(false)}}.observes("isStarted"),init:function(){this._super()},activate:function(){this._super();this.set("isStarted",false)},deactivate:function(){this._super();this.set("isStarted",false)},events:{doDimensionNavHover:function(b){var a;if(b){switch(window.location.hash){case"":a="ANI_X";break;case"#d1":a="ANI_XY";break;case"#d2":a="ANI_XYZ";break;case"#d3":a="ANI_XYZ";break}}else{switch(window.location.hash){case"":a="ANI_0";break;case"#d1":a="ANI_X";break;case"#d2":a="ANI_XY";break;case"#d3":a="ANI_XYZ";break}}App.eventMapper.trigger("setRuler",{posStr:a})}},addEvents:function(b){var a=this.get("events");$.extend(a,b);this.set("events",a)}});