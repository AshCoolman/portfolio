App.EaselStageView = App.SmartView.extend({
	tagName:'div',
	className: 'EaselStageView',
	easelEntities: [],
	canvas: null, 
	$canvas: null,
	stage: null,
	didInsertElement: function(scope) {
		with (this) {
			_super();
			canvas = $el.append('<canvas class="easel-stage-canvas">');
			$canvas = $('.easel-stage-canvas', $el);
			stage = new createjs.Stage( $canvas[0] );
		}	
	},
	addEaselEnt: function (label, childView) {
 		console.log('addEaselEnt', label, childView, childView.get('easelObj') )
		this.easelEntities.push( childView );
		this.stage.addChild( childView.get('easelObj') );
	}

});
