App.AshView = App.EslEntityView.extend({
	eslObj: null,
	className: 'AshView', 
	templateName: 'ash',
	tag: 'span',
	eslObjSettings: {
		x: 0,
		y: 0,
		fromController: ['x', 'y', 'img', 'scaleX']
	},
	override_createEsl: function (asettings) {
		var shp = new createjs.Shape();
		var img = new createjs.Bitmap(asettings.img);
		var container = new createjs.Container();
		container.addChild(shp);
		container.addChild(img);
		return container;
	},
	override_draw: function(asettings) {
		var settings = asettings ? asettings : this.get('eslObj')
 		this.get('eslObj').scaleX = settings.scaleX || 1;
		this.get('eslObj').x=settings.x; //-1; //HACK WHY?
		this.get('eslObj').y=settings.y; //-1; //HACK WHY?
		
		
	},
	willDestroyElement: function () {
		this.removeHammer();
	},
	doMosaicEffect: function () {
	
	},
	doHammer: function () {
		var spriteSheet = {
			images: ["img/hammer.png"],
			frames: {width:270, height:360},
			animations: {hammer:[0,2,'hammer', .1]}
		}
		var hammer = new createjs.Sprite(new createjs.SpriteSheet(spriteSheet), "hammer");
		hammer.framerate = 20;
		hammer.x = (parseInt(this.get('eslObj').x) + parseInt(App.PIXEL_SIZE * 6));
		hammer.y = (parseInt(this.get('eslObj').y) + parseInt(App.PIXEL_SIZE * 3));
		this.set('hammer', hammer);
		this.get('eslObj').parent.addChild(hammer);
		
	},
	removeHammer: function () {
		var hammer = this.get('hammer');
		if (hammer) {
			hammer.stop();
			var onCompleteFunc = function (me, ahammer) { 
				return function () {
					if (ahammer)
						ahammer.getStage().removeChild(ahammer);
					if (me.set)
						me.set('hammer', null);
				}
			}(this, hammer);
			
			var timeLine = new TimelineMax();
			timeLine.add(TweenMax.to(hammer, 0.5, {y:"-=120", yoyo:true, repeat:1,  ease:Ease.easeOut}));
			timeLine.add(TweenMax.to(hammer, 0.2, {delay:0.2, alpha:0, ease:Ease.easeOut}));
			timeLine.add(TweenMax.to(hammer, 0.0, {delay:1, alpha:0, ease:Ease.easeOut, onComplete: onCompleteFunc}))
			timeLine.resume();
		}
	},
	override_reDraw: function (dur) {
		
		var change = 30/1000 * dur; //per second
		if (this.get('eslObj')) {
			with (this.get('eslObj')) {
				//x = (x > 1200) ? -300 : x+change;
			}
		}
		
	}
	
});

