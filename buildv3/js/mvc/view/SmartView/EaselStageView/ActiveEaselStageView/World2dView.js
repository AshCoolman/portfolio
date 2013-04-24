App.World2dView = App.ActiveEaselStageView.extend({
	tagName:'div',
	className: 'World2dView',
	templateName:'world-2d',
	multi: 10,
	src: {},
	vis: {},
	$editorBtn: null,
	$editor: null,
	scale: 1,
	isVis: false,
	didInsertElement: function(scope) {
		console.log('World2dView.didInsertElement')
		with (this) {
			_super();
			get('controller').send('view_didInsertElement', this);
			
			src.$canvas = $canvas.addClass('src-world-2d');
			src.context = src.$canvas[0].getContext("2d");
			src.stage = stage;
			//src.stage.scaleX=src.stage.scaleY=multi;
			src.stage.mouseMoveOutside = true;
			
			
			if (isVis) {
				$el.append('<canvas class="vis-world-2d">');
				vis.$canvas = $('.vis-world-2d', $el);
				vis.$canvas.css({display:'none'});
				vis.context = vis.$canvas[0].getContext("2d");
				vis.src = src;
				src.vis = vis;
			}
		}
	},
	addCog: function () {
		console.log('adding cog')
		App.static_easelEntityContainerView.pushObject( App.CogView.create( {controller: App.CogController.create() }));
	},
	addPixel: function () {
		console.log('adding pixel')
		var controller = App.PixelController.create();
		var easelObjSettings = $.extend(App.PixelView.create().easelObjSettings, { x: 0, y: 0 });
		var view = App.PixelView.create( {controller: controller, easelObjSettings: easelObjSettings} 	);
		App.static_easelEntityContainerView.pushObject( view );
	}, 
	resize: function() {
		with (this) {	
			_super();
			if (isVis) vis.$canvas.attr( { width: width, height: height } ).css( 'background-color', tmpbgcolor );
		}
	},
	redraw: function(dur) {
		with (this) {
			_super(dur);
			if (src.ashView){
				src.ashView.override_redraw(dur);
			}


			if (isVis) {
				with (vis) {
					context.webkitImageSmoothingEnabled = 
					context.mozImageSmoothingEnabled = false;
					context.setTransform(1 * multi,0,0,1 * multi,0,0);
					vis.context.fillStyle = vis.bgcolor;
					vis.context.fillRect( 0, 0, width, height);
					context.fillStyle = context.createPattern(src.$canvas[0], 'repeat');
					context.fillRect(0, 0, width, height)
				}
			}
		}
	},
	addEaselEnt: function (label, childView) {
		this._super(label, childView)
		if (label === 'ash') {
			this.src.ashView = childView;
		}
	}

});
