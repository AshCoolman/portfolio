(function(){App.HeartbeatController=App.SmartController.extend({label:"HeartbeatController",timeout:null,totalHeartbeats:0,MAX_HEARTBEATS:20,myView:null,speedFactors:[],createHeartbeat:function(){var e=1000,a=3000,f=0,g=1,d=1000,c=this.speedFactors;App.eventMapper.triggerEvent(ragh.MEvt.create("heartbeat",{target:this}));for(f=0;f<c.length;f++){var b=c[f]();Ember.assert("App.HeartbeatController.createHeartbeat() speedFactor function does not return 0 - 1:"+b,(0<=b&&1>=b))}g=(c.length==0)?1:totalHeartbeats/c.length;d=e+(g*(a-e));if(this.totalHeartbeats<this.MAX_HEARTBEATS){this.totalHeartbeats++;this.timeout=setTimeout(function(h){return function(){h.createHeartbeat(h)}}(this),d)}},view_didInsertElement:function(a){this._super(a);this.myView=a},view_willDestroyElement:function(){if(typeof this.timeout=="number"){clearTimeout(this.timeout)}}})}());