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
			
				console.log('App.EaselStageView.didInsertElement() new Stage', this.stage)
			stage.x = stage.y = 0.5; //http://stackoverflow.com/questions/6672870/easeljs-line-fuzziness
			
		}	
	},
	addEaselEnt: function (label, childView) {
		console.log('EaselStageView.addEaselEnt() label', label )
		console.log('EaselStageView.addEaselEnt() added', childView )
		console.log('EaselStageView.addEaselEnt() stage', this.stage )
		
		
		this.easelEntities.push( childView );
		this.stage.addChild( childView.get('easelObj') );
		console.log('EaselStageView.addEaselEnt()' )
		console.log('		>>', this.easelEntities.length);
	},
	willDestroyElement: function () {
		console.log('!!! EaselStageView ')
		this.easelEntities = []
		console.log('EaselStageView.willDestroyElement()' )
		console.log('		>>', this.easelEntities.length);
		this.stage.removeAllChildren();
		this.stage.removeAllEventListeners();
	}

});
