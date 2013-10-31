App.ModernizrReportView = App.SmartView.extend({
	templateName: 'modernizr-report',
	didInsertElement: function () {
		this._super();
		
		$(this.get('el')).foundation('alerts');
	}
})