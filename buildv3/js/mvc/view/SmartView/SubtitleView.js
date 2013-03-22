PortfolioApp.SubtitleView = PortfolioApp.SmartView.extend({
	name:'Subtitle',
	templateName:'subtitle',
	subtitleText:'Lorum ipsum',       
	didInsertElement: function(a, b, c) {
		if (!a) { //WTF...
			//this.$().addClass(this.templateName);
		}
		console.log('>>', this.smartViewObj)
		//this.__proto__.didInsertElement.call(this);
  		this.get('controller').send('SubtitleView_InsertViewDone', this);
		return this._super();
	}
});