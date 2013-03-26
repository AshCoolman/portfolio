PortfolioApp.SubtitleView = PortfolioApp.SmartView.extend({
	name:'Subtitle',
	templateName:'subtitle',
	subtitleText:'Lorum ipsum',       
	didInsertElement: function(a, b, c) {
  		this.get('controller').send('SubtitleView_InsertViewDone', this);
		return this._super();
	}
});

