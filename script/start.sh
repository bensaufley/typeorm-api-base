#!/bin/sh

dir="`dirname $0`"

$dir/wait-for-it.sh db:5432 --strict -- yarn db:migrate && yarn start
