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
			<div class="row">
				<div class="twelve columns">
					{{renderWithVars 'navigation' navigation }}
				</div>
			</div>
			{{render 'transitions-holder' transitions-holder}}
			{{renderWithVars 'preloader' preloader}}
			{{outlet "nav-list"}}
			{{outlet}}
		</script>
		
		<!-- APPLICATION ELEMENTS -->
		<script type="text/x-handlebars" data-template-name="preloader">
			Preloading...<br/>
			{{{infoHtml}}}
		</script>
		
		<!-- APPLICATION ELEMENTS -->
		<script type="text/x-handlebars" data-template-name="transitions-holder">
			Transition holder <button {{action "doTransition"}}> transition</button>
		</script>
		
		<!-- TRANSITION -->
		<script type="text/x-handlebars" data-template-name="transition">
				<div class="transition-canvas">
				</div>
		</script>

		<!-- HASH BTN -->
		<script type="text/x-handlebars" data-template-name="hash-btn">
			<button {{action "doNavigate" }}> {{label}} </button>
		</script>
		
		<!-- NAV LIST -->
		<script type="text/x-handlebars" data-template-name="nav-list">
		    <ul class="nav nav-tabs">
		        {{#view view.NavListItemView item="home" }}
		            <a {{action doIndex}} >Home</a>
		        {{/view}}
		        {{#view view.NavListItemView item="doDimension1" }}
		            <a {{action doDimension1}} >Dimension 1</a>
		        {{/view}}   
		        {{#view view.NavListItemView item="doDimension2" }}
		            <a {{action doDimension2}} >Dimension 2</a>
		        {{/view}}   
		        {{#view view.NavListItemView item="doDimension3" }}
		            <a {{action doDimension3}} >Dimension 3</a>
		        {{/view}}   
		    </ul>
		</script>


		<!-- NAVIGATION -->
		<script type="text/x-handlebars" data-template-name="navigation">

			{{renderWithVars 'hash-btn' hashBtn urlhash="/" label="Index" routePath="index"}}
			{{controlWithVars 'hash-btn' hashBtn urlhash="d1" label="Dimension 1" routePath="dimension1"}}
			{{controlWithVars 'hash-btn' hashBtn urlhash="d2" label="Dimension 2" routePath="dimension2"}}
			{{controlWithVars 'hash-btn' hashBtn urlhash="d3" label="Dimension 3" routePath="dimension3"}}
		</script>

		<!-- ROUTE INDEX -->
		<script type="text/x-handlebars" data-template-name="index">

			<div class="row">
				<div class="twelve columns">
					{{renderWithVars 'index-nav' indexNav}}	
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

		<!-- INDEX NAV-->
		<script type="text/x-handlebars" data-template-name="index-nav">
		
			<div class="nav-btn-holder">
				{{#if isShowStart}}
				<button class="nav-btn" {{action "doStart" }}>Press here to begin</button>
				{{/if}}
			
				{{#if isShowEnd}}
				<button class="nav-btn" {{action "doEnd" }}>Add a dimension to Ashley</button>
				{{/if}}
			</div>
			
		</script>

		<!-- ROUTE DIMENSION 1 -->
		<script type="text/x-handlebars" data-template-name="dimension1">
		
			<div class="el-no-effect-winsize-outer">
				<div class="el-no-effect-winsize-inner-container">
					{{renderWithVars 'world-1d'}}
				</div>
			</div>
	
			<div class="row">
				<div class="twelve columns">
					{{renderWithVars 'dimension1-nav' dimension1Nav}}	
				</div>
			</div>
				
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
		
		<!-- SCALAR -->
		<script type="text/x-handlebars" data-template-name="scalar">
		
		</script>
		
		<!-- WORLD 1 D -->
		<script type="text/x-handlebars" data-template-name="world-1d">
			{{renderWithVars 'scalar'}}
		</script>
		
		<!-- DIMENSION 2 NAV-->
		<script type="text/x-handlebars" data-template-name="dimension1-nav">
			<div class="nav-btn-holder">
				{{#if isShowStart}}
				<button class="nav-btn" {{action "doStart" }}>Begin</button>
				{{/if}}
			
				{{#if isShowEnd}}
				<button class="nav-btn" {{action "doEnd" }}>Add another dimension to Ashley</button>
				{{/if}}
			</div>
		</script>
		
		<!-- HEARTBEAT -->
		<script type="text/x-handlebars" data-template-name="heartbeat">
			{{render "heartbeat-flash" heartbeatFlash}}
			{{render "heartbeat-sound" heartbeatSound}}
		</script>
		
		<!-- HEARTBEAT FLASH -->
		<script type="text/x-handlebars" data-template-name="heartbeat-flash">

		</script>
		
		<!-- HEARTBEAT SOUND -->
		<script type="text/x-handlebars" data-template-name="heartbeat-sound">

		</script>
		
		<!-- SUBTITLE -->
		<script type="text/x-handlebars" data-template-name="subtitle">
			{{{text}}}
		</script>

		<!-- ROUTE DIMENSION 2 -->
		<script type="text/x-handlebars" data-template-name="dimension2">

			<div class="row">
				<div class="twelve columns">
					{{render 'world-2d-editor'}}
				</div>
			</div>
 
			<div class="centered-hero"> 
				{{renderWithVars 'world-2d' World2d}} 
				{{controlWithVars 'esl-entity-container'}}
			</div>
			
		</script>	
		
		
		
		<!-- WORLD 2D -->
		
		<script type="text/x-handlebars" data-template-name="world-2d">
			{{render 'ash' Ash}}
			{{controlWithVars 'question-mark' question-mark visible=false}}
		</script>
		

		
		<!-- KNOB -->
		
		<script type="text/x-handlebars" data-template-name="knob">
		    knob
		</script>



		<!-- QUESTION MARK -->
			
		<script type="text/x-handlebars" data-template-name="question-mark">
	
			{{ controlWithVars "cogged-pixel" cogged-pixel x=235 y=45 height=30 width=30}}
			{{ controlWithVars "cogged-pixel" cogged-pixel x=265 y=45 width=30 height=30}} 
			{{ controlWithVars "cogged-pixel" cogged-pixel x=295 y=45 width=30 height=30}} 
			{{ controlWithVars "cogged-pixel" cogged-pixel x=190 y=90 width=30 height=30}} 
			{{ controlWithVars "cogged-pixel" cogged-pixel x=205 y=60 width=30 height=30}} 
			{{ controlWithVars "cogged-pixel" cogged-pixel x=325 y=60 width=30 height=30}} 
			{{ controlWithVars "cogged-pixel" cogged-pixel x=335 y=90 width=30 height=30}} 
			{{ controlWithVars "cogged-pixel" cogged-pixel x=190 y=120 width=30 height=30}} 
			{{ controlWithVars "cogged-pixel" cogged-pixel x=335 y=120 width=30 height=30}} 
			{{ controlWithVars "cogged-pixel" cogged-pixel x=335 y=150 width=30 height=30}} 
			{{ controlWithVars "cogged-pixel" cogged-pixel x=320 y=180 width=30 height=30}} 
			{{ controlWithVars "cogged-pixel" cogged-pixel x=290 y=195 width=30 height=30}} 
			{{ controlWithVars "cogged-pixel" cogged-pixel x=265 y=210 width=30 height=30}} 
			{{ controlWithVars "cogged-pixel" cogged-pixel x=265 y=240 width=30 height=30}} 
			{{ controlWithVars "cogged-pixel" cogged-pixel x=265 y=300 width=30 height=30}}

		</script>
		



		<!-- ESL-ENTITY-CONTAINER -->
		<script type="text/x-handlebars" data-template-name="esl-entity-container">

		</script>
		



		<!-- ASH -->
	
		<script type="text/x-handlebars" data-template-name="ash">

		</script>
	
	

		<!-- COG -->
		<script type="text/x-handlebars" data-template-name="cog">

		</script>
		
		
		

		<!-- WORLD 2D EDITOR -->
		<script type="text/x-handlebars" data-template-name="world-2d-editor">
			<button type="button" {{action "addCog" }}>+Cog</button>
			<button type="button" {{action "addPixel" }}>+Pixel</button>
			<button type="button" {{action "getAddedStaticPlans" }}>Plans</button>
		</script>


	
		<!-- ROUTE DIMENSION 3 -->
		<script type="text/x-handlebars" data-template-name="dimension3">
			<div class="centered-hero">
				{{renderWithVars 'world-3d' World3d}}
			</div>
		</script>
		


	
		<!-- ROUTE DIMENSION 3 -->
	<script type="text/x-handlebars" data-template-name="world-3d">
		{{ controlWithVars 'entity-3d'}}
	</script>
	
	
	<script type="text/x-handlebars" data-template-name="entity-3d">
	</script>
	



	</head>
    <body>
        <!--[if lt IE 7]>



            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

        <!-- Add your site or application content here -->

		<div class="app-container">
			<div class="app">

			</div>	
		</div>  
		
		
	        <script src="js/lib/json2.js"></script>
	        <script src="js/lib/rAF.js"></script>
	        <script src="js/lib/jquery-1.8.1.min.js"></script>
	        <script src="js/lib/handlebars.js"></script>
			<script src="js/lib/three.js"></script>
			<script src="js/lib/THREEx.WindowResize.js"></script>
			
			<script src="js/lib/easeljs-0.6.0.min.js"></script>
			<script src="js/lib/tweenjs-0.4.0.min.js"></script>
 			<script src="js/lib/preloadjs-0.3.0.min.js"></script>
	        <script src="js/lib/embermandl.js"></script>
	
			<script src="js/lib/ragh/Three.TrackballControls.js"></script>
			
				
			
<?php
				try {
					
					$paths = array('js/lib/ragh/', 'js/mvc/');
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
