<!DOCTYPE html>
<!--[if IE 8]> 				 <html class="no-js lt-ie9" lang="en" > <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en" > <!--<![endif]-->
<?php
$IS_DEPLOY = true;
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
	<script src="//cdn.jsdelivr.net/modernizr/2.6.2/modernizr.min.js"></script>
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
	<script src="javascripts/vendor/custom.modernizr.js"></script>
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

<?php } ?>


<?php
$indexCopyA = '@actionOnRead=doInstruction
@=<h3>
Hi, my name is Ashley Coleman 
@=</h3>
<i>A good starting point</i>

I built this portfolio site to show who I am. 
You are at the start page aka the <i>origin</i>. 
Continue on to learn about my different dimensions. 
@actionOnRead=doSecondSubtitle
@wait=1000
@actionOnRead=doFourthSubtitle';
$indexCopyA = addcslashes($indexCopyA, '"');

?>

<?php
$indexCopyB = '@=<h3>
Welcome to my Sandbox
@=</h3>
This website has a secondary role as a development sandbox.
Here I experiment with new ideas, technology tests etc.
So don\'t be surprised if things change!';
$indexCopyB = addcslashes($indexCopyB, '"');

?>


<?php
$indexCopyC = '@=<h3>
Contact Details
@=</h3>
@=<address>
<i class="icon-envelope"></i> writetofish+cv<i>@</i>gmail.com
<i class="icon-phone"></i> (+44) 77 5298 3159
<i class="icon-twitter"></i> <a href="https://twitter.com/AshCoolman" target="_blank">@AshCoolman</a>
<i class="icon-home"></i> London, United Kingdom (formally Australia)
@=</address>
@actionOnRead=doSecondSubtitle
@actionOnRead=doThirdSubtitle 2000';
$indexCopyC = addcslashes($indexCopyC, '"');

?>


<?php
$quot = htmlspecialchars("\"");


 $d1copyA = '@=<h3>
Developer
@=</h3>
<i>My 1st dimension</i>

Developing <b>multimedia</b> is my craft and passion.
I care about tech\'s <i>bleeding edge</i> and the <i>ubiquitous mainstream</i>, but most of all I care about the user objectives.

I\'ve worked in <b>front-end</b>,  <b>back-end</b>, in teams, solo, and in every stage of development. I value code decoupling and clarity, and I am comfortable with a variety of development tools. 

And I know when something just needs to be hacked. As a certain <a href="http://goo.gl/O5dnGf" target="_blank">clever cookie</a> once said:
<i class="quote"><sup class="icon-quote-left superscript"></sup> Real artists ship <sup class="icon-quote-right superscript"></sup>
@actionOnRead=doSubtitle2 0
@actionOnRead=doSubtitle3 2500';
$d1copyA = addcslashes($d1copyA, '"');

$obligatoryList = '<span class="heading"> <i class="icon-chevron-left"></i> OBLIGATORY SKILL SUMMARY LIST <i class="icon-chevron-right"></i> </span>
@=<div class="indent">
	<span class="heading">Javascript technologies</span>
	JQuery 
	Ember 
	threejs (WebGL) 
	nodejs
	plus more!

	<span class="heading">Markup languages</span>
	HTML
	HTML5
	CSS
	CSS3
	SASS
	SVG
	
	<span class="heading">Flash technologies</span>
	AS3
	Flex
	Flash Video
	
	<span class="heading">Serverside technologies</span>
	PHP
	SQL 
	Templating libraries 

	<span class="heading">Coding Paradigms/Patterns</span>
	OOP
	MVC 
	MVP 

	<span class="heading">General knowledge</span>
	3d Math
	2d / 3d Physics
	Geolocation
	API creation
	Code documentation
	Photoshop, Premiere, AfterEffects

@=</div>

<span class="heading"> <i class="icon-chevron-left"></i>/ OBLIGATORY SKILL SUMMARY LIST<i class="icon-chevron-right"></i> </span>';

$obligatoryList = addcslashes($obligatoryList, '"');			
?>

<?php 
$d2copyA =  '@=<h3>
Storyteller
@=</h3>
<i>My 2nd dimension</i>

