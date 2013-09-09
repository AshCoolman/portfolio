App.SubtitleView = App.SmartView.extend({
	name:'Subtitle',
	templateName:'subtitle',
	subtitleText:'Lorum ipsum',  
	tagName: 'div',
	didInsertElement: function(a, b, c) {
		this._super();

		$('.text', this.get('$el')).hover( 
			function (me) {
			    return function () {
			    	me.get('controller').set('isHover', true);
			    }
			}(this),
			function (me) {
				return function () {
			    	me.get('controller').set('isHover', false);
			    }
			}(this)
		);
		$('.text', this.get('$el')).on( 'click', 'span', function (me) {
			return function () {
				me.get('controller').send('doClicked')
			}
		}(this) );
		return this._super();
	}
});

