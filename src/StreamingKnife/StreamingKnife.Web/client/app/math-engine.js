var MathEngine = function () {
    var sum = function (a, b) {
        return a + b;
    };

    return {
        sum: sum,
    };
};

define(['angular'], function(angular) {
    var appName = 'streaming-knife';
    angular.module(appName, []);

    angular.module('streaming-knife').factory('mathEngine', MathEngine);
});