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
	echo 'Node JS >= 0.8 is required to run the JavaScript tests' >&2
	exit 1
fi

# update/install test packages
mkdir -p "$PREFIX" && $NPM install --prefix "$PREFIX" || exit 3

KARMA="$(which karma 2>/dev/null)"

# If not installed globally, try local version
if test -z "$KARMA"
then
	KARMA="$PREFIX/node_modules/karma/bin/karma"
fi

if test -z "$KARMA"
then
	echo 'Karma module executable not found, please install it with "npm install -g karma"' >&2
	exit 2
fi

export KARMA_TESTSUITE="$1"
$KARMA start tests/karma.config.js --single-run

