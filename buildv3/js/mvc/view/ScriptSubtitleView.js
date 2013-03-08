PortfolioApp.ScriptSubtitleView = Ember.View.extend({
	name:'ScriptSubtitle',
	templateName:'script-subtitle',
	subtitleText:'Lorum ipsum',
	didInsertElement: function() {
  		this.get('controller').send('didInsertView', this); 
	}
});
