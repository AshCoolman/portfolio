this.createjs=this.createjs||{};(function(){var a=function(){throw ("CSSPlugin cannot be instantiated.")};a.cssSuffixMap={top:"px",left:"px",bottom:"px",right:"px",width:"px",height:"px",opacity:""};a.priority=-100;a.install=function(){var b=[],c=a.cssSuffixMap;for(var d in c){b.push(d)}createjs.Tween.installPlugin(a,b)};a.init=function(k,b,j){var f,e,d,c=a.cssSuffixMap;if((f=c[b])==null||!(d=k.target.style)){return j}var h=d[b];if(!h){return 0}var g=h.length-f.length;if((e=h.substr(g))!=f){throw ("CSSPlugin Error: Suffixes do not match. ("+f+":"+e+")")}else{return parseInt(h.substr(0,g))}};a.step=function(e,f,d,c,b){};a.tween=function(k,d,j,e,f,i,h,g){var c,b=a.cssSuffixMap;if(b[d]==null||!(c=k.target.style)){return j}c[d]=j+b[d];return createjs.Tween.IGNORE};createjs.CSSPlugin=a}());