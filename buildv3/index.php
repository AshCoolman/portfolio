<!DOCTYPE html>
<!--[if IE 8]> 				 <html class="no-js lt-ie9" lang="en" > <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en" > <!--<![endif]-->
<?php
$IS_DEPLOY = false;
?>
<head>
	<!--link href='http://fonts.googleapis.com/css?family=Ubuntu:400,700' rel='stylesheet' type='text/css'-->

	
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width" />
	<title>Ashley Coleman</title>
	<link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.no-icons.min.css" rel="stylesheet">
	<link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">
<? if ($IS_DEPLOY) {?>	
	<link rel="stylesheet" href="///cdnjs.cloudflare.com/ajax/libs/foundation/4.3.1/css/foundation.min.css" />
	<link rel="stylesheet" href="css/all.min.css" />
	<script src="//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js"></script>
	<script>
	  WebFont.load({
	    google: {
	      families: ['Ubuntu:400,700']
	    }
	  });
	</script>
	<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/zepto/1.0rc1/zepto.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.0-rc.3/handlebars.min.js"></script>
	<script src="http://code.createjs.com/easeljs-0.7.0.min.js"></script>
	<script src="http://code.createjs.com/tweenjs-0.5.0.min.js"></script>
	<script src="http://code.createjs.com/movieclip-0.7.0.min.js"></script>
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
	<script src="js/lib/modernizr.custom.portfolio.js"></script>
	<script src="javascripts/vendor/zepto.js"></script>
	<script src="js/lib/handlebars.js"></script>
	<script src="js/lib/easeljs-0.7.0.min.js"></script>
	<script src="js/lib/tweenjs-0.5.0.min.js"></script>
	<script src="js/lib/movieclip-0.7.0.min.js"></script>
	<script src="js/lib/preloadjs-0.3.0.min.js"></script>
	<script src="js/lib/three.js"></script>
	<script src="js/lib/raphael.js"></script>
	<script src="js/lib.min.js"></script>
	<script src="js/lib/embermandl.js"></script>
	<script src="js/foundation.min.js"></script>
	<script src="js/lib/foundation.alerts.js"></script>
	
	

<?php } ?>


<?php
$indexCopyA = '@actionOnRead=doInstruction
@=<h3>
Hi, I\'m Ashley 
@=</h3>

I am looking for a job, so I built this portfolio site give the world some idea of who I am.

You are at the start page aka the <i>origin</i>. 
Continue on to learn about my different dimensions. 
@actionOnRead=doSecondSubtitle 1000
@actionOnRead=doThirdSubtitle 2000
@actionOnRead=doFourthSubtitle 3000';
$indexCopyA = addcslashes($indexCopyA, '"');

?>

<?php
$indexCopyB = '@=<h5>
Welcome to my Sandbox
@=</h5>
This website has a secondary role as a development sandbox.
Here I experiment with new ideas, technology tests etc.
So don\'t be surprised if things change!

@=<sup>
<i><strong>Last update Fri 8th Nov 2013</strong>: alpha 1.3</i>
* Tweaked feature report card
* Copy changes
@=</sup>';
$indexCopyB = addcslashes($indexCopyB, '"');

?>


<?php
$indexCopyC = '@=<h5>
Contact Details
@=</h5>
@=<address>
<i class="icon-envelope"></i> writetofish+cv<i>@</i>gmail.com
<i class="icon-phone"></i> (+44) 77 5298 3159
<i class="icon-twitter"></i> <a href="https://twitter.com/AshCoolman" target="_blank">@AshCoolman</a>
<i class="icon-home"></i> London, United Kingdom (formally Australia)
@=</address>';
$indexCopyC = addcslashes($indexCopyC, '"');

?>


<?php
$quot = htmlspecialchars("\"");


 $d1copyA = '@=<h3>
Web Developer
@=</h3>
<i>My 1st dimension</i>
@actionOnRead=doSubtitle2';
$d1copyA = addcslashes($d1copyA, '"');

