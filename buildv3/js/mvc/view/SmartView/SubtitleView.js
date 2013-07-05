App.SubtitleView = App.SmartView.extend({
	name:'Subtitle',
	templateName:'subtitle',
	subtitleText:'Lorum ipsum',       
	didInsertElement: function(a, b, c) {
		this._super();
		this.$el.click( function (me) {
			return function () {
				me.get('controller').send('doForceFinish')
			}
		}(this) );
		return this._super();
	}
});

