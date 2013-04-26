App.CogView = App.EaselEntityView.extend({
	templateName: 'cog',
	className: 'CogView',
	cog: null,
	dragger: null,
	override_createEasel: function() {
		this.cog = new createjs.Bitmap('img/cog.png');
		this.cog.image.onload = (function(me){ 
			return function () {
				me.cog.isImgLoaded = true;
				me.override_draw();
			}
		}(this));
		this.dragger = new createjs.Container();
		this.dragger.addChild(this.cog);
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
		if (this.cog.isImgLoaded) {
			this.cog.regX = this.cog.image.width / 2;
			this.cog.regY = this.cog.image.height / 2;
		}
		this.cog.scaleX = this.cog.scaleY = 0.08;		
		
		//this.dragger.regX = -this.cog.scaleX * this.cog.image.width / 2;
		//this.dragger.regY = -this.cog.scaleY * this.cog.image.height / 2;
			
		if (settings.x) this.dragger.x = Number( settings.x );
		if (settings.y) this.dragger.y = Number( settings.y );
		return this.dragger;
	},
	override_redraw: function () {

	},
	willDestroyElement: function() {
		this._super();
		this.cog = this.dragger = null;
	}
});