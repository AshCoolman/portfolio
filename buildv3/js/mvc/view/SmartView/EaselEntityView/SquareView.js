PortfolioApp.SquareView = PortfolioApp.EaselEntityView.extend({
	easelObj: null,
	templateName: 'square',
	tag: 'div',
	className: 'SquareView',
	init: function () {
		return this._super();
	},
	didInsertElement: function (aview) {
		this._super((aview) ? aview : this);
		
		console.log('SquareView.didInsertElement', 'parentView:'+this.get('parentView')._debugContainerKey);
		this.bmp = new createjs.Bitmap('img/cog.png');
		this.bmp.image.onload = (function(aeaselObj){
			return function(){
				with (aeaselObj) {
					scaleX = scaleY = 0.1;
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
		
		this.get('controller').send('easelDisplayObjectCreatedByChildView', 'square', this);
	},
	redraw: function () {
		this._super();
		this.easelObj.rotation++;
	}
});