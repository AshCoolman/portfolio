App.IndexRoute = Em.Route.extend({
	activate: function() { 	
		destroys=[];
		destroyEls=[];
	},
	deactivate: function() { 
		for (var de=0; de<destroyEls.length; de++) 	destroyEls[de].destroyElement();
		for (var d=0; d<destroys.length; d++) destroys[d].destroy();
		destroys=[];
		destroyEls=[];
	},
	renderTemplate: function() { 
		this.render('index');
	}
})