$obligatoryList = '<span class="heading"> <i class="icon-chevron-left"></i> OBLIGATORY SKILL SUMMARY LIST <i class="icon-chevron-right"></i> </span>
@=<div class="indent">

	<span class="heading">Javascript tech</span>
	Libraries (JQuery, Google Glosue Library etc)
	Frameworks (Foundation 4, Ember, bootstrap etc)
	Service APIs ( Google Maps, Facebook Graph etc )
	HTML APIs (WebGL, geolocation, sound, video etc)

	<span class="heading">Web markup</span>
	HTML(5)
	CSS(3)
	SASS & LESS
	SVG 

	<span class="heading">Web dev experience</span>
	AJAX
	Cross-domain issues
	UX & Performance
	SEO & Analytics
	Cross platform
	Input validation
	Profiling tools (jankfree.org!)

	<span class="heading">Flash tech</span>
	AS2 & AS3
	Flash Video 
	Flex
	MXML

	<span class="heading">Backend technology</span>
	PHP 
	SQL (mySQL, PostgresSQL)
	Nodejs

	<span class="heading">Dev tools & techniques</span>
	Make files
	Minification (YUI Compressor, Closure Compiler)
	Unit testing (QUnitjs)
	Doc generation
	Chrome Dev tools (and other browser equivalents)
	User testing
	API creation

	<span class="heading">Project tools & techniques</span>
	Version control (SVN, Git, Mecurial)
	Issue tracking (JIRA, Bugzila etc) 
	Wireframing & Prototyping (Fireworks, Axure etc)

	<span class="heading">General knowledge</span>
	2d / 3d Physics math
	Geo-location algorithms
	Image editing (Adobe Photoshop)
	Video editing (Adobe After Effects)
	Video encoding (Adobe Media Encoder)
	Sound editing (Adacity)

	<span class="heading">Notable tech in this site</span>
	Emberjs
	Foundation 4
	JQuery
	Createjs
	Threejs
	Raphaeljs
	Underscorejs
	Greensock animation platform
	WebGL
	SVG
	Request Animation Frame
	Closures
	Prototype inheritance

@=</div>

<span class="heading"> <i class="icon-chevron-left"></i>/ OBLIGATORY SKILL SUMMARY LIST<i class="icon-chevron-right"></i> </span>';

$obligatoryList = addcslashes($obligatoryList, '"');			
?>

<?php 
$d2heading ='@=<h3>
Storyteller
@=</h3>
<i>My 2nd dimension</i>
@actionOnRead=doSubtitle1';


$d2copy1 =  '@wait=1200
This is me
@wait=500
I love to create experiences that trigger changes in people
@actionOnRead=doShowUser
@wait=1500
 So I <b>build</b> things that combine <b>function</b>, <b>emotion</b> and <b>message</b> to tell <b>stories</b>
@actionOnRead=doShowMachine 1500
@actionOnRead=doInstructionTurnOnController 4000';

$d2copy2 =  '@actionOnRead=doHideUser
@wait=1500
If the question is how create change from the web, 
@actionOnRead=doShowQuestion
@wait=2000
 I can work the underlying technology...
@actionOnRead=doShowMachineCogs
@wait=2500
 ...to leave an answer
@wait=1000
@actionOnRead=doSubtitle3
@actionOnRead=doSubtitleExample';

$d2Example = '@=<h5>
Interactive story
@=</h5>
Check out how I used an <a href=\"http://www.adelaidenow.com.au/news/ban-lifted-it-only-took-10-years-but-government-gives-r18-video-games-the-go-ahead/story-e6freaal-1226271799644\" target=\"_blank\">interactive infographic</a> to explain a complex story. <i>This was for NewsCorp\'s Australian news network</i>';
?>

<?php
$d3heading = '@=<h3>
Creative 
@=</h3>
<i>My 3rd dimension</i>';

$d3copyA = 'Creativity can turn a message into impact, data into knowledge, and function into fun.
The key is to <b>think laterally</b> about a given problem, and find an elegant idea... 
@wait=3000
@actionOnRead=doRotateQuestionMarkHint
@wait=5000
@actionOnRead=doRotateQuestionMark
@wait=500
@actionOnRead=doRotateQuestionMarkInstruction'; 

$d3copyB = '...once you have an elegant idea, everything else slots into place.';

$d3award = '@=<h5>
Advertising school 
@=</h5>
In 2010, I was selected for and completed AWARD school, Australia\'s best regarded advertising creative course:
<a href=\"http://awardonline.com/education/award-school#.UlSoM2TF1LU\" target=\"_blank\">AWARD School</a>';


$d3art = '@=<h5>
Curation is fun
@=</h5>
In 2012 I curated a pop up art gallery:
<a href=\"http://www.deathrattleshows.com/\" target=\"_blank\">The Death Rattle Shows</a>';

