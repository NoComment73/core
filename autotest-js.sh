#!/bin/bash
#
# ownCloud
#
# Run JS tests
#
# @author Vincent Petry
# @copyright 2014 Vincent Petry <pvince81@owncloud.com>
#
NPM="$(which npm 2>/dev/null)"
PREFIX="build"

if test -z "$NPM"
then
	echo 'Node JS >= 0.10 is required to run the JavaScript tests' >&2
	exit 1
fi

KARMA="$(which karma 2>/dev/null)"

# If not installed globally, try local version
if test -z "$KARMA"
then
	KARMA="$PREFIX/node_modules/karma/bin/karma"
	if ! test -x "$KARMA"
	then
		# Try and install it
		mkdir -p "$PREFIX" && npm install karma --prefix "$PREFIX" || exit 3
	fi
fi

if test -z "$KARMA"
then
	echo 'Karma module executable not found, please install it with "npm install -g karma"' >&2
	exit 2
fi

export KARMA_TESTSUITE="$1"
$KARMA start tests/karma.config.js --single-run

