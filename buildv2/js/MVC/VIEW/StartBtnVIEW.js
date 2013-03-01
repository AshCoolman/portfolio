StartBtnVIEW = Backbone.View.extend({
	me:this,
	initialize: function () {
		
		console.info('StartBtnVIEW> initialize()');
		(function(scope) {
			$.get('js/MVC/VIEW/TEMPLATES/StartBtnTEMPLATE.tpl', '', function(responseText, textStatus, XMLHttpRequest){
				scope.render(responseText);
			})
			.fail(function() {
				console.error('StartBtnVIEW> Template $.load().fail() > ', jqxhr, settings, exception);
			});
		})(this)
	},
    events: {
         "click input[type=button]": "doStart"
    },
	render: function(atemplate) {
		console.info('StartBtnVIEW> render()', this.$el);
		var template = _.template(atemplate);
		this.$el.html(template)
	},
	doStart: function() {
		console.log('StartBtnVIEW> doStart', this.options.waveformMODEL);
		this.options.waveformMODEL.play();
	}
});