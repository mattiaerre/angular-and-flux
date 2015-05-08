(function (angular) {
    var appName = 'running-app';
    angular.module(appName, []);
    angular.module(appName).controller('PaceCalculatorController', PaceCalculator.PaceCalculatorController);
})(angular);