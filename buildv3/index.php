<!DOCTYPE html>
<?php
	require('dBug.php');
?>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">

        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/main.css"> 
        <link rel="stylesheet" href="css/app.css">
        <link rel="stylesheet" href="css/grid.css">


		<!-- APPLICATION -->
		<script type="text/x-handlebars" data-template-name="application">
				{{outlet}}
		</script>
		
		<!-- APPLICATION ELEMENTS -->
		<script type="text/x-handlebars" data-template-name="hash-btn">
			<button {{action "doNavigate" }}> {{label}} </button>
		</script>
		
		<script type="text/x-handlebars" data-template-name="navigation">
			<div class="row">
				<div class="twelve columns">
				
					{{#if isIndex}}
						{{renderWithVars 'hash-btn' hashBtn urlhash="/" label="Index"}}
					{{/if}}

					{{#if isDimension1}}
						{{controlWithVars 'hash-btn' hashBtn urlhash="d1" label="Dimension 1"}}
					{{/if}}

					{{#if isDimension2}}
						{{controlWithVars 'hash-btn' hashBtn urlhash="d2" label="Dimension 2"}}
					{{/if}}
					
				</div>
			</div>
		</script>

		
		<!-- ROUTE INDEX -->
		<script type="text/x-handlebars" data-template-name="index">
			{{renderWithVars 'navigation' navigation isDimension1="true" isDimension2="true"}}
		</script>
		
		
		
		<!-- ROUTE DIMENSION 1 -->
		<script type="text/x-handlebars" data-template-name="dimension1">
			{{renderWithVars 'navigation' navigation isIndex="true" isDimension2="true"}}

			<div class="row">
				<div class="twelve columns">
					{{render 'heartbeat' heartbeat}}	
				</div>
			</div>

			<div class="row">
				<div class="twelve columns">
					<div class="subtitle-container">
						{{render 'subtitle' subtitle}}
					</div>
				</div>
			</div>
		</script>
		
			<script type="text/x-handlebars" data-template-name="heartbeat">
				<div class="nav-btn-holder">
					<button class="nav-btn" {{action "doStart" }}>Start!</button>
				</div>
				{{render "heartbeat-flash" heartbeatFlash}}
				{{render "heartbeat-sound" heartbeatSound}}
			</script>

			<script type="text/x-handlebars" data-template-name="heartbeat-flash">

			</script>

				<script type="text/x-handlebars" data-template-name="heartbeat-sound">

				</script>

		<script type="text/x-handlebars" data-template-name="subtitle">
			{{text}}
		</script>
		
		
		
		<!-- ROUTE DIMENSION 2 -->

		<script type="text/x-handlebars" data-template-name="dimension2">
			{{renderWithVars 'navigation' navigation isIndex="true" isDimension1="true"}}
			<div class="row">
				<div class="twelve columns">
					{{render 'world-2d-editor'}}
				</div>
			</div>
			<div class="row">
				<div class="twelve columns">
					{{render 'world-2d'}}
				</div>
			</div>
		</script>	

	<script type="text/x-handlebars" data-template-name="world-2d">
		{{render 'easel-entity-container'}}
		{{render 'ash'}}
		
		
		{{ controlWithVars "pixel" pixel x=220 y=100 width=20 height=20}} 
		{{ controlWithVars "pixel" pixel x=240 y=100 width=20 height=20}} 
		{{ controlWithVars "pixel" pixel x=260 y=100 width=20 height=20}} 
		{{ controlWithVars "pixel" pixel x=270 y=120 width=20 height=20}} 
		{{ controlWithVars "pixel" pixel x=210 y=120 width=20 height=20}} 
		{{ controlWithVars "pixel" pixel x=270 y=140 width=20 height=20}} 
		{{ controlWithVars "pixel" pixel x=260 y=160 width=20 height=20}} 
		{{ controlWithVars "pixel" pixel x=240 y=170 width=20 height=20}} 
		{{ controlWithVars "pixel" pixel x=240 y=190 width=20 height=20}} 
		{{ controlWithVars "pixel" pixel x=240 y=220 width=20 height=20}}
	</script>
	
	
	<script type="text/x-handlebars" data-template-name="easel-entity-container">

	</script>
	
	<script type="text/x-handlebars" data-template-name="ash">

	</script>
	
	<script type="text/x-handlebars" data-template-name="cog">

	</script>
	<script type="text/x-handlebars" data-template-name="world-2d-editor">
		<button type="button" {{action "addCog" }}>+Cog</button>
		<button type="button" {{action "addPixel" }}>+Pixel</button>
		<button type="button" {{action "getAddedStaticPlans" }}>Plans</button>
		
		
	</script>


	</head>
    <body>
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

        <!-- Add your site or application content here -->
       <div class="container"> </div>
		<div class="app-container">
			
		</div>  
	        <script src="js/lib/jquery-1.8.1.min.js"></script>
	        <script src="js/lib/handlebars.js"></script>
	        <script src="js/lib/embermandl.js"></script>
	        <script src="js/lib/ragh/EventMapper.js"></script>
			<script src="js/lib/easeljs-0.6.0.min.js"></script>
			<script src="js/lib/PxLoader.js"></script>
			<script src="js/lib/PxLoaderImage.js"></script>
			
			
			

		
<?php
				try {
					
					$paths = array('js/mvc/');
					foreach($paths as $path) {
						$simpath = $path;
						$Directory = new RecursiveDirectoryIterator(realpath($simpath));
						$Iterator = new RecursiveIteratorIterator($Directory);
						$Regex = new RegexIterator($Iterator, '/^.+\.js$/i', RecursiveRegexIterator::GET_MATCH);
						$fileLevels = array();
						foreach($Regex as $match) {
							$el = explode($simpath, $match[0] )[1];
							$lvl = count(explode('/', $el ));
							if ( is_null($fileLevels[ $lvl ] ) ) {
								$fileLevels[ $lvl ] = array();
							}
							$fileLevels[ $lvl ][] = "$simpath$el";
						}		
	
						ksort($fileLevels);
						foreach($fileLevels as $lvl => $filesInLevel) {
							sort($filesInLevel);
							foreach($filesInLevel as $file) {
								//echo "<br/>$lvl: $file";
								echo "<script src=\"$file\"></script>";
							}
						}
					}
				} catch (Exception $e) {
					 echo  "PHP Exception <br/>$e<br/>";
				}
?>
				
				
				
				
				
				
					
					
			
				
        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
		<!-- 
        <script>
        	if (location.protocol.indexOf('http')!=-1) {
				var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
				(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
				g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
				s.parentNode.insertBefore(g,s)}(document,'script'));
            }
        </script>
        -->
        
        
    </body>
</html>
