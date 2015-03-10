(function (app) {
    // see: https://github.com/cgross/angular-busy
    //var app = angular.module('marketing-questions', ['cgBusy']);

    var MainController = function ($scope, $http, $q, $interval, $log) {
        var url = config.apiUrl; // todo: inject this ???
        var commands = config.commands; // todo: inject this ???

        $scope.title = 'Marketing Questions';

        $scope.promise = $http.get(url).then(function (response) {
            $log.info(response.data);

            $scope.questions = response.data;
        });

        $scope.next = function (question) {
            $log.info('command: ' + commands.QUESTION_NEXT + ', questionId: ' + question.Id);

            $http.post(url, { 'command': commands.QUESTION_SKIP, 'questionId': question.Id, 'theAnswer': question.TheAnswer });
        };

        $scope.skip = function (question) {
            $log.info('command: ' + commands.QUESTION_SKIP + ', questionId: ' + question.Id);

            $http.post(url, { 'command': commands.QUESTION_SKIP, 'questionId': question.Id });
        };
    };

    app.controller('MainController', MainController);
}(app));
