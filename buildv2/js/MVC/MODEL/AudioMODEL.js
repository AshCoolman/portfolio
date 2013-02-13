AudioMODEL = Backbone.Model.extend({
	defaults: {
		volumeMap:null
	},
	initialize: function() {
		console.info('AudioMODEL > initialize()');
	}
});