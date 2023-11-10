App.EslStageView = App.SmartView.extend({
	tagName:'div',
	className: 'EslStageView',
	test: ['t0'],
	testgs: ['gs0'],
	eslEntities: [],
	canvas: null, 
	$canvas: null,
	stage: null,
	init: function () {
		this.eslEntities.splice(0, this.eslEntities.length);
		return this._super();
	},
	didInsertElement: function(scope) {
		this.eslEntities = [];
		
		//console.log('[]')
		with (this) {
			_super();
			set('$canvasHeroHolder', $('.canvas-hero-holder', get('$el')));
			get('$canvasHeroHolder').append('<canvas class="esl-stage-canvas canvas-hero">');
			$canvas = $('.esl-stage-canvas', $el);
			stage = new createjs.Stage( $canvas[0] );
			stage.enableMouseOver(10);
			createjs.Touch.enable(stage);
			
			stage.x = 0.5
			stage.y = 0.0; //http://stackoverflow.com/questions/6672870/esljs-line-fuzziness
			
		}	
	},
	addEslEnt: function (label, childView, parentEslObj) {
		if (!parentEslObj ) {
			parentEslObj = this.stage;
		}
		//console.log('addEslEnt\n', '\t',label,'\n', '\t',childView,'\n', '\t',parentEslObj.id+'','\n');
		this.eslEntities.push( childView );
		parentEslObj.addChild( childView.get('eslObj') );
	},
	willDestroyElement: function () {
		this._super();
		this.stage.removeAllChildren();
		this.stage.removeAllEventListeners();
	  	this.eslEntities.splice(0, this.eslEntities.length);
		
		//console.log('-')
	}

});