@actionOnRead=doShowUser
I build stuff because I love to create change in other people.
@actionOnRead=doShowMachine
That change could be via emotional impact, a message, or even a by providing a service.
@actionOnRead=doInstructionTurnOnController 1000';

$d2copyB =  '@actionOnRead=doHideUser
If the question is how create change from the web, 
@actionOnRead=doShowQuestion
@wait=1200
 I can work the underlying technology to leave an answer.
@actionOnRead=doShowMachineCogs
@actionOnRead=doSubtitle2';

$d2Example = '@=<h3>
Example Infographic
@=</h3>
Check out how I used an <a href=\"http://www.adelaidenow.com.au/news/ban-lifted-it-only-took-10-years-but-government-gives-r18-video-games-the-go-ahead/story-e6freaal-1226271799644\" target=\"_blank\">interactive infographic</a> to explain a complex story. <i>This was for NewsCorp\'s Australian news network</i>';
?>

<?php
$d3copyA = '@=<h3>
Creative 
@=</h3>
<i>My 3rd dimension</i>
Creativity can turn a message into impact, data into knowledge, and function into fun.
The key is to <b>think laterally</b> to turn a problem into an elegant idea... 
@wait=3000
@actionOnRead=doRotateQuestionMarkHint
@wait=5000
@actionOnRead=doRotateQuestionMark
@wait=500
@actionOnRead=doRotateQuestionMarkInstruction'; 

$d3copyB = '<i>Nice one!</i>

 ...once you have that, everything else slots into place.';

$d3award = '@=<h3>
Advertising school 
@=</h3>
In 2010, I was selected for and completed AWARD school, Australias best regarded advertising creative course:
<a href=\"http://awardonline.com/education/award-school#.UlSoM2TF1LU\" target=\"_blank\">AWARD School</a>';


$d3art = '@=<h3>
Art lover
@=</h3>
I have a great love of art, and in 2012 I curated a pop up art gallery:
<a href=\"http://www.deathrattleshows.com/\" target=\"_blank\">The Death Rattle Shows</a>';

