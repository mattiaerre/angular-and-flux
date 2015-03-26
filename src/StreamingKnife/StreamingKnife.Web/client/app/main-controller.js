var MainController = function (mathEngine) {
    var vm = this;

    vm.title = 'HELLO! ' + mathEngine.sum(2, 2);

    return vm;
};

define(['angular'], function (angular) {
    //var appName = 'streaming-knife';
    //angular.module(appName, []);

    angular.module('streaming-knife').controller('MainController', MainController);
});