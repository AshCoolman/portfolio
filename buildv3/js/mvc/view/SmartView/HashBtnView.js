App.HashBtnView = App.SmartView.extend({
	name:'HashBtn',
	templateName:'hash-btn',
	doHide: function() {
		$('button', this.$el).attr("disabled", true);
	},

	doShow: function () {
		$('button', this.$el).attr("disabled", false);
	}

});
