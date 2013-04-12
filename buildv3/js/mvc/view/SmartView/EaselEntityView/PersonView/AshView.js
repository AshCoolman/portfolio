PortfolioApp.AshView = PortfolioApp.PersonView.extend({
	easelObj: null,
	templateName: 'ash',
	tag: 'div',
	className: 'AshView',
	didInsertElement: function (aview) {
		this._super(aview);
		this.easelObj = new createjs.Bitmap('img/face-ash.png');
		this.get('controller').send('viewCreatedEaselDisplayObject', 'ash', this);
	}
	
	
});