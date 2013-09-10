App.HashBtnView = App.SmartView.extend({
	name:'HashBtn',
	templateName:'hash-btn',
	doHide: function() {
		$('button', this.get('$el')).attr("disabled", true);
	},

	doShow: function () {
		$('button', this.get('$el')).attr("disabled", false);
	}

});
