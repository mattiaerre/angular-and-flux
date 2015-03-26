// see: http://stackoverflow.com/questions/8315088/prevent-requirejs-from-caching-required-scripts

require.config({
    paths: {
        angular: '//code.angularjs.org/1.3.14/angular'
    },
    //urlArgs: 'bust=' + (new Date()).getTime(),
    shim: {
        angular: {
            exports: 'angular'
        }
    },
});

require(['angular', 'app', 'math-engine', 'main-controller'], function (angular, app) {
    //var appName = 'streaming-knife';
    //angular.module(appName, []);

    app.init();
});