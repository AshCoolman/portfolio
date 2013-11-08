App.World2dView=App.ActiveEslStageView.extend({tagName:"div",className:"World2dView",templateName:"world-2d",isMosaic:true,multiData:{},src:{},pix:{},min:{},scale:30,isVis:true,multiTween:undefined,didInsertElement:function(scope){with(this){set("multiData",{index:0,roundIndex:0,needsRedraw:true,values:[256,128,64,32,24,8,1]});_super();src.$canvas=$(".esl-stage-canvas",$el).addClass("src-world-2d");src.$canvas.attr({width:App.BREAKPOINT.WIDTH_2,height:App.BREAKPOINT.HEIGHT_2});src.canvas=src.$canvas[0];src.context=src.canvas.getContext("2d");src.stage=stage;src.stage.mouseMoveOutside=true;src.stage.snapToPixelEnabled=true;if(get("isVis")){src.$canvas.parent().append('<canvas class="min-world-2d canvas-hero">');min.$canvas=$(".min-world-2d",$el);min.canvas=min.$canvas[0];min.context=min.canvas.getContext("2d");src.$canvas.parent().append('<canvas class="pix-world-2d canvas-hero">');pix.$canvas=$(".pix-world-2d",$el);pix.context=pix.$canvas[0].getContext("2d");pix.min=min;min.src=src}src.$canvas.css({display:"none"});min.$canvas.css({display:"none"});pix.$canvas.css({display:"block"})}var multiData=this.get("multiData");this.set("multiTween",createjs.Tween.get(multiData,{}).to({index:multiData.values.length},1000,createjs.Ease.getPowIn(2.2)).addEventListener("change",function(e){var multiData=e.target.target;if(Math.round(multiData.index)!=multiData.roundIndex){multiData.needsRedraw=true}multiData.roundIndex=Math.round(multiData.index)}));this.resize()},addCog:function(){console.log("adding cog");App.static_eslEntityContainerView.pushObject(App.CogView.create({controller:App.CogController.create()}))},addPixel:function(){console.log("adding pixel");var b=App.PixelController.create();var c=$.extend(App.PixelView.create().eslObjSettings,{x:0,y:0});var a=App.PixelView.create({controller:b,eslObjSettings:c});App.static_eslEntityContainerView.pushObject(a)},addQuestionMark:function(){console.log("view.addQuestionMark()")},reDraw:function(dur){with(this){_super(dur);if(this.get("isVis")&&pix.context){var multiData=get("multiData"),multiIndex=Math.round(multiData.index),multiValues=multiData.values;if(multiData.needsRedraw){multiData.needsRedraw=false;if(multiIndex<multiValues.length){var multi=multiValues[multiIndex],invMulti=1/multi,width=src.$canvas.attr("width"),height=src.$canvas.attr("height");with(min){context.webkitImageSmoothingEnabled=context.mozImageSmoothingEnabled=context.imageSmoothingEnabled=false;$canvas.attr({width:width/multi,height:height/multi});context.setTransform(invMulti,0,0,invMulti,0,0);context.drawImage(src.canvas,0,0);$canvas.css({width:width,height:height});src.$canvas.css({display:"none"});min.$canvas.css({display:"block"});pix.$canvas.css({display:"none"})}var is_chrome=navigator.userAgent.indexOf("Chrome")>-1;var is_explorer=navigator.userAgent.indexOf("MSIE")>-1;var is_firefox=navigator.userAgent.indexOf("Firefox")>-1;var is_safari=navigator.userAgent.indexOf("Safari")>-1;var is_Opera=navigator.userAgent.indexOf("Presto")>-1;if((is_chrome)&&(is_safari)){is_safari=false}if(!is_safari){with(pix){$canvas.attr({width:width,height:height});context.webkitImageSmoothingEnabled=context.mozImageSmoothingEnabled=context.imageSmoothingEnabled=false;context.setTransform(multi,0,0,multi,0,0);context.drawImage(min.canvas,0,0);src.$canvas.css({display:"none"});min.$canvas.css({display:"none"});pix.$canvas.css({display:"block"})}}}else{if(this.get("isMosaic")){src.$canvas.css({display:"block"});min.$canvas.css({display:"none"});pix.$canvas.css({display:"none"});this.set("isMosaic",false);this.get("controller").send("doMosaicFinished")}}}}}},resize:function(){this._super();var e=$("canvas",this.get("$el")),d=App.BREAKPOINT,c,b,a=this.tmpwinWidth=$(window).width(),f=this.tmpwinHeight=$(window).height();if(a>d.WIDTH_2&&f>d.HEIGHT_2*1.5){c="canvas-hero";b="canvas-hero-holder"}else{if(a>d.WIDTH_1&&f>d.HEIGHT_1*1.5){c="canvas-hero-med";b="canvas-hero-holder-med"}else{c="canvas-hero-small";b="canvas-hero-holder-small"}}e.removeClass("canvas-hero canvas-hero-med canvas-hero-small");e.addClass(c);e.parent().removeClass("canvas-hero-holder canvas-hero-holder-med canvas-hero-holder-small");e.parent().addClass(b)},willDestroyElement:function(){createjs.Tween.removeTweens(this.get("multiTween"));this._super()}});