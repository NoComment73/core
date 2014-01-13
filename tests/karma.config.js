// Karma configuration
// Generated on Mon Jan 13 2014 20:08:59 GMT+0100 (CET)

module.exports = function(config) {

	var defaultApps = ['files'];
	var appsToTest = process.env.KARMA_TESTSUITE || null;

	var corePath = 'core/js/';
	var coreFiles = require('../' + corePath + 'core.json').modules;
	var testCore = false;
	var files = [];
	var index;

	if (appsToTest) {
		appsToTest = appsToTest.split(' ');
		index = appsToTest.indexOf('core');
		if (index > -1) {
			appsToTest.splice(index, 1);
			testCore = true;
		}
	}
	else {
		// test core by default
		testCore = true;
		appsToTest = defaultApps;
	}

	// extra test libs
	files.push(corePath + 'tests/lib/sinon-1.7.3.js');

	// core mocks
	files.push(corePath + 'tests/ocmock.js');

	for ( var i = 0; i < coreFiles.length; i++ ) {
		files.push( corePath + coreFiles[i] );
	}


	if (testCore) {
		// core tests
		files.push(corePath + 'tests/specs/*.js');
	}

	for ( var i = 0; i < appsToTest.length; i++ ) {
		files.push('apps/' + appsToTest[i] + '/js/*.js');
		files.push('apps/' + appsToTest[i] + '/tests/js/*.js');
	}

	config.set({

		// base path, that will be used to resolve files and exclude
		basePath: '..',


		// frameworks to use
		frameworks: ['jasmine'],

		// list of files / patterns to load in the browser
		files: files,

		// list of files to exclude
		exclude: [

		],


		// test results reporter to use
		// possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
		reporters: ['progress'],


		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,


		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera (has to be installed with `npm install karma-opera-launcher`)
		// - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
		// - PhantomJS
		// - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
		browsers: ['PhantomJS'],


		// If browser does not capture in given timeout [ms], kill it
		captureTimeout: 60000,


		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: false
  });
};
