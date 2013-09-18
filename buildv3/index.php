<!DOCTYPE html>
<!--[if IE 8]> 				 <html class="no-js lt-ie9" lang="en" > <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en" > <!--<![endif]-->
<?php
$IS_DEPLOY = false;
?>
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width" />
	<title>Ashley Coleman</title>
	<link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.no-icons.min.css" rel="stylesheet">
	<link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">
<? if ($IS_DEPLOY) {?>	
	<link rel="stylesheet" href="///cdnjs.cloudflare.com/ajax/libs/foundation/4.3.1/css/foundation.min.css" />
	<link rel="stylesheet" href="css/all.min.css" />
	<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
	<script src="//cdn.jsdelivr.net/modernizr/2.6.2/modernizr.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/zepto/1.0rc1/zepto.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.0-rc.3/handlebars.min.js"></script>
	<script src="http://code.createjs.com/easeljs-0.6.0.min.js"></script>
	<script src="http://code.createjs.com/tweenjs-0.4.0.min.js"></script>
	<script src="http://code.createjs.com/movieclip-0.6.0.min.js"></script>
	<script src="http://code.createjs.com/preloadjs-0.3.0.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/three.js/r58/three.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
	<script src="js/lib.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/ember.js/1.0.0-rc.1/ember.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/foundation/4.3.1/js/foundation.min.js"></script>
<?php } else { ?>
	<link rel="stylesheet" href="css/foundation4.css" />
	<link rel="stylesheet" href="css/html5bp.css" />
	<link rel="stylesheet" href="css/portfolio.css" />


	<script src="js/lib/jquery-1.8.1.min.js"></script>
	<script src="javascripts/vendor/custom.modernizr.js"></script>
	<script src="javascripts/vendor/zepto.js"></script>
	<script src="js/lib/handlebars.js"></script>
	<script src="js/lib/easeljs-0.6.0.min.js"></script>
	<script src="js/lib/tweenjs-0.4.0.min.js"></script>
	<script src="js/lib/movieclip-0.6.0.min.js"></script>
	<script src="js/lib/preloadjs-0.3.0.min.js"></script>
	<script src="js/lib/three.js"></script>
	<script src="js/lib/raphael.js"></script>
	<script src="js/lib.min.js"></script>
	<script src="js/lib/embermandl.js"></script>
	<script src="js/foundation.min.js"></script>

<?php } ?>


<?php
$indexCopyA = '@=<h3>
Ashley Coleman: The Origin
@=</h3>
To teach you about myself, I start with my name.
My name is an origin, from which I can illustrate the different dimensions that make me up.
@actionOnRead=doSecondSubtitle';
$indexCopyA = addcslashes($indexCopyA, '"');

?>

<?php
$quot = htmlspecialchars("\"");

 $d1copyA = '@=<h3>
X: Software Engineer
@=</h3>
Web dev is my craft.
I value speed, elegance, and clarity.

And as one <a href="http://goo.gl/O5dnGf" target="_blank">clever cookie</a> once said:

<i class="quote"><sup class="icon-quote-left superscript"></sup> Real artists ship <sup class="icon-quote-right superscript"></sup>
@actionOnRead=doSubtitle2 2000
@actionOnRead=doSubtitle3 5000';
$d1copyA = addcslashes($d1copyA, '"');

$obligatoryList = '<span class="heading"> <i class="icon-chevron-left"></i> OBLIGATORY SKILL LIST <i class="icon-chevron-right"></i> </span>
@=<div class="indent">
	<span class="heading">Javascript</span>
	JQuery 
	AJAX 
	nodejs 
	Ember 
	Handlebars 
	threejs (WebGL) 
	Google Closure Library 
	Raphaeljs 
	Createjs 
	underscorejs 

	<span class="heading">Flash</span>
	AS3
	AS2 
	Flex
	Flash Video

	<span class="heading">HTML</span>
	HTML5
	CSS3
	SVG

	<span class="heading">Serverside</span>
	PHP
	MySQL 
	Postgres 
	Templating libraries 

	<span class="heading">Coding Paradigms/Patterns</span>
	OOP
	MVC 
	MVP 

	<span class="heading">Tools</span>
	JSList
	Git, SVN, Mecurial
	JIRA

	<span class="heading">General Knowledge</span>
	3d Math
	2d / 3d Physics
	Geolocation
	API creation
	Code documentation
	Photoshop, Premiere, AfterEffects

