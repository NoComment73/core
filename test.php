<?php

/**
* ownCloud
*
* @author Vincent Petry
* @copyright 2014 Vincent Petry <pvince81@owncloud.com>
*
* This library is free software; you can redistribute it and/or
* modify it under the terms of the GNU AFFERO GENERAL PUBLIC LICENSE
* License as published by the Free Software Foundation; either
* version 3 of the License, or any later version.
*
* This library is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU AFFERO GENERAL PUBLIC LICENSE for more details.
*
* You should have received a copy of the GNU Affero General Public
* License along with this library.  If not, see <http://www.gnu.org/licenses/>.
*
*/

$RUNTIME_NOAPPS = true; //no apps, yet

try {
	require_once 'lib/base.php';

	// make sure this file is not runnable when not in DEV/DEBUG mode
	if (!defined('DEBUG') or !DEBUG) {
		OC_Template::printErrorPage(
			"Unit tests are disabled for security reasons. Please enable DEBUG mode in config.php to be able to run unit tests."
		);
		exit();
	}

	$appName = $_GET['app'];

	\OCP\Util::addStyle('core', 'jasmine');
	\OCP\Util::addScript('core', 'tests/lib/jasmine/jasmine');
	\OCP\Util::addScript('core', 'tests/lib/jasmine/jasmine-html');
	\OCP\Util::addScript('core', 'tests/lib/jasmine/boot');
	\OCP\Util::addScript('core', 'tests/lib/sinon-1.7.3');

	if (isset($appName)) {
		// TODO: sanitize app name!
		$appInfo = \OCP\App::getAppInfo($appName);
		if (!$appInfo) {
			OC_Template::printErrorPage(
				"App to test doesn't exist"
			);
			exit();
		}

		// test specific app
		$tmpl = new OCP\Template($appName, 'tests', 'tests');
	}
	else {
		// TODO: test core app
		$tmpl = new OCP\Template('', 'tests', 'tests');
	}
	$tmpl->printPage();
} catch (Exception $ex) {
	\OCP\Util::logException('index', $ex);

	//show the user a detailed error page
	OC_Response::setStatus(OC_Response::STATUS_INTERNAL_SERVER_ERROR);
	OC_Template::printExceptionErrorPage($ex);
}
