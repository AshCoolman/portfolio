PortfolioApp.AshView = PortfolioApp.PersonView.extend({
	easelObj: null,
	templateName: 'ash',
	tag: 'div',
	className: 'AshView',
	didInsertElement: function (aview) {
		this._super((aview) ? aview : this);
		console.log('AshView.didInsertElement', this.get('parentView')._debugContainerKey);
		
		this.easelObj = new createjs.Bitmap('img//face-ash.png');
		this.get('controller').send('easelDisplayObjectCreatedByChildView', 'ash', this);
	},
	redraw: function(){
		this._super();
			if (this.easelObj) {
				with (this.easelObj) {
					x = (x > 1200) ? -300 : x+10;
				}
			}
	}
	
	
});