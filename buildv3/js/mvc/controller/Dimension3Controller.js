App.Dimension3Controller = Em.ObjectController.extend({
	className:'Dimension3Controller',
	modernizr: Modernizr,
	isSubtitle:true,
	doRemoveSubtitle: function () {
		this.set('isSubtitle', false);
	}
});