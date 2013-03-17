PortfolioApp.SubtitleView = Ember.View.extend({
	name:'Subtitle',
	templateName:'script-subtitle',
	subtitleText:'Lorum ipsum',       
	didInsertElement: function() {
  		this.get('controller').send('InsertViewDone', this); 
	},
	setupController: function() {
		console.log('setupController')
	}
});