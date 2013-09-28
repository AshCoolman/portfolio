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
					if (!me.get('controller').get('isEnded') && !me.get('controller').get('isEdit'))
						me.get('controller').set('isHoverUnfinished', true);
					me.get('controller').send('doHover', true);
			    }
			}(this),
			function (me) {
				return function () {
			    	me.get('controller').set('isHover', false);
			    	me.get('controller').set('isHoverUnfinished', false);
					me.get('controller').send('doHover', false);
			    }
			}(this)
		);
		$('.text', this.get('$el')).on( 'click', 'span', function (me) {
			return function () {
				me.get('controller').send('doClicked');
			}
		}(this) );
		return this._super();
	},
	
	willDestroyElement: function () {
		this._super();
		$('.text', this.get('$el')).unbind('mouseenter');
		$('.text', this.get('$el')).unbind('mouseleave');
		$('.text', this.get('$el')).unbind('click');
	},
	doRemove: function () {
		console.log('removing')
		this.get('$el').css('display', 'none');
	}
});

