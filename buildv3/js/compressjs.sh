#!/bin/bash

# Constants
SERVICE_URL=http://closure-compiler.appspot.com/compile
NEWFILE="c`date +"%d%m%y"`.js"

# Check if files to compile are provided
if [ $# -eq 0 ]
then
	echo 'Nothing to compile. Specify input files as command arguments. E.g.'
	echo './compressjs file1.js file2.js file3.js'
	exit
fi

# Itearate through all files
for f in `find mvc -name "*.js"`
do
	if [ -r ${f} ]
	then
		testcode="--data-urlencode js_code@${f}"
		if false
		then
		# Send request
		curl \
		--url ${SERVICE_URL} \
		--header 'Content-type: application/x-www-form-urlencoded' \
		${testcode} \
		--data output_format=json \
		--data output_info=compiled_code \
		--data output_info=statistics \
		--data output_info=errors \
		--data compilation_level=WHITESPACE_ONLY |
		
		python -c '
import json, sys
data = json.load(sys.stdin)

print "data"
print data

if "errors" in data:
	print "### COMPILATION FAILED WITH ERRORS"
	for err in data["errors"]:
		file = sys.argv[int(err["file"].replace("Input_", "")) + 1]
		print "File: %s, %d:%d" % (file, err["lineno"], err["charno"])
		print "Error: %s" % err["error"]
		print "Line: %s" % err["line"]

	print "\nBuild failed.\n"

if hasattr(data, "compiledCode"):
	srcfileelements = "'${f}'".split("/")
	srcfilename = srcfileelements[len(srcfileelements)-1]
	filename = "gc"+srcfilename
	print "### TEST COMPLETED: "+filename
	f = open(filename, "w")
	f.write(data["compiledCode"])
	print "\nBuild file %s created.\n" % filename
else:	
	print "No compiled code for %s.\n" % "'${f}'"
' $@
		fi
	else
		echo "File ${f} does not exist or is not readable. Skipped."
	fi
done

# Send request
curl \
--url ${SERVICE_URL} \
--header 'Content-type: application/x-www-form-urlencoded' \
${code} \
--data output_format=json \
--data output_info=compiled_code \
--data output_info=statistics \
--data output_info=errors \
--data compilation_level=WHITESPACE_ONLY |

python -c '
import json, sys
data = json.load(sys.stdin)

print "sys.version"
print sys.version

if "errors" in data:
	print "### COMPILATION FAILED WITH ERRORS"
	for err in data["errors"]:
		file = sys.argv[int(err["file"].replace("Input_", "")) + 1]
		print "File: %s, %d:%d" % (file, err["lineno"], err["charno"])
		print "Error: %s" % err["error"]
		print "Line: %s" % err["line"]
		
	print "\nBuild failed.\n"
	
else:
	print "### COMPILATION COMPLETED"
	print "Original size: %db, gziped: %db" % (data["statistics"]["originalSize"], data["statistics"]["originalGzipSize"])
	print "Compressed size: %db, gziped: %db" % (data["statistics"]["compressedSize"], data["statistics"]["compressedGzipSize"])
	print "Compression rate: %.2f" % (float(data["statistics"]["compressedSize"]) / int(data["statistics"]["originalSize"]))

	filename = "gc'${NEWFILE}'"
	f = open(filename, "w")
	f.write(data["compiledCode"])

	print "\nBuild file %s created.\n" % filename
' $@