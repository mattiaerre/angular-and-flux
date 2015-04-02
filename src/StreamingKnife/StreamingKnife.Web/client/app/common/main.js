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

require(['angular', 'common'], function (angular) {
    var appName = 'streaming-knife';
    angular.module(appName, []);
    angular.module(appName).service('dispatcher', Common.Dispatcher);
    angular.module(appName).service('logger', Common.Logger);
    angular.module(appName).controller('TextArea', Common.TextArea);
    angular.module(appName).controller('Inbox', Common.Inbox);

    angular.module(appName).run(bootstrap);

    bootstrap.$inject = ['logger'];
    function bootstrap(logger) {
        logger.init();
    }
});