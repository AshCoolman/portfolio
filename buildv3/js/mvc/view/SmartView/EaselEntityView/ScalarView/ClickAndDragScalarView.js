App.ClickAndDragScalarView = App.ScalarView.extend({	
	templateName: 'click-and-drag-scalar',
	COLOR: "#ff6666",
	MOD: 2,
	scaleList: [{
			val:55,
			label: 'wpm'
		},
		{
			val:67,
			label: 'Kg'
		},
		{
			val:167,
			label: 'cm'
		},
		{
			val:32,
			label: ' years old'
		},
	],
	init: function () {
		this._super();
		
		this.set('eslObjSettings',
			$.extend(
				this.get('eslObjSettings'), 
				{
					width: 200,
					height:320,
					x: 0,
					y: 0,
					fromController: ['x', 'y', 'width', 'height']
				}
			)
		);
		this.drawInstructions = this.get('drawInstructions');
		
		this.drawInstructions.smallMarks.markHeights = [4]
		this.drawInstructions.isMirrored = false;
		this.MOD = this.get('MOD');
		return this;
	},
	didInsertElement: function () {
		this._super();

		return this;
	},
	
	override_createEsl: function () {
		this.container = new createjs.Container();
		
		
		this.shp = new createjs.Shape();
		this.shp.x = 0.5;
		this.container.addChild( this.shp );
		this.text = new createjs.Text('', "24px Arial", this.get('COLOR'));
		this.text.textBaseline = "alphabetic";
		this.container.addChild( this.text );
		
		
		

				
		var scaleColor = '#ffffff',
			scaleList = this.get('scaleList');
		for (var sc = 0; sc < scaleList.length; sc++) {	
			var scObj = scaleList[sc],
				acontainer = new createjs.Container(),
				ashp = new createjs.Shape(),
				atext = new createjs.Text(scObj.val+' '+scObj.label,  "12px Arial", scaleColor);
				acontainer.addChild( ashp ),
				acontainer.addChild( atext );
				this.container.addChild( acontainer ),
				verticalRise =  - scObj.val ;
				
			atext.x = Math.round(scObj.val * this.MOD);
			ashp.graphics.clear()
					.setStrokeStyle(1)
					.beginStroke(scaleColor)
					.moveTo(0, 0)
					.lineTo(atext.x, 0)
					.lineTo(atext.x, verticalRise)
					.endStroke();
			ashp.x = 0.5;
			atext.y = verticalRise - 20;
			acontainer.alpha = 0;
			scObj.esl = acontainer;
		}
		
		
						
						
		return this.container;
	},
	override_draw: function (asettings) {
		this._super(asettings); 
		this.shp.addEventListener('tick', function (me) {
			return function () {
				me.tryListenMouseMove();
			}
		}(this));

	},
	tryListenMouseMove: function () {
		var shp = this.shp,
			text = this.text,
			graphics = shp.graphics,
			drawInstructions = this.drawInstructions,
			smallMarks = drawInstructions.smallMarks,
			bigMarks = drawInstructions.bigMarks,
			stage = shp.getStage(),
			canvas = stage.canvas,
			shpOffset = - shp.x + (stage.canvas.width - shp.width) /2,
			COLOR = this.get('COLOR'),
			val;
		
			
		if (stage) {
			$(stage.canvas).mousemove(function (me) {
				return function (e) {
					val = Math.round(stage.mouseX - shpOffset) / me.MOD;
					var2d  = val * me.MOD,
					valDir = Math.round(val / Math.abs(val));
					valAbs = Math.abs(val);
					text.x = 10 + var2d;
					text.y = -15 + shp.y;
					
					graphics.clear()
						.setStrokeStyle(1)
						.beginStroke(COLOR)
						.moveTo(0, 0)
						.lineTo(var2d, 0)
						.endStroke();
							
					markHeight = smallMarks.markHeights[smallMarks.markHeights.length-1];
					for (var s = 1; s * smallMarks.unit < valAbs; s++) {
						graphics.setStrokeStyle(1)
							.beginStroke(COLOR)
							.moveTo(Math.round(valDir * s * smallMarks.unit, markHeight))
							.lineTo(Math.round(valDir * s * smallMarks.unit, -markHeight))
							.endStroke();
					}
							
							
					markHeight = bigMarks.markHeights[bigMarks.markHeights.length-1];
					for (var s = 1; s * bigMarks.unit < valAbs; s++) {
						graphics.beginStroke(COLOR)
							.moveTo(valDir * s * bigMarks.unit, markHeight)
							.lineTo(valDir * s * bigMarks.unit, -markHeight)
							.endStroke();
					}
					
					
					
					var textStr = '',
						scObj,
						scaleList = me.get('scaleList');
						
					for (var sc = 0; sc < scaleList.length; sc++) {	
						if ( Math.abs(scaleList[sc].val- val) < 5) {
							createjs.Tween.get(scaleList[sc].esl, {override:true}).to({alpha:1}, 180).wait(1500).to({alpha:0}, 700);
						}
						
					}
					text.text = textStr;
					
				}
			}(this));
			this.shp.removeAllEventListeners('tick');
		}
		
		

		
	},
	override_reDraw: function () {
		
		
	},
	drawScale: function (mouseX) {

	}
	
});