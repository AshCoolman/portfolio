App.Dimension1Controller = Em.ObjectController.extend({
	className:'Dimension1Controller',
	wpm:0,
	interactiveGridData:'interactiveGridText',
	init: function () {
		this._super();
		console.log('listening interactiveGridText');
		App.eventMapper.addEventListener('interactiveGridText', this, function (me) {
			return function (type, data) {
				me.set('interactiveGridData', data);
			}
		}(this));
	}
})