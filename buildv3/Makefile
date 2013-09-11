# Patterns matching CSS files that should be minified. Files with a -min.css
# suffix will be ignored.
CSS_FILES = $(filter-out %-min.css,$(wildcard \
	css/*.css \
	css/**/*.css \
))

# Patterns matching JS files that should be minified. Files with a -min.js
# suffix will be ignored.

# JS_GROUP = "lib"
# JS_GROUP = "custom"
# JS_GROUP = "foundation"

ifeq ($(JS_GROUP),"lib")
JS_FILES = $(filter-out %-min.js,$(wildcard \
	js/lib/stats.min.js \
	js/lib/threex.rendererstats.js \
	js/lib/json2.js \
	js/lib/rAF.js \
	js/lib/jquery-1.8.1.min.js \
	js/lib/handlebars.js \
	js/lib/three.js \
	js/lib/THREEx.WindowResize.js \
	js/lib/easeljs-0.6.0.min.js \
	js/lib/tweenjs-0.4.0.min.js \
	js/lib/movieclip-0.6.0.min.js \
	js/lib/CSSPlugin.js \
	js/lib/Ease.js \
	js/lib/preloadjs-0.3.0.min.js \
))
endif

ifeq ($(JS_GROUP),"custom")
JS_FILES = $(filter-out %-min.js,$(wildcard \
	js/lib/ragh/*.js \
	js/lib/ragh/**/*.js \
	js/lib/ragh/**/**/*.js \
	js/lib/ragh/**/**/**/*.js \
	js/lib/ragh/**/**/**/**/*.js \
	js/lib/ragh/**/**/**/**/**/*.js \
	js/lib/ragh/**/**/**/**/**/**/*.js \
	js/lib/ragh/**/**/**/**/**/**/**/*.js \
	js/lib/ragh/**/**/**/**/**/**/**/**/*.js \
	js/mvc/*.js \
	js/mvc/**/*.js \
	js/mvc/**/**/*.js \
	js/mvc/**/**/**/*.js \
	js/mvc/**/**/**/**/*.js \
	js/mvc/**/**/**/**/**/*.js \
	js/mvc/**/**/**/**/**/**/*.js \
	js/mvc/**/**/**/**/**/**/**/*.js \
	js/mvc/**/**/**/**/**/**/**/**/*.js \
))
endif

ifeq ($(JS_GROUP),"foundation")
JS_FILES = $(filter-out %-min.js,$(wildcard \
	javascripts/foundation/foundation.js \
	javascripts/foundation/foundation.alerts.js \
	javascripts/foundation/foundation.clearing.js \
	javascripts/foundation/foundation.cookie.js \
	javascripts/foundation/foundation.dropdown.js \
	javascripts/foundation/foundation.forms.js \
	javascripts/foundation/foundation.interchange.js \
	javascripts/foundation/foundation.joyride.js \
	javascripts/foundation/foundation.magellan.js \
	javascripts/foundation/foundation.orbit.js \
	javascripts/foundation/foundation.placeholder.js \
	javascripts/foundation/foundation.reveal.js \
	javascripts/foundation/foundation.section.js \
	javascripts/foundation/foundation.tooltips.js \
	javascripts/foundation/foundation.topbar.js \
))
endif

# Command to run to execute the YUI Compressor.
YUI_COMPRESSOR = java -jar yuicompressor-2.4.8.jar

# Flags to pass to the YUI Compressor for both CSS and JS.
YUI_COMPRESSOR_FLAGS = --charset utf-8 --verbose

CSS_MINIFIED = $(CSS_FILES:.css=-min.css)
JS_MINIFIED = $(JS_FILES:.js=-min.js)

ifeq ($(JS_GROUP),"lib")
js/lib.min.js:$(JS_MINIFIED)
	@echo '==> concating lib $<'
	cat $^ >$@
	@echo
endif

ifeq ($(JS_GROUP),"custom")
js/custom.min.js:$(JS_MINIFIED)
	@echo '==> concating custom $<'
	cat $^ >$@
	@echo
endif


ifeq ($(JS_GROUP),"foundation")
js/foundation.min.js:$(JS_MINIFIED)
	@echo '==> concating foundation $<'
	cat $^ >$@
	@echo
endif

css/all.min.js:$(CSS_MINIFIED)
	@echo '==> concating css $<'
	cat $^ >$@
	@echo


# target: minify - Minifies CSS and JS.
minify: minify-css minify-js

# target: minify-css - Minifies CSS.
minify-css: $(CSS_FILES) $(CSS_MINIFIED)

# target: minify-js - Minifies JS.
minify-js: $(JS_FILES) $(JS_MINIFIED)




%-min.css: %.css
	@echo '==> Minifying $<'
	$(YUI_COMPRESSOR) $(YUI_COMPRESSOR_FLAGS) --type css $< >$@
	@echo

%-min.js: %.js
	@echo '==> Minifying $<'
	$(YUI_COMPRESSOR) $(YUI_COMPRESSOR_FLAGS) --type js $< >$@
	@echo




# target: clean - Removes minified CSS and JS files.
clean:
	rm -f $(CSS_MINIFIED) $(JS_MINIFIED)

# target: help - Displays help.
help:
	@egrep "^# target:" Makefile