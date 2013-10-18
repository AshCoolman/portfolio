App.Dimension1Controller = Em.ObjectController.extend({
	className:'Dimension1Controller',
	wpm:0,
	interactiveGridData:[],
	init: function () {
		this._super();
		App.eventMapper.addEventListener('interactiveGridText', this, function (me) {
			return function (type, data) {
				me.set('interactiveGridData', data);
			}
		}(this));
	}
})