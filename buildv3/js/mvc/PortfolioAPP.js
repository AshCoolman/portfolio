
console.log('.portfolio-app-container', $('.portfolio-app-container')[0])
PortfolioApp = Ember.Application.create({

	rootElement:$('.portfolio-app-container')[0]	/*,
	ready: function () {
		var MVCFiles = [
		 
		'js/mvc/controller/StartBtnCONTROLLER.js',
		'js/mvc/controller/WaveformCONTROLLER.js',
		
		'js/mvc/model/WaveformMODEL.js',
		
		'js/mvc/router/IndexRoute.js',
		'js/mvc/router/Dimension1Route.js',
		 
		'js/mvc/view/AudioVIEW.js',
		'js/mvc/view/StartBtnVIEW.js'
		];
		
		var templateFiles = ['js/mvc/template/StartBtnTEMPLATE.hbs'];
		var tryStartMVC = function (aMVCFiles) {
			if (MVCFiles.length == 0 && templateFiles.length == 0) {

				
				PortfolioApp.Router = Em.Router.extend({
					root: Ember.Route.extend({
						index: PortfolioApp.IndexRoute.extend({
							route: '/'
						}),
						dimension1: PortfolioApp.Dimension1Route.extend({
							route: 'dimension1'
						})
					})
				});


				console.log('Starting MVC');
			}
		}
		for (var c = 0; c < MVCFiles.length; c++) {
			(function (aclassName) {
				//tbt I am haze as to whether I need a closure to protect the scope here.
				$.getScript(aclassName)
					.done(function (script, text) {
					MVCFiles.splice(MVCFiles.indexOf(aclassName), 1);
					tryStartMVC();
				})
					.fail(function (jqxhr, settings, errorThrown) {
					console.error('$.getScript().fail() > ', jqxhr, settings, errorThrown);
				})
			})(MVCFiles[c]);
		}
		for (var t = 0; t < templateFiles.length; t++) {
			(function (atemplateName) {
				//tbt I am haze as to whether I need a closure to protect the scope here.
				$.ajax(atemplateName)
					.done(function (script, text) {
					templateFiles.splice(templateFiles.indexOf(atemplateName), 1);
					var slashed = atemplateName.split('/');
					var dasherized = slashed[slashed.length - 1].split('.')[0].dasherize();
					Em.TEMPLATES[dasherized] = Em.Handlebars.compile(script);
					tryStartMVC();
				})
					.fail(function (jqXHR, textStatus, errorThrown) {
					console.error('$.ajax().fail() > ', jqxhr, settings, errorThrown);
				})
			})(templateFiles[t]);
		}
	}*/
});
Em.Object.reopenClass({
	create: function (config) {
		return this._super().setProperties(config);
	}
});