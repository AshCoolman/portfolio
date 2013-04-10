PortfolioApp.AshView = PortfolioApp.PersonView.extend({
	easelObj: null,
	templateName: 'ash',
	tag: 'div',
	className: 'AshView',
	didInsertElement: function (aview) {
		this._super(aview);

	
		this.easelObj = new createjs.Shape();
		this.easelImg = new createjs.Bitmap('img/face-ash.png').image;
		
		
		this.get('controller').send('view_createdEaselDisplayObject', 'ash', this.easelObj, this);
		
	},
	redraw: function(canvasContext, width, height) {
		//canvasContext.webkitImageSmoothingEnabled = canvasContext.mozImageSmoothingEnabled = false;
		canvasContext.fillStyle = canvasContext.createPattern(this.easelImg, 'repeat');
	    canvasContext.fillRect(0, 0, 32, 32);
	}
	
	
	
});