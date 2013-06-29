#!/bin/sh
for file in `find . -name "*.js"`
do
echo "Compressing $file …"
java -jar yuicompressor-2.4.8.jar --type js -o $file $file
done