?>

		<script type="text/x-handlebars" data-template-name="application">
			{{outlet background}}
			{{render 'ruler'}}
			 <div class="nav-list-holder">
				{{outlet "nav-list"}}
			</div>

			{{renderWithVars 'preloader-content' preloader}}
			{{outlet}}
		</script>

		<script type="text/x-handlebars" data-template-name="modernizr-report">
			
			
			
			{{#if this.controller.hasFullExp}}

			{{else}}
				{{#if this.controller.hasMinExp}}
				<div data-alert class="alert-box secondary">
					NOTE This site may not fully support your browser. <a href="#" data-reveal-id="modernizrReport">Click here for details</a>.
					<a href="#" class="close">&times;</a>
				</div>
				
				
				{{else}}
						<div data-alert class="alert-box secondary">
							<span class="red">WARNING</span> This site probably uses features for its core experiences that are unsupported by your browser. <a href="#" data-reveal-id="modernizrReport">Click here for details</a>.
						<a href="#" class="close">&times;</a>
						</div>
						
						
				{{/if}}
			{{/if}}
			
			<div id="modernizrReport" class="reveal-modal medium">
			 
				{{#if this.controller.hasFullExp}}
				<h3>Nice browser!</h3>
				<p>
					This site works perfectly with your browser
				</p>
				
				<!--
				<h5>Full support</h4>
				<ul class="feature-list">
				{{#each this.controller.features.full}}
					<li>   
				    <div class="dotted-bg"></div>
				     	<label>{{{this.name}}}</label>
						<span>{{{this.isSupported}}}</span>
					</li>
				{{/each}}
				-->
				{{else}}
					{{#if this.controller.hasMinExp}}
						<h3>Hmmmm...</h3>
						<p>
							This site <i>"works"</i> with your browser, but not as intended. Why not try the latest version of <a href="https://www.google.com/intl/en/chrome/browser/">Chrome</a> or <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a> to get the <strong>full experience</strong>?
						</p>
						
						<h5>Full experience features</h4>
						<ul class="feature-list">
						{{#each this.controller.features.low}}
							<li>
						    	<div class="dotted-bg"></div>    
						     	<label>{{{this.name}}}</label>
								{{#if this.isSupported}} <span>true</span> {{else}} <span class="red">false</span>{{/if}}
							</li>
						{{/each}}
						</ul>
						
					{{else}}
						<h3>Oh dear...</h3>
						<p>
							From the looks of things, your browser does <strong>not support</strong> features used to build <strong>core experiences</strong> on this site. Feel free to have a look around, <strong>but things will be broken</strong>.  
						</p>
						<p>
							Please install the latest version of <a href="https://www.google.com/intl/en/chrome/browser/">Chrome</a> or <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a> to get the <strong>full experience</strong>
						</p>
						
						<h5>Minimum experience features</h4>
						<ul class="feature-list">
						{{#each this.controller.features.min}}
							<li>
						    	<div class="dotted-bg"></div>    
						     	<label>{{{this.name}}}</label>
								{{#if this.isSupported}} <span>true</span> {{else}} <span class="red">false</span>{{/if}}
							</li>
						{{/each}}
						</ul>
						
						
						<h5>Full experience features</h4>
						<ul class="feature-list">
						{{#each this.controller.features.low}}
							<li>
						    	<div class="dotted-bg"></div>    
						     	<label>{{{this.name}}}</label>
								{{#if this.isSupported}} <span>true</span> {{else}} <span class="red">false</span>{{/if}}
							</li>
						{{/each}}
						</ul>
					{{/if}}
				{{/if}}
				 
			</div>

		</script>
		
		
		<script type="text/x-handlebars" data-template-name="lo-row">
		<div class="row pointer-events-none">
			<div class="columns large-12 small-12"> 
					{{yield}} 
			</div>		
		</div>
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

		<script type="text/x-handlebars" data-template-name="lo-subtitle-instant-row">
			<div class="row pointer-events-none">
				<div class="columns large-12 small-12">
					<div class="subtitle-text-holder subtitle-text-holder-instant">
 						{{yield}}
					</div>
				</div>
			</div>
		</script>
		

		<script type="text/x-handlebars" data-template-name="lo-subtitle-instruction-row">
			<div class="row pointer-events-none lo-subtitle-instruction-row">
				<div class="columns large-12 small-12">
					<div class="subtitle-text-holder subtitle-text-holder-instruction">
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
					<div class="subtitle-text-holder row-link">
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
		
		<script type="text/x-handlebars" data-template-name="ruler">
			<div class="bg-layer x-ruler"></div>
			<div class="bg-layer y-ruler"></div>
			<div class="bg-layer x-ruler-minor"></div>
			<div class="bg-layer y-ruler-minor"></div>
			<div class="bg-layer origin-x"></div>
			<div class="bg-layer origin-y"></div>
			<div class="origin-name"></div>
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
					<li class="name"> <h1>Ashley by dimension <?php if (!$IS_DEPLOY) echo "<span style=\"color: yellow\">DEV VERSION</span>";?></h1> </li>
			    	<li class="toggle-topbar menu-icon"><a href="#"><span></span></a></li>
				</ul>
			
				<section class="top-bar-section">
			    	<ul class="left">
						<!-- Title Area -->
			
					    <li class="divider"></li>
						{{#view view.NavListItemView item="doIndex" }}
				            <h1><a {{action doIndex}} >Intro</a></h1>
				        {{/view}}
			
					    <li class="divider"></li>
						{{#view view.NavListItemView item="doDimension1" }}
				            <h1>1d <a {{action doDimension1}} >Web Developer</a></h1>
				        {{/view}}
			
						<li class="divider"></li>
				        {{#view view.NavListItemView item="doDimension2" }}
				            <h1>2d <a {{action doDimension2}} >Storyteller</a></h1>
				        {{/view}}
			
						<li class="divider"></li>
				        {{#view view.NavListItemView item="doDimension3" }}
				            <h1>3d <a {{action doDimension3}} >Creative</a></h1>
				        {{/view}}   

						<li class="divider"></li>
				        {{#view view.NavListItemView item="doExamples" }}
				            <h1><a {{action doExamples}} >Examples</a></h1>
				        {{/view}}

						
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
			{{controlWithVars 'hash-btn' hashBtn urlhash="eg" label="Examples" routePath="examples"}}
		</script>

		<script type="text/x-handlebars" data-template-name="index">		
			
			{{render 'modernizr-report' layoutName='lo-row'}}
				
			<div class="row page-content">
				<div class="columns large-6  small-6">		
					{{{controlWithVars 'subtitle' readOrder='1' layoutName='lo-subtitle-row' hasRemoveButton=false thescript="<?php echo $indexCopyA; ?>"}}}
					{{{controlWithVars 'subtitle' readOrder='2' layoutName="lo-subtitle-row-link" thescript="<i class=\"icon-caret-right\"></i> Go to first dimension: @edits=X...,Who...,What..." isLink=true linkEvent="doGotoDimension1" hoverEvent="doDimensionNavHover"}}}
					
				</div>
				<div class="columns large-6 small-6">
					{{{controlWithVars 'subtitle' readOrder='3' layoutName='lo-subtitle-instant-row' isInstant=true hasRemoveButton=false thescript="<?php echo $indexCopyC; ?>"}}}
					{{{controlWithVars 'subtitle' readOrder='4' layoutName='lo-subtitle-instant-row' isInstant=true hasRemoveButton=false thescript="<?php echo $indexCopyB; ?>"}}}
				</div>
			</div>
		</script>

		<script type="text/x-handlebars" data-template-name="dimension1-background">
			<div class="full-width-centered" >
				{{render 'heartbeat' heartbeat}}
			</div>
		</script>
		
		<script type="text/x-handlebars" data-template-name="dimension1">
			<div class="row">
				{{render 'modernizr-report' layoutName='lo-row'}}
				<div class="columns large-12  small-12">
					{{{controlWithVars 'subtitle' orderRead='1' layoutName='lo-subtitle-row' hasRemoveButton=true thescript="<?php echo $d1copyA; ?>"}}}
					{{{controlWithVars 'subtitle' orderRead='0' layoutName='lo-subtitle-instruction-row' isInstant=true hasRemoveButton=true thescript="<i class=\"icon-info-sign\"></i> Use mouse to find my x values "}}}
					
					{{{controlWithVars 'subtitle' orderRead='2' layoutName='lo-subtitle-row-link' isLink=true linkEvent="doGotoDimension2"  hoverEvent="doDimensionNavHover" hasRemoveButton=true thescript="<i class=\"icon-caret-right\"></i> Go to second dimension: @edits=Y...,Why...,Motivation..."}}} 
					{{{controlWithVars 'subtitle' orderRead='3' layoutName='lo-subtitle-instant-row' isInstant=true hasRemoveButton=true thescript="<?php echo $obligatoryList; ?>"}}}

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
				<div style="display:none" class="interactive-grid-values">examples of javascript tech used

JQuery
JQuery plugin creation
JQueryUI
threejs
raphaeljs
Google web fonts
Google Glosue Library
socket.io
prototypejs
mootools

## web frameworks used

Emberjs
Foundation 4
bootstrap

## service APIs used

Google Maps API
Google Data API
Facebook Graph API

## browser technologies used

HTML(5)
CSS(3)
SASS
LESS
SVG
WebGL
geolocation
HTML5 Sound
HTML5 video

## development aspects I have experience in

AJAX
Cross-domain problems
Profiling tools (jankfree.org!)
SEO
Analytics
API creation

## common design aspects I have experience in

UX
Responsive design
Fluid design
Graceful degradation

## flash technologies used

AS3
AS2
Flash Video 
Flex
MXML

## backend technologies used

PHP 
SQL (mySQL, PostgresSQL)
Nodejs
Ruby

## development techniques used

Wireframing
Prototyping
Automation (makefiles etc)
Minification
Doc generation
Unit testing (QUnitjs)
User testing

## project tools used

SVN
Git
JIRA
Bugzila
Basecamp

## useful areas of experience

2d / 3d Physics math
Geo-location algorithms
Image editing (Adobe Photoshop)
Video editing (Adobe After Effects)
Video encoding (Adobe Media Encoder)
Sound editing (Adacity)

## notable technologies used in this website

Emberjs
Foundation 4
JQuery
Createjs
Threejs
Raphaeljs
Underscorejs
Greensock animation platform
WebGL
SVG
Request Animation Frame
Closures
Prototype inheritance

## thousand lines of code written for this site
5

## years of experience
9

## years of Computer Science and Multimedia degree
4
</div>
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
					<div class="click-hint-holder"><i class="icon-exclamation-sign remove-button"> Paused: click to show all</i></div>
				{{/if}}
			{{/unless}}
		</script>
		
		<script type="text/x-handlebars" data-template-name="dimension2">
				<div class="row">
					<div class="columns large-12 small-12">
						<div style="position:relative; width:100%">
						
							<div style="position:absolute; width:100%">
								{{controlWithVars 'world-2d' layoutName='lo-subtitle-row'}}
								{{controlWithVars 'esl-entity-container'}}
								<div class="page-content">
									<div class="row page-content">
										<div class="columns large-8 small-12">
											{{{controlWithVars 'subtitle' orderRead='instructionTurnOn' layoutName='lo-subtitle-instruction-row' isInstant=true hasRemoveButton=false thescript="<i class=\"icon-info-sign\"></i> Press <span style=\"background-color:#005500; width:2em; height:1.2em; color:#005500\">ON</span> on the storytelling device I built"}}}
											{{{controlWithVars 'subtitle' orderRead='1' layoutName='lo-subtitle-row' hasRemoveButton=true thescript="<?php echo $d2copy1?>"}}}
											{{{controlWithVars 'subtitle' orderRead='2' layoutName='lo-subtitle-row' hasRemoveButton=true thescript="<?php echo $d2copy2?>"}}}			
											{{{controlWithVars 'subtitle' orderRead='instructionTurnOff' layoutName='lo-subtitle-instruction-row' isInstant=true hasRemoveButton=false thescript="<i class=\"icon-info-sign\"></i> Press <span style=\"background-color:#33CC33; width:2em; height:1.2em; color:#33CC33\">ON</span> when you are satisfied with the changes made"}}}
											{{{controlWithVars 'subtitle' orderRead='3' layoutName="lo-subtitle-row-link" thescript="<i class=\"icon-caret-right\"></i> Go to third dimension: @edits=Z...,Depth...,Exploration..." isLink=true linkEvent="doGotoDimension3" hoverEvent="doDimensionNavHover" }}}
										</div>
										<div class="columns large-4  small-12">				
											{{{controlWithVars 'subtitle' orderRead="example" layoutName="lo-subtitle-instant-row" thescript="<?php echo $d2Example ?>" isLink=false isInstant=true }}}
										</div>
									</div>
								</div>
							</div>	
							
							<div style="position:absolute" class="page-content">
								{{{controlWithVars 'subtitle' orderRead='heading' isInstant=true  layoutName='lo-subtitle-row' hasRemoveButton=false thescript="<?php echo $d2heading?>"}}}
							</div>
							
							{{render 'modernizr-report' layoutName='lo-row'}}
							
						</div>
					</div>
				</div>
			
		</script>	

		<script type="text/x-handlebars" data-template-name="world-2d">
			<div class="canvas-hero-holder"></div>
			{{controlWithVars 'ash' ash 			x=-540 	y=60 	img="img//face-ash.png"}}
			{{controlWithVars 'machine' machine 	x=-180 	y=150 	visible=false	}}
			{{controlWithVars 'question' question 	x=-120 	y=30 	visible=false}}
			{{controlWithVars 'user' user 			x=120 	y=150 	visible=false}}
		</script>

		<script type="text/x-handlebars" data-template-name="knob">
		    knob
		</script>

		<script type="text/x-handlebars" data-template-name="question">
			{{controlWithVars "pixel" pixel x=45 y=105 height=30 width=30}}
			{{controlWithVars "pixel" pixel x=75 y=75 height=30 width=30}}
			{{controlWithVars "pixel" pixel x=105 y=75 height=30 width=30}}
			{{controlWithVars "pixel" pixel x=105 y=195 height=30 width=30}}
			{{controlWithVars "pixel" pixel x=105 y=255 height=30 width=30}}
			{{controlWithVars "pixel" pixel x=135 y=75 height=30 width=30}}
			{{controlWithVars "pixel" pixel x=135 y=165 height=30 width=30}}
			{{controlWithVars "pixel" pixel x=165 y=105 height=30 width=30}}
			{{controlWithVars "pixel" pixel x=165 y=135 height=30 width=30}}
		</script>

		<script type="text/x-handlebars" data-template-name="user">
		{{controlWithVars "pixel" pixel x=45 y=105 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=75 y=-45 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=75 y=-15 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=75 y=15 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=75 y=45 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=75 y=75 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=75 y=105 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=75 y=135 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=75 y=165 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=75 y=195 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=105 y=-75 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=105 y=-45 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=105 y=-15 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=105 y=15 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=105 y=45 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=105 y=75 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=105 y=105 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=105 y=135 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=105 y=165 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=105 y=195 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=135 y=-75 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=135 y=-45 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=135 y=-15 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=135 y=15 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=135 y=45 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=135 y=75 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=135 y=105 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=135 y=135 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=135 y=165 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=135 y=195 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=165 y=-75 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=165 y=-45 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=165 y=-15 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=165 y=15 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=165 y=45 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=165 y=75 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=165 y=105 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=165 y=135 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=165 y=165 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=165 y=195 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=195 y=-75 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=195 y=-45 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=195 y=-15 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=195 y=15 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=195 y=45 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=195 y=75 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=195 y=105 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=195 y=135 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=195 y=165 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=195 y=195 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=195 y=225 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=195 y=255 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=225 y=-75 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=225 y=-45 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=225 y=-15 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=225 y=15 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=225 y=45 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=225 y=75 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=225 y=105 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=225 y=135 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=225 y=165 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=225 y=195 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=225 y=225 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=225 y=255 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=255 y=-75 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=255 y=-45 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=255 y=-15 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=255 y=15 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=255 y=45 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=255 y=75 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=255 y=105 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=255 y=135 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=255 y=165 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=255 y=195 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=255 y=225 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=255 y=255 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=285 y=-75 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=285 y=-45 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=285 y=-15 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=285 y=15 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=285 y=45 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=285 y=75 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=285 y=105 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=285 y=135 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=285 y=165 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=285 y=195 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=285 y=225 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=285 y=255 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=315 y=-75 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=315 y=-45 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=315 y=-15 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=315 y=15 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=315 y=45 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=315 y=75 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=315 y=105 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=315 y=135 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=315 y=165 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=315 y=225 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=315 y=255 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=345 y=-45 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=345 y=-15 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=345 y=15 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=345 y=45 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=345 y=75 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=345 y=105 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=345 y=135 height=30 width=30}}
		{{controlWithVars "pixel" pixel x=345 y=255 height=30 width=30}}
		</script>
		
		
		<script type="text/x-handlebars" data-template-name="machine">
		{{controlWithVars "cogged-pixel" cogged-pixel x=45 y=-45 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=45 y=-15 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=45 y=15 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=45 y=45 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=45 y=75 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=45 y=105 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=45 y=135 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=45 y=165 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=45 y=195 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=45 y=225 height=30 width=30 col="#272727"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=75 y=-75 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=75 y=-45 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=75 y=-15 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=75 y=15 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=75 y=45 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=75 y=75 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=75 y=105 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=75 y=135 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=75 y=165 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=75 y=195 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=75 y=225 height=30 width=30 col="#272727"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=105 y=-75 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=105 y=-45 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=105 y=-15 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=105 y=15 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=105 y=45 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=105 y=75 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=105 y=105 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=105 y=135 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=105 y=165 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=105 y=195 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=105 y=225 height=30 width=30 col="#272727"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=105 y=255 height=30 width=30 col="#272727"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=135 y=-75 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=135 y=-45 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=135 y=-15 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=135 y=15 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=135 y=45 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=135 y=75 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=135 y=105 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=135 y=135 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=135 y=165 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=135 y=195 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=135 y=225 height=30 width=30 col="#272727"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=135 y=255 height=30 width=30 col="#272727"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=165 y=-75 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=165 y=-45 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=165 y=-15 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=165 y=15 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=165 y=45 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=165 y=75 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=165 y=105 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=165 y=135 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=165 y=165 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=165 y=195 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=165 y=225 height=30 width=30 col="#272727"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=195 y=-75 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=195 y=-45 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=195 y=-15 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=195 y=15 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=195 y=45 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=195 y=75 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=195 y=105 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=195 y=135 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=195 y=165 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=195 y=195 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=195 y=225 height=30 width=30 col="#272727"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=225 y=-75 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=225 y=-45 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=225 y=-15 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=225 y=15 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=225 y=45 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=225 y=75 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=225 y=105 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=225 y=135 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=225 y=165 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=225 y=195 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=225 y=225 height=30 width=30 col="#272727"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=225 y=255 height=30 width=30 col="#272727"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=255 y=-75 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=255 y=-45 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=255 y=-15 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=255 y=15 height=30 width=30 col="#8d8b87"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=255 y=45 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=255 y=75 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=255 y=105 height=30 width=30 col="#8d8b87"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=255 y=135 height=30 width=30 col="#8d8b87"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=255 y=165 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=255 y=195 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=255 y=225 height=30 width=30 col="#272727"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=255 y=255 height=30 width=30 col="#272727"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=285 y=-45 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=285 y=-15 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=285 y=15 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=285 y=45 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=285 y=75 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=285 y=105 height=30 width=30 col="#8d8b87"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=285 y=135 height=30 width=30 col="#8d8b87"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=285 y=165 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=285 y=195 height=30 width=30 col="#2e2e2e"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=285 y=225 height=30 width=30 col="#272727"}}
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
			{{#if this.controller.modernizr.webgl}}
			
				<div class="row">
					<div class="columns large-12 small-12">
						<div style="position:relative; width:100%">
							<div style="position:absolute; width:100%">
								{{controlWithVars 'world-3d' layoutName='lo-subtitle-row'}}
								<div class="page-content">
									<div class="row">
										<div class="columns large-4 small-12">
											{{{controlWithVars 'subtitle' orderRead='1' layoutName='lo-subtitle-row' hasRemoveButton=false thescript="<?php echo $d3copyA; ?>"}}}
											</div>
									
										<div class="columns large-4	  small-12">
											{{{controlWithVars 'subtitle' orderRead='2' layoutName='lo-subtitle-row' hasRemoveButton=false thescript="<?php echo $d3copyB; ?>"}}}
											{{{controlWithVars 'subtitle' orderRead='instruction' layoutName='lo-subtitle-instruction-row' isInstant=true hasRemoveButton=false thescript="<i class=\"icon-info-sign\"></i> <i>Turn</i> the above problem into an elegant idea"}}}				
										
										</div>
									
										<div class="columns large-4	  small-12">
										{{{controlWithVars 'subtitle' orderRead='award' layoutName='lo-subtitle-instant-row' isInstant=true hasRemoveButton=false thescript="<?php echo $d3award; ?>"}}}
											{{{controlWithVars 'subtitle' orderRead='art' layoutName='lo-subtitle-instant-row' isInstant=true hasRemoveButton=false thescript="<?php echo $d3art; ?>"}}}
										
										</div>
									</div>
								</div>
							</div>	
							
							<div style="position:absolute" class="page-content">
								{{{controlWithVars 'subtitle' orderRead='heading'  layoutName='lo-subtitle-row' hasRemoveButton=false thescript="<?php echo $d3heading?>"}}}
							</div>
							
							{{render 'modernizr-report' layoutName='lo-row'}}
						</div>
					</div>
				</div>
			{{else}}	
				{{render 'modernizr-report' layoutName='lo-row'}}

				<div class="row pointer-events-none">
					<div class="columns large-12 small-12">
						<div class="subtitle-text-holder">
	 						<span class="subtitle">This section of the site <strong>requires</strong> webGL to be enabled!</span>
						</div>
					</div>
					<div class="columns large-12 small-12">
						<div class="subtitle-text-holder">
	 						<span class="subtitle">Unfortunately your browser does not seem to support it :(</span>
						</div>
					</div>
				</div>
				
			{{/if}}
		</script>
		
	<script type="text/x-handlebars" data-template-name="world-3d">
		<div class="canvas-hero-holder">
			
		</div>
	</script>

	<script type="text/x-handlebars" data-template-name="entity-3d">
	</script>
	
	
	<script type="text/x-handlebars" data-template-name="examples">		
		
		<div class="row page-content">
			<div class="columns large-12">	
			<div class="examples">	
				<h1><span>Examples</span></h1>
				
				<h3><span>Web Development</span></h3>
				<ul>
					<li>
						<a href="#" data-reveal-id="shrlnews"><i class="icon-youtube-play"></i> National news site work (2011-2012)</a>
					</li>
					<li>
						<a href="#" data-reveal-id="shrladv"><i class="icon-youtube-play"></i> Advertising agency work (2008-2010)</a>
					</li>
					<li>
						<a href="#" data-reveal-id="shrlold"><i class="icon-youtube-play"></i> Game dev &#38; edutainment (2007 and prior)</a>
					</li>
				</ul>
				
		
				<h3><span>Storytelling</span></h3>
				<ul>
					<li>
						<a href="pgs/eg/mcgang/index.htm" target="_blank" ><i class="icon-external-link-sign"> Motorcycle infographic  </i></a>
					</li>
					<li>
						<a href="http://www.adelaidenow.com.au/news/ban-lifted-it-only-took-10-years-but-government-gives-r18-video-games-the-go-ahead/story-e6freaal-1226271799644" target="_blank" ><i class="icon-external-link-sign"> R18 games rating interactive infographic </i></a>
					</li>
				</ul>
				
				
				<h3><span>Creative</span></h3>
				<ul>
					<li><a href="#" data-reveal-id="award1"><i class="icon-picture"></i> Virgin Galactic announcement poster</a></li>
					<li><a href="#" data-reveal-id="award2"><i class="icon-picture"></i> Smart Four: Viral campaign</a></li>
					<li><a href="#" data-reveal-id="poster1"><i class="icon-picture"></i> Gamers4Croyden: idea #1</a></li>
					<li><a href="#" data-reveal-id="poster2"><i class="icon-picture"></i> Gamers4Croyden: idea #2</a></li>
				</ul>
				</div>
			</div>
		</div>


		
		
		<div id="poster1" class="reveal-modal small">
		  <h2>Gamers4Croyden: poster 1</h2>
		  <p>A poster to encourage voters to support the Gamers4Croyden political party in the 2010 South Australian elections</p>
		  <img src="img/eg/g4c-hadoken.png" style="width: 100%;">
		  <a class="close-reveal-modal">&#215;</a>
		</div>
		
		<div id="poster2" class="reveal-modal small">
		  <h2>Gamers4Croyden: poster 2</h2>
		  <p>A poster to encourage voters to support the Gamers4Croyden political party in the 2010 South Australian elections</p>
		  <img src="img/eg/g4c-controller.png" style="width: 100%;">
		  <a class="close-reveal-modal">&#215;</a>
		</div>

		<div id="award1" class="reveal-modal small">
		  <h2>Virgin Galactic announcement poster</h2>
		  <p>My poster for Award school where the brief was to announce the Virgin Galactic service</p>
			<img src="img/eg/award-virgin-galactic.png" style="width: 100%;">
		  <a class="close-reveal-modal">&#215;</a>
		</div>

		<div id="award2" class="reveal-modal large">
		  <h2>Smart Four: Viral campaign</h2>
		  <p>A viral campaign I designed to emphasis the "Go anywhere" slogan of the Smart Four mini car</p>
		  <img src="img/eg/award-smart-four.png" style="width: 100%;">
		  <a class="close-reveal-modal">&#215;</a>
		</div>


		<div id="shrlnews" class="reveal-modal large">
		  <h2>National news site work</h2>
		  <p>From 2011-2012 I worked for AdelaideNow, part of the Australian NewsCorp group</p>
	    <div class="flex-video">
		  <iframe width="640" height="360" src="//www.youtube.com/embed/pZgU5p6dNqE" frameborder="0" allowfullscreen></iframe>
			</div>
			<a class="close-reveal-modal">&#215;</a>
		</div>

		<div id="shrladv" class="reveal-modal large">
		  <h2>Advertising agency work</h2>
		  <p>From 2008-2010 I worked for Clemenger BBDO Adelaide, part of the global BBDO Advertising agency network</p>
	    <div class="flex-video">
		  <iframe width="853" height="480" src="//www.youtube.com/embed/WvHPl4456S4" frameborder="0" allowfullscreen></iframe>
			</div>
			<a class="close-reveal-modal">&#215;</a>
		</div>
		
		<div id="shrlold" class="reveal-modal large">
		  <h2>Game dev &#38; edutainment</h2>
		  <p>Work older than 2007</p>
	    <div class="flex-video">
		  <iframe width="960" height="720" src="//www.youtube.com/embed/1ntljBExo5o" frameborder="0" allowfullscreen></iframe>
			</div>
			<a class="close-reveal-modal">&#215;</a>
		</div>
		
		
		
		
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
 
<?php if (!$IS_DEPLOY) { ?>
<script src="js/lib/greensock/plugins/CSSPlugin.min.js"></script>
<script src="js/lib/greensock/easing/EasePack.min.js"></script>
<script src="js/lib/greensock/TweenMax.min.js"></script>
<script src="js/lib/greensock/TimelineMax.min.js"></script>

<?php } ?>

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