@=</div>

<span class="heading"> <i class="icon-chevron-left"></i>/ OBLIGATORY SKILL LIST <i class="icon-chevron-right"></i> </span>';

$obligatoryList = addcslashes($obligatoryList, '"');			
?>

<?php 
$d2copyA =  '@=<h3>
Y: The Storyteller
@=</h3>
I like induce change in the audience, be it emotion, thought, excitement, knowledge...
Simply put, I am a story teller.

If the question is how to best communicate to an audience, 
@actionOnRead=doShowQuestion
then I have the technical skills can be used to craft an answering experience.
@actionOnRead=doSubtitle2';
?>

<?php
$d3copyA = '@=<h3>
Z: The Creative
@=</h3>
I am committed to creative thinking.
It means discarding your <i>first thoughts</i>, and what seems <i>obvious</i>.

And knowing that somewhere there is a solution...
@actionOnRead=doRotateQuestionMarkHint
...that is simple and elegant...
@actionOnRead=doRotateQuestionMark'; 
?>

		<script type="text/x-handlebars" data-template-name="application">
		<div class="bg-layer x-ruler"></div>
		<div class="bg-layer y-ruler"></div>		
			 <row>
				{{outlet "nav-list"}}
			</row>

			{{renderWithVars 'preloader-content' preloader}}
			{{outlet}}
		</script>

		<script type="text/x-handlebars" data-template-name="lo-fixed-size-centered">
			<div class="relative-positioned">
				<div class="absolute-positioned">
 					{{yield}}
				</div
			</div>
		</script>

		<script type="text/x-handlebars" data-template-name="lo-subtitle-row">
			<div class="row pointer-events-none">
				<div class="columns large-12 small-12">
					<div class="subtitle-text-holder">
 						{{yield}}
					</div>
				</div>
			</div>
		</script>

		<script type="text/x-handlebars" data-template-name="lo-subtitle-obligatory">
			<div class="row">
				<div class="columns">
					<div class="subtitle-text-holder obligatory-list">
	 					{{yield}}
					</div>
				</div>
			</div>
		</script>

		<script type="text/x-handlebars" data-template-name="lo-subtitle-row-link">
			<div class="row pointer-events-none">
				<div class="columns large-12 small-12">
					<div class="subtitle-text-holder">
						<br/>
	 					{{yield}}
					</div>
				</div>
			</div>
		</script>

		<script type="text/x-handlebars" data-template-name="preloader-content">
			Preloading...<br/>
			{{{infoHtml}}}
		</script>

		<script type="text/x-handlebars" data-template-name="transitions-holder">
			Transition holder <button {{action "doTransition"}}> transition</button>
		</script>

		<script type="text/x-handlebars" data-template-name="transition">		
			<canvas class="transition-canvas">
			</canvas>
		</script>

		<script type="text/x-handlebars" data-template-name="hash-btn">
			<button {{action "doNavigate" }}> {{label}} </button>
		</script>

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
		
						
						<li class="divider"></li>
						<span class="top-bar-hint"> </span>
				    </ul>
				 	<ul class="right">
					</ul>
				</section>
			</nav>
		</script>

		<script type="text/x-handlebars" data-template-name="navigation">

			{{renderWithVars 'hash-btn' hashBtn urlhash="/" label="Index" routePath="index"}}
			{{controlWithVars 'hash-btn' hashBtn urlhash="d1" label="Dimension 1" routePath="dimension1"}}
			{{controlWithVars 'hash-btn' hashBtn urlhash="d2" label="Dimension 2" routePath="dimension2"}}
			{{controlWithVars 'hash-btn' hashBtn urlhash="d3" label="Dimension 3" routePath="dimension3"}}
		</script>

		<script type="text/x-handlebars" data-template-name="index">		

			{{{controlWithVars 'subtitle' readOrder='1' layoutName='lo-subtitle-row' hasRemoveButton=true thescript="<?php echo $indexCopyA; ?>"}}}
			{{{controlWithVars 'subtitle' readOrder='2' layoutName="lo-subtitle-row-link" thescript="<i class=\"icon-caret-right\"></i> Go to dimension @edits=X...,One...,Who...,How..." isLink=true linkEvent="doGotoDimension1" hoverEvent="doSetRulerX"}}}

		</script>

		<script type="text/x-handlebars" data-template-name="dimension1">
			<div class="full-width-centered" >
				{{renderWithVars 'interactive-grid' pixW=20 isPlotX=true}}
				{{render 'heartbeat' heartbeat}}
			</div>
			<div class="row">
				<div class="columns large-6 small-6">
					<div class="interactive-graph-output">
						<div class="graph-info" {{bindAttr class="this.interactiveGridData.cssClass"}}>
							<h3>{{{this.interactiveGridData.number}}}</h3>
						</div>
						<strong>{{{this.interactiveGridData.heading}}}</strong>
						<ul>
						{{#each this.interactiveGridData.items}}
							<li>{{{this}}}</li>
						{{/each}}
						</ul>
					</div>
				</div>
				<div class="columns large-6  small-6">
					{{{controlWithVars 'subtitle' orderRead='1' layoutName='lo-subtitle-row' hasRemoveButton=true thescript="<?php echo $d1copyA; ?>"}}}
					{{{controlWithVars 'subtitle' orderRead='2' layoutName='lo-subtitle-row-link' isLink=true linkEvent="doGotoDimension2" hasRemoveButton=true thescript="<i class=\"icon-caret-right\"></i> Go to dimension @edits=Y...,Why?...,Motivation..."}} 
					{{{controlWithVars 'subtitle' orderRead='3' layoutName='lo-subtitle-row' isInstant=true hasRemoveButton=true thescript="<?php echo $obligatoryList; ?>"}} 
				</div>
			</div>
		</script>

		<script type="text/x-handlebars" data-template-name="interactive-grid" >
				<div id="svg-raphaeljs"></div>
				{{#if isPlotX}}	
					<div class="graph-legend" >
						<ul>
							{{#each view.LEGEND}}
							<li><span {{bindAttr class="cssClass"}}><div class="graph-legend-fill"></div>{{{label}}}</span></li>
							{{/each}}
						<ul>
					</div>
				{{/if}}
		</script>
		
		<script type="text/x-handlebars" data-template-name="scalar">

		</script>
		
		<script type="text/x-handlebars" data-template-name="scalar-value">

		</script>
		
		<script type="text/x-handlebars" data-template-name="click-and-drag-scalar">

		</script>

		<script type="text/x-handlebars" data-template-name="world-1d">
			{{renderWithVars 'scalar' x=50 y=50}}
			{{controlWithVars 'click-and-drag-scalar'  		scaleLabel=""	value=200	x=-0 	y=50}}
		</script>

		<script type="text/x-handlebars" data-template-name="heartbeat">
			{{render "heartbeat-flash" heartbeatFlash}}
			{{render "heartbeat-sound" heartbeatSound}}
		</script>

		<script type="text/x-handlebars" data-template-name="heartbeat-flash">

		</script>

		<script type="text/x-handlebars" data-template-name="heartbeat-sound">

		</script>

		<script type="text/x-handlebars" data-template-name="subtitle">
			{{#unless isRemoved}}
				{{#if isRemoveButton}}
					<div class="remove-button-holder"><a {{action 'doRemoveClicked'}}><i class="icon-remove remove-button"></i></a></div>
				{{/if}}
				{{#if isLink}}
					<a {{action getLinkEvent}}>
				{{/if}}
				<div class="text"></div>
				{{#if isLink}}
					</a>
				{{/if}}

				{{#if controller.isHoverUnfinished}}
					<div class="click-hint-holder"><i class="icon-exclamation-sign remove-button"> click to show all</i></div>
				{{/if}}
			{{/unless}}
		</script>
		
		<script type="text/x-handlebars" data-template-name="dimension2">
		
			<div class="full-width-centered">
				{{renderWithVars 'interactive-grid' pixW=20 pixH=20 isPlotX=false}}
				{{render 'heartbeat' heartbeat}}
			</div>

			<div class="relative-positioned">
				<div class="absolute-positioned"> 
					{{controlWithVars 'world-2d'}} 
					{{controlWithVars 'esl-entity-container'}}
				</div>
			</div>

			{{{controlWithVars 'subtitle' orderRead='1' layoutName='lo-subtitle-row' hasRemoveButton=true thescript="<?php echo $d2copyA?>"}}}
			{{{controlWithVars 'subtitle' orderRead="2" layoutName="lo-subtitle-row-link" thescript="<i class=\"icon-caret-right\"></i> Go to dimension @edits=Z...,Depth...,Exploration..." isLink=true linkEvent="doGotoDimension3" }}}
			
			{{#if App.DEBUG}}
				{{render 'world-2d-editor'}}
			{{/if}}
		</script>	

		<script type="text/x-handlebars" data-template-name="world-2d">
			{{controlWithVars 'ash' ash x=-180 }}
			{{controlWithVars 'question-mark' question-mark x=0 visible=false}}
		</script>

		<script type="text/x-handlebars" data-template-name="knob">
		    knob
		</script>

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

		<script type="text/x-handlebars" data-template-name="esl-entity-container">

		</script>

		<script type="text/x-handlebars" data-template-name="ash">

		</script>

		<script type="text/x-handlebars" data-template-name="cog">

		</script>

		<script type="text/x-handlebars" data-template-name="world-2d-editor">
			<div class="row">
				<div class="small-offset-1 columns">
					<a class="small button" type="button" {{action "addCog" }}>+Cog</a>
					<a class="small button" type="button" {{action "addPixel" }}>+Pixel</a>
					<a class="small button" type="button" {{action "getAddedStaticPlans" }}>Plans</a>
				</div>
			</div>
		</script>

		<script type="text/x-handlebars" data-template-name="dimension3">
			<div class="relative-positioned">
				<div class="absolute-positioned"> 
					{{controlWithVars 'world-3d'}} 
					{{controlWithVars 'esl-entity-container'}}
				</div>
			</div>
			{{{controlWithVars 'subtitle' orderRead='1' layoutName='lo-subtitle-row' hasRemoveButton=true thescript="<?php echo $d3copyA; ?>"}}}
			{{{controlWithVars 'subtitle' orderRead='2' layoutName='lo-subtitle-row' hasRemoveButton=true thescript="i.e. The big idea."}}}

		</script>

	<script type="text/x-handlebars" data-template-name="world-3d">
	
	</script>

	<script type="text/x-handlebars" data-template-name="entity-3d">
	</script>
	</head>
    <body>
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->
		 
			

		<div class="app-container">
			<div class="app">
			</div>	
		</div>  
		

<?php

if (!$IS_DEPLOY) { 
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
}
?>

<?php if ($IS_DEPLOY) { ?><script src="js/custom.min.js"></script> <?php } ?>
	<script>
		$(document).foundation();
	</script>

</body>
</html>


<?php
/*
  <script>
  document.write('<script src=' +
  ('__proto__' in {} ? 'javascripts/vendor/zepto' : 'javascripts/vendor/jquery') +
  '.js><\/script>')
  </script>
*/


/*
echo
<<<
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
<script src="js/lib/stats.min.js"></script>
<script src="js/lib/threex.rendererstats.js"></script>
<script src="js/lib/json2.js"></script>
<script src="js/lib/rAF.js"></script>
<script src="js/lib/jquery-1.8.1.min.js"></script>
<script src="js/lib/handlebars.js"></script>
<script src="js/lib/three.js"></script>
<script src="js/lib/THREEx.WindowResize.js"></script>
<script src="js/lib/easeljs-0.6.0.min.js"></script>
<script src="js/lib/tweenjs-0.4.0.min.js"></script>
<script src="js/lib/movieclip-0.6.0.min.js"></script>
<script src="js/lib/CSSPlugin.js"></script>
<script src="js/lib/Ease.js"></script>
<script src="js/lib/preloadjs-0.3.0.min.js"></script>
<script src="js/lib/ragh/Three.TrackballControls.js"></script>
*/

?>