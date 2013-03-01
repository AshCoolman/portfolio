PortfolioApp.Dimension1Route = Em.Route.extend({
	connectOutlets: function(router) {
		console.log('Dimension1Route connectOutlets()')
		router.get('portfolioAppController')
	}
})