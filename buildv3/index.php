<!DOCTYPE html>
<!--[if IE 8]> 				 <html class="no-js lt-ie9" lang="en" > <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en" > <!--<![endif]-->

<head>

	
	<meta charset="utf-8" />
  <meta name="viewport" content="width=device-width" />
  <title>Ashley Coleman</title>

	<link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.no-icons.min.css" rel="stylesheet">
	<link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">
	
  <link rel="stylesheet" href="stylesheets/app.css" />
  <link rel="stylesheet" href="css/portfolio.css" />
  

  <script src="javascripts/vendor/custom.modernizr.js"></script>


		<!-- APPLICATION -->
		<script type="text/x-handlebars" data-template-name="application">		
		

		 <row>
			{{outlet "nav-list"}}
		</row>
		

			{{renderWithVars 'preloader-content' preloader}}
			
			<div class="full-width-centered absolute-positioned">
				{{render 'transition' transition}}
			</div>
			
			{{outlet}}
			
		</script>

		<!-- APPLICATION ELEMENTS -->
		<script type="text/x-handlebars" data-template-name="preloader-content">
			Preloading...<br/>
			{{{infoHtml}}}
		</script>

		<!-- APPLICATION ELEMENTS -->
		<script type="text/x-handlebars" data-template-name="transitions-holder">
			Transition holder <button {{action "doTransition"}}> transition</button>
		</script>

		<!-- TRANSITION -->
		<script type="text/x-handlebars" data-template-name="transition">
		
				<canvas class="transition-canvas">
				</canvas>
				
		</script>

		<!-- HASH BTN -->
		<script type="text/x-handlebars" data-template-name="hash-btn">
			<button {{action "doNavigate" }}> {{label}} </button>
		</script>

		<!-- NAV LIST -->
		<script type="text/x-handlebars" data-template-name="nav-list">
			<nav class="top-bar">
				<ul class="title-area">
					<li class="name"> <h1><a href="#">Ashley Coleman</a></h1> </li>
			    	<li class="toggle-topbar menu-icon"><a href="#"><span>Go</span></a></li>
				</ul>
			
				<section class="top-bar-section">
			    	<ul class="left">
						<!-- Title Area -->
			
					    <li class="divider"></li>
				        {{#view view.NavListItemView item="Index" }}
				            <a {{action doDimension0}} >_</a>
				        {{/view}}
				
						<li class="divider"></li>
						{{#view view.NavListItemView item="doDimension1" }}
				            <a {{action doDimension1}} >X</a>
				        {{/view}}
			
						<li class="divider"></li>
				        {{#view view.NavListItemView item="doDimension2" }}
				            <a {{action doDimension2}} >Y</a>
				        {{/view}}
			
						<li class="divider"></li>
				        {{#view view.NavListItemView item="doDimension3" }}
				            <a {{action doDimension3}} >Z</a>
				        {{/view}}   
				    </ul>
				 	<ul class="right">
					</ul>
				</section>
			</nav>
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
		
	 		<div class="row  pointer-events-none">
				<div class="columns small-12">
					<div class="subtitle-text-holder">
						{{{controlWithVars 'subtitle' readOrder='1' thescript=<?php
echo "
\"To you \\\"Ashley Coleman\\\" is probably just a name ...
...featureless
...blank
I created this website to change that.
@actionOnRead=doSecondSubtitle\"";
?>}}}
					</div>
				</div>		
			</div>	
				
	 		<div class="row  pointer-events-none">
				<div class="columns small-12">
					<div class="subtitle-text-holder">
						<a {{action "doGotoDimension1"}}>
							{{{controlWithVars 'subtitle' readOrder='2' thescript=<?php

	echo "\"Add dimension @edits=X,Who,Knowledge\"";	?>}}}
						</a>
					</div>
				</div>
		 	</div>
		</script>

		<!-- INDEX NAV-->
		<script type="text/x-handlebars" data-template-name="index-nav">
			{{#if isShowStart}}
			<a class="button nav-btn standard-single-button" {{action "doStart" }}>Start</a>
			{{/if}}

			{{#if isShowEnd}}
			<a class="button nav-btn standard-single-button" {{action "doGotoDimension1" }}>0 + 1 =</a>
			{{/if}}
		</script>

		<!-- ROUTE DIMENSION 1 -->
		<!--{{renderWithVars 'world-1d'}}-->
		<script type="text/x-handlebars" data-template-name="dimension1">
		
		
			<div class="full-width-centered absolute-positioned">
				{{renderWithVars 'interactive-grid' pixW=20 isPlotX=true}}
				{{render 'heartbeat' heartbeat}}
			</div>
		
	 		<div class="row  pointer-events-none">
				<div class="columns small-12">
					<div class="subtitle-text-holder">
						{{{controlWithVars 'subtitle' orderRead='1' thescript=<?php
							echo "
\"I have web technology skills.
So I can happily rattle of a dry list of acronyms and names...
JS, PHP, AS3, OOP, MCV, MVP, CSS3, AJAX, LINT, node, Ember, Handlebars etc...
@actionOnRead=doSecondSubtitle\"";?>}}}
					</div>
				</div>
				<div class="columns small-12">
					<div class="subtitle-text-holder">
						<a {{action "doGotoDimension2"}}>
							{{controlWithVars 'subtitle' orderRead="2" thescript="Add the y"}} 
						</a>
					</div>
				</div>
	 		</div>

			
		</script>

<!--
	<div class="plot-text-jscss"> {{plotText}} </div>
	<div class="position-text-jscss"> {{positionText}} </div>

-->
		<script type="text/x-handlebars" data-template-name="interactive-grid" >

			<div id="svg-raphaeljs"></div>
			{{#if isPlotX}}
			<div class="plot-heading-jscss">{{plotHeading}}</div>
			<div class="plot-text-jscss"> {{plotText}} </div>
			<div class="position-text-jscss"> {{positionText}} </div>
			{{/if}}
		</script>
		
		<script type="text/x-handlebars" data-template-name="scalar">

		</script>
		

		<!-- SCALAR-VALUE -->
		<script type="text/x-handlebars" data-template-name="scalar-value">

		</script>
		
		<!-- CLICK-AND-DRAG-SCALAR -->
		<script type="text/x-handlebars" data-template-name="click-and-drag-scalar">

		</script>
		<!--
		{{controlWithVars 'scalar-value' 			scaleLabel="163 CM" 	value=163	x=-400 	y=0}}
		{{controlWithVars 'scalar-value' 			scaleLabel="55 WPM" 	value=55 		x=-50 	y=50}}
		{{controlWithVars 'scalar-value' 			scaleLabel="63 KG" 		value=63 		x=500 	y=100}}
		-->
		
		<!-- WORLD 1 D -->
		<script type="text/x-handlebars" data-template-name="world-1d">
			{{renderWithVars 'scalar' x=50 y=50}}
			{{controlWithVars 'click-and-drag-scalar'  		scaleLabel=""	value=200	x=-0 	y=50}}
		</script>

		<!-- DIMENSION 1 NAV-->
		<script type="text/x-handlebars" data-template-name="dimension1-nav">
			<div class="nav-btn-holder">
				{{#if isShowStart}}
				<button class="nav-btn" {{action "doStart" }}>Begin</button>
				{{/if}}

				{{#if isShowEnd}}
				<button class="nav-btn" {{action "doGotoDimension2" }}>1 + 1 =</button>
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
					{{#unless isRemoved}}
					
					{{/unless}}
					
					{{#if isRemoveButton}}
					<div class="remove-button-holder">
						<span><i class="icon-remove-sign remove-button"{{action 'doRemoveClicked'}}>close</i></span>
					</div>
					{{/if}}

			

		</script>
		
		
		<!-- ROUTE DIMENSION 2 -->
		<script type="text/x-handlebars" data-template-name="dimension2">
		
			<div class="full-width-centered absolute-positioned">
				{{renderWithVars 'interactive-grid' pixW=20 pixH=20 isPlotX=false}}
				{{render 'heartbeat' heartbeat}}
			</div>
		
		
			<div class="relative-positioned">
				<div class="absolute-positioned"> 
					{{renderWithVars 'world-2d' World2d}} 
					{{controlWithVars 'esl-entity-container'}}
				</div>
			</div>


	 		<div class="row  pointer-events-none">
				<div class="columns">
					<div class="subtitle-text-holder">
						{{{controlWithVars 'subtitle' orderRead='1' thescript=<?php
echo "
\"It gets me excited to know you are engaging with my website right now.

There is certain group of communication problems that can be solved using web technologies.
I love to use my technical skills to craft experience that solve those problems.
@actionOnRead=doSecondSubtitle\"";?>}}}
					<div>
				</div>
			</div>
	 		<div class="row  pointer-events-none">
				<div class="columns">
					<div class="subtitle-text-holder">
						<a {{action "doGotoDimension3"}}>
							{{controlWithVars 'subtitle' orderRead="2" thescript="Add the @edits=z,depth,exploration"}} 
						</a>
					</div>
				</div>
		 	</div>
			
			{{#if App.DEBUG}}
			{{render 'world-2d-editor'}}
			{{/if}}
		</script>	


		<!-- DIMENSION 2 NAV-->
		<script type="text/x-handlebars" data-template-name="dimension2-nav">
			<div class="nav-btn-holder">
				{{#if isShowEnd}}
				<button class="nav-btn" {{action "doGotoDimension3" }}>2 + 1 =</button>
				{{/if}}
			</div>
		</script>
		
		<!-- WORLD 2D -->

		<script type="text/x-handlebars" data-template-name="world-2d">
			{{controlWithVars 'ash' ash x=-180 }}
			{{controlWithVars 'question-mark' question-mark x=0 visible=false}}
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
			<div class="row">
				<div class="small-offset-1 columns">
					<a class="small button" type="button" {{action "addCog" }}>+Cog</a>
					<a class="small button" type="button" {{action "addPixel" }}>+Pixel</a>
					<a class="small button" type="button" {{action "getAddedStaticPlans" }}>Plans</a>
				</div>
			</div>
		</script>



		<!-- ROUTE DIMENSION 3 -->
		<script type="text/x-handlebars" data-template-name="dimension3">
			<div class="relative-positioned">
				<div class="absolute-positioned"> 
					{{renderWithVars 'world-3d' World3d}}
				</div
			</div>
		
			<div class="row  pointer-events-none">
				<div class="columns">
					<div class="subtitle-text-holder">
						{{{controlWithVars 'subtitle' orderRead='1' hasRemoveButton=true thescript=<?php
			echo "
\"CREATIVE 
If I come upon a problem, I enjoy exploring laterally. 
By looking at normally distant associations I can find an elegant solution.
i.e. The big idea.\"";?>}}}
					<div>
				</div>
	 		</div>
		</script>




		<!-- ROUTE DIMENSION 3 -->
	<script type="text/x-handlebars" data-template-name="world-3d">
	</script>
	
		<!-- {{ controlWithVars 'entity-3d'}} -->

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

		
	        <script src="js/lib/stats.min.js"></script>
	        <script src="js/lib/threex.rendererstats.js"></script>
		
	        <script src="js/lib/json2.js"></script>
	        <script src="js/lib/raphael-min.js"></script>
	        <script src="js/lib/rAF.js"></script>
	        <script src="js/lib/jquery-1.8.1.min.js"></script>
	        <script src="js/lib/handlebars.js"></script>
			<script src="js/lib/three.js"></script>
			<script src="js/lib/THREEx.WindowResize.js"></script>

			<script src="js/lib/easeljs-0.6.0.min.js"></script>
			<script src="js/lib/tweenjs-0.4.0.min.js"></script>
			<script src="js/lib/Ease.js"></script>
			
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

 





  <script>
  document.write('<script src=' +
  ('__proto__' in {} ? 'javascripts/vendor/zepto' : 'javascripts/vendor/jquery') +
  '.js><\/script>')
  </script>
  
  <script src="javascripts/foundation/foundation.js"></script>
	
	<script src="javascripts/foundation/foundation.alerts.js"></script>
	
	<script src="javascripts/foundation/foundation.clearing.js"></script>
	
	<script src="javascripts/foundation/foundation.cookie.js"></script>
	
	<script src="javascripts/foundation/foundation.dropdown.js"></script>
	
	<script src="javascripts/foundation/foundation.forms.js"></script>
	
	<script src="javascripts/foundation/foundation.interchange.js"></script>
	
	<script src="javascripts/foundation/foundation.joyride.js"></script>
	
	<script src="javascripts/foundation/foundation.magellan.js"></script>
	
	<script src="javascripts/foundation/foundation.orbit.js"></script>
	
	<script src="javascripts/foundation/foundation.placeholder.js"></script>
	
	<script src="javascripts/foundation/foundation.reveal.js"></script>
	
	<script src="javascripts/foundation/foundation.section.js"></script>
	
	<script src="javascripts/foundation/foundation.tooltips.js"></script>
	
	<script src="javascripts/foundation/foundation.topbar.js"></script>
	
  
  <script>
    $(document).foundation();
  </script>
</body>
</html>
