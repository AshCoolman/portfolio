PortfolioApp.SquareView = PortfolioApp.EaselEntityView.extend({
	easelObj: null,
	templateName: 'square',
	tag: 'div',
	className: 'SquareView',
	didInsertElement: function (aview) {
		this._super(aview);
		this.bmp = new createjs.Bitmap('img/cog.png');
		this.bmp.image.onload = (function(aeaselObj){
			return function(){
				with (aeaselObj) {
					scaleX = scaleY = 0.05;
					regX = image.width/2;
					regY = image.height/2;
				}
			}
		}(this.bmp));
		
		this.easelObj = dragger = new createjs.Container();
		//dragger.x = dragger.y = 10;
		dragger.addChild(this.bmp);

		dragger.addEventListener("mousedown", function(evt) {
			console.log('+')
			var offset = {x:evt.target.x-evt.stageX, y:evt.target.y-evt.stageY};
                
			// add a handler to the event object's onMouseMove callback
			// this will be active until the user releases the mouse button:
			evt.addEventListener("mousemove",function(ev) {
			    ev.target.x = ev.stageX+offset.x;
				ev.target.y = ev.stageY+offset.y;
		
			});
		});
		
		console.log('this.easelObj', this.easelObj, this.easelObj.cacheCanvas)
		this.get('controller').send('viewCreatedEaselDisplayObject', 'square', this);
	},
	redraw: function () {
		this._super();
		this.easelObj.rotation++;
	}
});