this.createjs=this.createjs||{};(function(){var a=function(){throw"Ease cannot be instantiated."};a.linear=function(b){return b};a.none=a.linear;a.get=function(b){if(b<-1){b=-1}if(b>1){b=1}return function(c){if(b==0){return c}if(b<0){return c*(c*-b+1+b)}return c*((2-c)*b+(1-b))}};a.getPowIn=function(b){return function(c){return Math.pow(c,b)}};a.getPowOut=function(b){return function(c){return 1-Math.pow(1-c,b)}};a.getPowInOut=function(b){return function(c){if((c*=2)<1){return 0.5*Math.pow(c,b)}return 1-0.5*Math.abs(Math.pow(2-c,b))}};a.quadIn=a.getPowIn(2);a.quadOut=a.getPowOut(2);a.quadInOut=a.getPowInOut(2);a.cubicIn=a.getPowIn(3);a.cubicOut=a.getPowOut(3);a.cubicInOut=a.getPowInOut(3);a.quartIn=a.getPowIn(4);a.quartOut=a.getPowOut(4);a.quartInOut=a.getPowInOut(4);a.quintIn=a.getPowIn(5);a.quintOut=a.getPowOut(5);a.quintInOut=a.getPowInOut(5);a.sineIn=function(b){return 1-Math.cos(b*Math.PI/2)};a.sineOut=function(b){return Math.sin(b*Math.PI/2)};a.sineInOut=function(b){return -0.5*(Math.cos(Math.PI*b)-1)};a.getBackIn=function(b){return function(c){return c*c*((b+1)*c-b)}};a.backIn=a.getBackIn(1.7);a.getBackOut=function(b){return function(c){return(--c*c*((b+1)*c+b)+1)}};a.backOut=a.getBackOut(1.7);a.getBackInOut=function(b){b*=1.525;return function(c){if((c*=2)<1){return 0.5*(c*c*((b+1)*c-b))}return 0.5*((c-=2)*c*((b+1)*c+b)+2)}};a.backInOut=a.getBackInOut(1.7);a.circIn=function(b){return -(Math.sqrt(1-b*b)-1)};a.circOut=function(b){return Math.sqrt(1-(--b)*b)};a.circInOut=function(b){if((b*=2)<1){return -0.5*(Math.sqrt(1-b*b)-1)}return 0.5*(Math.sqrt(1-(b-=2)*b)+1)};a.bounceIn=function(b){return 1-a.bounceOut(1-b)};a.bounceOut=function(b){if(b<1/2.75){return(7.5625*b*b)}else{if(b<2/2.75){return(7.5625*(b-=1.5/2.75)*b+0.75)}else{if(b<2.5/2.75){return(7.5625*(b-=2.25/2.75)*b+0.9375)}else{return(7.5625*(b-=2.625/2.75)*b+0.984375)}}}};a.bounceInOut=function(b){if(b<0.5){return a.bounceIn(b*2)*0.5}return a.bounceOut(b*2-1)*0.5+0.5};a.getElasticIn=function(b,d){var c=Math.PI*2;return function(e){if(e==0||e==1){return e}var f=d/c*Math.asin(1/b);return -(b*Math.pow(2,10*(e-=1))*Math.sin((e-f)*c/d))}};a.elasticIn=a.getElasticIn(1,0.3);a.getElasticOut=function(b,d){var c=Math.PI*2;return function(e){if(e==0||e==1){return e}var f=d/c*Math.asin(1/b);return(b*Math.pow(2,-10*e)*Math.sin((e-f)*c/d)+1)}};a.elasticOut=a.getElasticOut(1,0.3);a.getElasticInOut=function(b,d){var c=Math.PI*2;return function(e){var f=d/c*Math.asin(1/b);if((e*=2)<1){return -0.5*(b*Math.pow(2,10*(e-=1))*Math.sin((e-f)*c/d))}return b*Math.pow(2,-10*(e-=1))*Math.sin((e-f)*c/d)*0.5+1}};a.elasticInOut=a.getElasticInOut(1,0.3*1.5);createjs.Ease=a}());