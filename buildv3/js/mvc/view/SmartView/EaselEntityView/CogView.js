App.CogView = App.EaselEntityView.extend({
	templateName: 'cog',
	className: 'CogView',
	override_createEasel: function() {
		this.bmp = new createjs.Bitmap('img/cog.png');
		this.bmp.image.onload = (function(me){ 
			return function () {
				me.bmp.isImgLoaded = true;
				me.override_draw();
			}
		}(this));
		this.dragger = new createjs.Container();
		this.dragger.addChild(this.bmp);
		this.dragger.addEventListener("mousedown", 	(function(me) { return function(evt) {
			var offset = {x:evt.target.x-evt.stageX, y:evt.target.y-evt.stageY};
			evt.addEventListener("mousemove", function(ev) {
			    ev.target.x = me.snap(ev.stageX+offset.x);
				ev.target.y = me.snap(ev.stageY+offset.y);
			});
		} }(this)));
		return this.dragger;
	},
	override_draw: function (asettings) {
		var settings = asettings ? asettings : this.easelObj;
		Em.assert('CogView.override_draw(): function called before easelObj was created ', this.easelObj)
		if (this.bmp.isImgLoaded) {
			this.bmp.regX = this.bmp.image.width / 2;
			this.bmp.regY = this.bmp.image.height / 2;
		}
		this.bmp.scaleX = this.bmp.scaleY = 0.06;		
		
		//this.dragger.regX = -this.bmp.scaleX * this.bmp.image.width / 2;
		//this.dragger.regY = -this.bmp.scaleY * this.bmp.image.height / 2;
			
		if (settings.x) this.dragger.x = Number( settings.x );
		if (settings.y) this.dragger.y = Number( settings.y );
		return this.dragger;
	},
	override_redraw: function () {
		this.bmp.rotation++;
	}
});