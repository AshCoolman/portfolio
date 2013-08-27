App.SubtitleView = App.SmartView.extend({
	name:'Subtitle',
	templateName:'subtitle',
	subtitleText:'Lorum ipsum',  
	tagName: 'div',
	didInsertElement: function(a, b, c) {
		this._super();
		//console.log('layoutName', this.get('layoutName'), this.get('controller').get('layoutName'));
		this.$el.hover( 
			function (me) {
			    return function () {
			    	me.get('controller').set('isHover', true);
					//console.log('isHover');
			    }
			}(this),
			function (me) {
				return function () {
			    	me.get('controller').set('isHover', false);
					//console.log('isHover off');
			    }
			}(this)
		);
		
		this.$el.click( function (me) {
			return function () {
				me.get('controller').send('doForceFinish')
			}
		}(this) );
		return this._super();
	}
	
});

