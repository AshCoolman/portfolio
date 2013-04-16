App.CogView = App.EaselEntityView.extend({
	easelObj: null,
	templateName: 'cog',
	tag: 'div',
	className: 'CogView',
	gridSnap: 50,
	didInsertElement: function (aview) {
		this._super();
		console.log('CogView.didInsertElement')
		this.bmp = new createjs.Bitmap('img/cog.png');
		this.bmp.image.onload = (function(aeaselObj){
			return function(){
				with (aeaselObj) {
					regX = image.width/2;
					regY = image.height/2;
					scaleX = scaleY = 0.1;
				}	
			}
		}(this.bmp));
		
		this.easelObj = dragger = new createjs.Container();

		
		
		var controller = this.get('controller');
		
		dragger.addChild(this.bmp);
		
		dragger.x = Number(controller.x);
		dragger.y = Number(controller.y);
		
		dragger.addEventListener("mousedown", 	(function(me) {
													return function(evt) {
														var offset = {x:evt.target.x-evt.stageX, y:evt.target.y-evt.stageY};
                
														// add a handler to the event object's onMouseMove callback
														// this will be active until the user releases the mouse button:
														evt.addEventListener("mousemove", function(ev) {
															var controller = me.get('controller');
														    controller.x = ev.target.x = me.snap(ev.stageX+offset.x);
															controller.y = ev.target.y = me.snap(ev.stageY+offset.y);
														});
					
													}
												}(this)));
		
		
		this.get('controller').send('view_easelObjectCreated', this);
	},
	redraw: function () {

		this.easelObj.rotation++;
	},
	snap: function (val) {
		return Math.round( val / this.gridSnap) * this.gridSnap;
	}
});