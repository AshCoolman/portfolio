App.SubtitleView=App.SmartView.extend({name:"Subtitle",templateName:"subtitle",subtitleText:"Lorum ipsum",tagName:"div",didInsertElement:function(e,d,f){this._super();if(!this.get("didInsertElementExecuted")){$(".text",this.get("$el")).hover(function(a){return function(){a.get("controller").set("isHover",true);if(!a.get("controller").get("isEnded")&&!a.get("controller").get("isEdit")){a.get("controller").set("isHoverUnfinished",true)}a.get("controller").send("doHover",true)}}(this),function(a){return function(){a.get("controller").set("isHover",false);a.get("controller").set("isHoverUnfinished",false);a.get("controller").send("doHover",false)}}(this));$(".text",this.get("$el")).on("click","span",function(a){return function(){a.get("controller").send("doClicked")}}(this));if(this.get("controller").get("isInstant")){this.get("$el").addClass("fader fade-out")}console.log("didInsertElement (with remove)",this.get("controller.orderRead"));this.doRemove();this.set("didInsertElementExecuted",true)}},doShow:function(){var a=$(this.get("el"))[0].id;console.log("doShow",a,$("#"+a));$("#"+a).css("display","block");this.get("$el").css("display","block")},doRemove:function(){var a=$(this.get("el"))[0].id;console.log("doRemove",a);$("#"+a).css("display","none");this.get("$el").css("display","none")},doShowInstant:function(){this.doShow();setTimeout(function(a){return function(){a.get("$el").removeClass("fade-out").addClass("fade-in")}}(this),0)},willDestroyElement:function(){this._super();$(".text",this.get("$el")).unbind("mouseenter");$(".text",this.get("$el")).unbind("mouseleave");$(".text",this.get("$el")).unbind("click")}});