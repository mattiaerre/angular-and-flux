(function (app) {
    var WidgetController = function ($scope, $http, $q, $interval, $log) {
        // todo !!!
        var url = config.apiUrl; // todo: inject this ???
        var commands = config.commands; // todo: inject this ???

        $scope.title = 'WIDGET';
        $scope.heading = 'Knowing you better to serve you - You\'re just a few questions away from winning ' + 100 + ' City points';

        var getNext = function () {
            return $http({ url: url, method: 'GET', params: { command: 'next' } }).then(function (response) {
                $scope.question = response.data;
            });
        };

        $scope.promise = getNext();

        $scope.next = function (question) {
            if (question.TheAnswer == null) {
                $log.error('error: "TheAnswer" is null');
                return;
            }
            logAndPost(commands.QUESTION_NEXT, question);
        };

        $scope.skip = function (question) {
            logAndPost(commands.QUESTION_SKIP, question);
        };

        var logAndPost = function (command, question) {
            $scope.promise = $http.post(url, { 'command': command, 'question': question }).then(function (response) {
                $scope.promise = getNext();
            });
        };

        // todo: try to do this at the markup level
        $scope.answer = function (answer) {
            $scope.question.TheAnswer = answer;
        };
    };

    app.controller('WidgetController', WidgetController);
}(app));
