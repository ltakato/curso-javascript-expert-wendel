# from root dir
# cd ../

echo 'all test files'
find . -name *.test.js

echo 'test files ignoring node_modules'
find . -name *.test.js -not -path '*node_modules**'

echo 'all js files ignoring node_modules'
find . -name *.js -not -path '*node_modules**'

npm i -g ipt

echo 'all js files ignoring node_modules (with ipt)'
find . -name *.js -not -path '*node_modules**' | ipt

# copied project from module 01
# cp -r ../../modulo01/aula-05-tdd-project-pt03/ .

CONTENT='"use strict";'
find . -name *.js -not -path '*node_modules**' \
| ipt -o \
| xargs -I '{file}' sed -i "" -e '1s/^/\'"$CONTENT"'\n/g' {file}

# 1s -> first line
# ^ -> first column
# replace with $CONTENT
# break the line to add implicit \n

# if want to replace all, remove ipt from pipe
