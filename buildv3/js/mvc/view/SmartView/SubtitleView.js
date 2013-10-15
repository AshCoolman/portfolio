App.SubtitleView = App.SmartView.extend({
	name:'Subtitle',
	templateName:'subtitle',
	subtitleText:'Lorum ipsum',  
	tagName: 'div',
	didInsertElement: function(a, b, c) {
		this._super();
		if (!this.get('didInsertElementExecuted')) {

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
			if (this.get('controller').get('isInstant')) {
				this.get('$el').addClass('fader fade-out');
			}
			console.log('didInsertElement (with remove)', this.get('controller.orderRead'));
			this.doRemove();
			this.set('didInsertElementExecuted', true)
		}
	},
	
	doShow: function () {
		var elId = $(this.get('el'))[0].id;
		console.log('doShow', elId, $('#'+elId));
		$('#'+elId).css('display', 'block');
		this.get('$el').css('display', 'block');
	},
	
	doRemove: function () {
		var elId = $(this.get('el'))[0].id;
		console.log('doRemove', elId);
		$('#'+elId).css('display', 'none');
		this.get('$el').css('display', 'none');
	},
	
	//Instantly typed text appears all at once
	doShowInstant: function () {
		this.doShow();
		setTimeout(function (me) {
			return function () {
				me.get('$el').removeClass('fade-out').addClass('fade-in');
			}
		}(this), 0)
		
	},
	
	willDestroyElement: function () {
		this._super();
		$('.text', this.get('$el')).unbind('mouseenter');
		$('.text', this.get('$el')).unbind('mouseleave');
		$('.text', this.get('$el')).unbind('click');
	}
});

