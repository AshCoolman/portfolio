var Router = Backbone.Router.extend({
	initialize: function() {
		console.info('Router.js> initlialize()');
	},
	routes: {
		'*actions':'defaultRoute'
	}
});

var router = new Router();
router.on('route:defaultRoute', function (actions) {
    console.info('Router.js> initlialize().on(): ', actions ); 
});

// Start Backbone history a necessary step for bookmarkable URL's
Backbone.history.start();