?>

		<script type="text/x-handlebars" data-template-name="application">
			{{outlet background}}
			{{render 'ruler'}}
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
			<div class="row pointer-events-none">
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
					<li class="name"> <h1>Ashley by dimension </h1> </li>
			    	<li class="toggle-topbar menu-icon"><a href="#"><span></span></a></li>
				</ul>
			
				<section class="top-bar-section">
			    	<ul class="left">
						<!-- Title Area -->
			
					    <li class="divider"></li>
						{{#view view.NavListItemView item="doIndex" }}
				            <h1>0d <a {{action doIndex}} >Intro</a></h1>
				        {{/view}}
			
					    <li class="divider"></li>
						{{#view view.NavListItemView item="doDimension1" }}
				            <h1>1d <a {{action doDimension1}} >Developer</a></h1>
				        {{/view}}
			
						<li class="divider"></li>
				        {{#view view.NavListItemView item="doDimension2" }}
				            <h1>2d <a {{action doDimension2}} >Storyteller</a></h1>
				        {{/view}}
			
						<li class="divider"></li>
				        {{#view view.NavListItemView item="doDimension3" }}
				            <h1>3d <a {{action doDimension3}} >Creative</a></h1>
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
		</script>

		<script type="text/x-handlebars" data-template-name="index">		
			
			<div class="row">
				<div class="columns large-6  small-6">		
					{{{controlWithVars 'subtitle' readOrder='1' layoutName='lo-subtitle-row' hasRemoveButton=false thescript="<?php echo $indexCopyA; ?>"}}}
					{{{controlWithVars 'subtitle' readOrder='2' layoutName="lo-subtitle-row-link" thescript="<i class=\"icon-caret-right\"></i> Go to dimension @edits=One...,X...,Who...,What..." isLink=true linkEvent="doGotoDimension1" hoverEvent="doDimensionNavHover"}}}
					
				</div>
				<div class="columns large-6 small-6">
					{{{controlWithVars 'subtitle' readOrder='3' layoutName='lo-subtitle-instant-row' isInstant=true hasRemoveButton=false thescript="<?php echo $indexCopyC; ?>"}}}
					{{{controlWithVars 'subtitle' readOrder='4' layoutName='lo-subtitle-instant-row' isInstant=true hasRemoveButton=false thescript="<?php echo $indexCopyB; ?>"}}}
				</div>
			</div>
		</script>

		<script type="text/x-handlebars" data-template-name="dimension1-background">
			<div class="full-width-centered" >
				{{renderWithVars 'interactive-grid' pixW=20 isPlotX=true}}
				{{render 'heartbeat' heartbeat}}
			</div>
		</script>
		
		<script type="text/x-handlebars" data-template-name="dimension1">
			<div class="row">
				<div class="columns large-6  small-6">
					{{{controlWithVars 'subtitle' orderRead='1' layoutName='lo-subtitle-row' hasRemoveButton=true thescript="<?php echo $d1copyA; ?>"}}}
					{{{controlWithVars 'subtitle' orderRead='2' layoutName='lo-subtitle-row-link' isLink=true linkEvent="doGotoDimension2"  hoverEvent="doDimensionNavHover" hasRemoveButton=true thescript="<i class=\"icon-caret-right\"></i> Go to dimension @edits=Two...,Y...,Why?...,Motivation..."}}} 
					{{{controlWithVars 'subtitle' orderRead='3' layoutName='lo-subtitle-instant-row' isInstant=true hasRemoveButton=true thescript="<?php echo $obligatoryList; ?>"}}}
				</div>
				<div class="columns large-6 small-6">
					{{{controlWithVars 'subtitle' orderRead='0' layoutName='lo-subtitle-instruction-row' isInstant=true hasRemoveButton=true thescript="<i class=\"icon-info-sign\"></i> Use mouse to find my x values "}}}
					<div class="interactive-graph-output">
						<div class="graph-info">
							<h3 {{bindAttr class="interactiveGridData.0.type.cssClass"}}>{{{interactiveGridData.0.x}}}</h3>
							{{#each this.interactiveGridData}}
								<strong class="sub-heading">{{{this.text}}}</strong>
								<ol>
								{{#each this.xList}}
									<li>{{{this}}}</li>
								{{/each}}
								</ol>
							{{/each}}
						</div>
					</div>
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
				<div style="display:none" class="interactive-grid-values">Javascript technologies I know

Libraries (JQuery, Google Glosue Library etc)
Frameworks (Foundation 4, Ember, bootstrap etc)
Service APIs ( Google Maps, Facebook Graph etc )
HTML APIs (WebGL, geolocation, sound, video etc)

## web markup languages I know

HTML(5)
CSS(3)
SASS & LESS
SVG 

## web development experience I have

AJAX
Cross-domain problems
UX & Performance
SEO & Analytics
Cross browser (Responsive, graceful degradation etc)
Input validation
Profiling tools (jankfree.org!)

## flash technologies I know

AS2 & AS3
Flash Video 
Flex
MXML

## backend technology I know

PHP 
SQL (mySQL, PostgresSQL)
Nodejs

## development tools & techniques I know

Make files
Minification (YUI Compressor, Closure Compiler)
Unit testing (QUnitjs)
Doc generation
Chrome Dev tools (and other browser equivalents)
User testing
API creation

## project tools & techniques I know

Version control (SVN, Git, Mecurial)
Issue tracking (JIRA, Bugzila etc) 
Wireframing & Prototyping (Fireworks, Axure etc)

## useful areas of general knowledge I have

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

## laptops stolen while making this site
1

## random quotes I like

"Real artists ship" - Steve Jobs
"Dont guess it, test it" -Paul Lewis

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
			<div class="full-width-centered">
				{{render 'heartbeat' heartbeat}}
			</div>
			{{controlWithVars 'world-2d' layoutName='lo-subtitle-row'}} 
			{{controlWithVars 'esl-entity-container'}}
			<div class="row">
				<div class="columns large-8 small-12">
					<div class="row">
						<div class="columns large-6 small-12">
							{{{controlWithVars 'subtitle' orderRead='1' layoutName='lo-subtitle-row' hasRemoveButton=true thescript="<?php echo $d2copyA?>"}}}
							{{{controlWithVars 'subtitle' orderRead='1a' layoutName='lo-subtitle-row' hasRemoveButton=true thescript="<?php echo $d2copyB?>"}}}			
							{{{controlWithVars 'subtitle' orderRead="2" layoutName="lo-subtitle-row-link" thescript="<i class=\"icon-caret-right\"></i> Go to dimension @edits=Three...,Z...,Depth...,Exploration..." isLink=true linkEvent="doGotoDimension3" hoverEvent="doDimensionNavHover" }}}
						</div>
						
						<div class="columns large-6 small-12">
							{{{controlWithVars 'subtitle' orderRead='instructionTurnOn' layoutName='lo-subtitle-instruction-row' isInstant=true hasRemoveButton=false thescript="<i class=\"icon-info-sign\"></i> Press <span style=\"background-color:#005500; width:2em; height:1.2em; color:#005500\">ON</span> on the above <i>Change Inducer &trade;</i> I just created for you"}}}
							{{{controlWithVars 'subtitle' orderRead='instructionTurnOff' layoutName='lo-subtitle-instruction-row' isInstant=true hasRemoveButton=false thescript="<i class=\"icon-info-sign\"></i> Once you are satisfied with your inducing, press the <span style=\"background-color:#33CC33; width:2em; height:1.2em; color:#33CC33\">ON</span> button above to continue"}}}
						
						</div>
					</div>
				</div>
				<div class="columns large-4  small-12">				
					{{{controlWithVars 'subtitle' orderRead="example" layoutName="lo-subtitle-instant-row" thescript="<?php echo $d2Example ?>" isLink=false isInstant=true }}}
				</div>
			</div>
			
		</script>	

		<script type="text/x-handlebars" data-template-name="world-2d">
			<div class="canvas-hero-holder"></div>
			{{controlWithVars 'ash' ash x=-540 img="img//face-ash.png"}}
			
			{{controlWithVars 'machine' machine x=-180 y=90 visible=false	}}
			{{controlWithVars 'question' question x=-120 y=0 visible=false}}
			{{controlWithVars 'user' user x=120 y=90 visible=false}}
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
		{{controlWithVars "cogged-pixel" cogged-pixel x=45 y=-45 height=30 width=30 col="#5a5b5d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=45 y=-15 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=45 y=15 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=45 y=45 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=45 y=75 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=45 y=105 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=45 y=135 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=45 y=165 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=45 y=195 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=45 y=225 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=45 y=255 height=30 width=30 col="#414141"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=75 y=-75 height=30 width=30 col="#5a5b5d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=75 y=-45 height=30 width=30 col="#5a5b5d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=75 y=-15 height=30 width=30 col="#3a3a3a"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=75 y=15 height=30 width=30 col="#3a3a3a"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=75 y=45 height=30 width=30 col="#3a3a3a"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=75 y=75 height=30 width=30 col="#3a3a3a"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=75 y=105 height=30 width=30 col="#3a3a3a"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=75 y=135 height=30 width=30 col="#3a3a3a"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=75 y=165 height=30 width=30 col="#3a3a3a"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=75 y=195 height=30 width=30 col="#3a3a3a"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=75 y=225 height=30 width=30 col="#414141"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=75 y=255 height=30 width=30 col="#414141"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=105 y=-75 height=30 width=30 col="#5a5b5d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=105 y=-45 height=30 width=30 col="#3a3a3a"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=105 y=-15 height=30 width=30 col="#5a5b5d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=105 y=15 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=105 y=45 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=105 y=75 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=105 y=105 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=105 y=135 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=105 y=165 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=105 y=195 height=30 width=30 col="#474747"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=105 y=225 height=30 width=30 col="#3a3a3a"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=105 y=255 height=30 width=30 col="#414141"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=135 y=-75 height=30 width=30 col="#5a5b5d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=135 y=-45 height=30 width=30 col="#3a3a3a"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=135 y=-15 height=30 width=30 col="#5a5b5d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=135 y=15 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=135 y=45 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=135 y=75 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=135 y=105 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=135 y=135 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=135 y=165 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=135 y=195 height=30 width=30 col="#474747"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=135 y=225 height=30 width=30 col="#3a3a3a"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=135 y=255 height=30 width=30 col="#414141"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=165 y=-75 height=30 width=30 col="#5a5b5d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=165 y=-45 height=30 width=30 col="#3a3a3a"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=165 y=-15 height=30 width=30 col="#5a5b5d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=165 y=15 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=165 y=45 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=165 y=75 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=165 y=105 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=165 y=135 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=165 y=165 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=165 y=195 height=30 width=30 col="#474747"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=165 y=225 height=30 width=30 col="#3a3a3a"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=165 y=255 height=30 width=30 col="#414141"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=195 y=-75 height=30 width=30 col="#5a5b5d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=195 y=-45 height=30 width=30 col="#3a3a3a"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=195 y=-15 height=30 width=30 col="#5a5b5d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=195 y=15 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=195 y=45 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=195 y=75 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=195 y=105 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=195 y=135 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=195 y=165 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=195 y=195 height=30 width=30 col="#474747"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=195 y=225 height=30 width=30 col="#3a3a3a"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=195 y=255 height=30 width=30 col="#414141"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=225 y=-75 height=30 width=30 col="#5a5b5d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=225 y=-45 height=30 width=30 col="#3a3a3a"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=225 y=-15 height=30 width=30 col="#5a5b5d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=225 y=15 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=225 y=45 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=225 y=75 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=225 y=105 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=225 y=135 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=225 y=165 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=225 y=195 height=30 width=30 col="#474747"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=225 y=225 height=30 width=30 col="#3a3a3a"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=225 y=255 height=30 width=30 col="#414141"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=255 y=-75 height=30 width=30 col="#5a5b5d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=255 y=-45 height=30 width=30 col="#5a5b5d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=255 y=-15 height=30 width=30 col="#3a3a3a"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=255 y=15 height=30 width=30 col="#3a3a3a"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=255 y=45 height=30 width=30 col="#3a3a3a"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=255 y=75 height=30 width=30 col="#3a3a3a"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=255 y=105 height=30 width=30 col="#3a3a3a"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=255 y=135 height=30 width=30 col="#3a3a3a"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=255 y=165 height=30 width=30 col="#3a3a3a"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=255 y=195 height=30 width=30 col="#3a3a3a"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=255 y=225 height=30 width=30 col="#414141"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=255 y=255 height=30 width=30 col="#414141"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=285 y=-45 height=30 width=30 col="#5a5b5d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=285 y=-15 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=285 y=15 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=285 y=45 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=285 y=75 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=285 y=105 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=285 y=135 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=285 y=165 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=285 y=195 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=285 y=225 height=30 width=30 col="#4d4d4d"}}
		{{controlWithVars "cogged-pixel" cogged-pixel x=285 y=255 height=30 width=30 col="#414141"}}
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
			{{controlWithVars 'world-3d' layoutName='lo-subtitle-row'}}
			
			{{controlWithVars 'esl-entity-container'}}
			
			<div class="row">
				<div class="large-8 small-12 columns">
					{{{controlWithVars 'subtitle' orderRead='1' layoutName='lo-subtitle-row' hasRemoveButton=false thescript="<?php echo $d3copyA; ?>"}}}
					{{{controlWithVars 'subtitle' orderRead='2' layoutName='lo-subtitle-row' hasRemoveButton=false thescript="<?php echo $d3copyB; ?>"}}}
					{{{controlWithVars 'subtitle' orderRead='instruction' layoutName='lo-subtitle-instruction-row' isInstant=true hasRemoveButton=false thescript="<i class=\"icon-info-sign\"></i> Find the elegant idea above (think <i>laterally</i>)..."}}}
				</div>
				<div class="large-4 small-12 columns">
					{{{controlWithVars 'subtitle' orderRead='art' layoutName='lo-subtitle-instant-row' isInstant=true hasRemoveButton=false thescript="<?php echo $d3art; ?>"}}}
					{{{controlWithVars 'subtitle' orderRead='award' layoutName='lo-subtitle-instant-row' isInstant=true hasRemoveButton=false thescript="<?php echo $d3award; ?>"}}}
				</div>
			</div>
				
		</script>

	<script type="text/x-handlebars" data-template-name="world-3d">
		<div class="canvas-hero-holder">
			
		</div>
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