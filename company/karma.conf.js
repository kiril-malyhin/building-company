// Karma configuration
// Generated on Wed Apr 13 2016 12:08:44 GMT+0300 (MSK)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'https://code.jquery.com/jquery-1.11.2.min.js',
      'vendor/bower/angular/angular.js',
      'vendor/bower/angular-mocks/angular-mocks.js',
      'vendor/bower/angular-resource/angular-resource.js',
      //'vendor/bower/jquery/dist/jquery.min.js',
      //'vendor/bower/jquery.inputmask/dist/jquery.inputmask.bundle.min.js',
      //'vendor/bower/bower-asset/angular-route/angular-route.min.js',
      //'vendor/bower/bower-asset/angular-strap/dist/angular-strap.min.js',
      //'vendor/bower/bower-asset/angular-strap/dist/angular-strap.tpl.min.js',
      //'vendor/bower/bower-asset/angular-strap/dist/angular-strap.compat.min.js',
      //'vendor/bower/yii2-pjax/jquery.pjax.js',
      'web/js/**/*.js',
      'test/**/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      //'test**/!(*spec).js': 'coverage'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
};
