(function (app) {
    var WidgetController = function ($scope, $http, $q, $interval, $log) {
        // todo !!!
        var url = config.apiUrl; // todo: inject this ???
        //var commands = config.commands; // todo: inject this ???

        $scope.title = 'WIDGET';
        $scope.heading = 'Knowing you better to serve you - You\'re just a few questions away from winning ' + 100 + ' City points';

        var getNext = function (startFrom) {
            return $http({ url: url, method: 'GET', params: { command: 'next', startFrom: startFrom } }).then(function (response) {
                // todo: check response
                $scope.question = response.data;
            });
        };

        $scope.promise = getNext(0);

        $scope.next = function (question) {
            if (question.TheAnswer == null) {
                $log.error('error: "TheAnswer" is null');
                return;
            }
            $scope.promise = $http.post(url, { question: question }).then(function (response) {
                // todo: check response
                $scope.promise = getNext(question.Order);
            });
        };

        $scope.skip = function (question) {
            $scope.promise = getNext(question.Order);
        };
    };

    app.controller('WidgetController', WidgetController);
}(app));
