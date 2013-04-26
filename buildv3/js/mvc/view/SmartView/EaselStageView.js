App.EaselStageView = App.SmartView.extend({
	tagName:'div',
	className: 'EaselStageView',
	test: ['t0'],
	testgs: ['gs0'],
	easelEntities: [],
	canvas: null, 
	$canvas: null,
	stage: null,
	init: function () {
		console.log('init: ' + this.easelEntities.join(', ')); 
		this.easelEntities.splice(0, this.easelEntities.length);
		return this._super();
	},
	didInsertElement: function(scope) {
		this.easelEntities = [];
		
		//console.log('[]')
		with (this) {
			_super();
			canvas = $el.append('<canvas class="easel-stage-canvas">');
			$canvas = $('.easel-stage-canvas', $el);
			stage = new createjs.Stage( $canvas[0] );
			
			stage.x = stage.y = 0.5; //http://stackoverflow.com/questions/6672870/easeljs-line-fuzziness
			
		}	
	},
	addEaselEnt: function (label, childView) {
		this.easelEntities.push( childView );
		console.log('+'+label, this.className)
		this.stage.addChild( childView.get('easelObj') );
	},
	willDestroyElement: function () {
		this._super();
		this.stage.removeAllChildren();
		this.stage.removeAllEventListeners();
	  	this.easelEntities.splice(0, this.easelEntities.length);
		
		//console.log('-')
	}

});
