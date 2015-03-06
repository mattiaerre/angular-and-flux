(function () {
    // see: https://github.com/cgross/angular-busy

    var app = angular.module('marketing-questions', ['cgBusy']);

    var MainController = function ($scope, $http, $q, $interval, $log) {
        var commands = { QUESTION_NEXT: 'question-next', QUESTION_SKIP: 'question-skip' };

        $scope.title = 'Marketing Questions';

        var url = '/api/marketingquestions';
        $scope.promise = $http.get(url).then(function (response) {
            $log.info(response.data);

            $scope.questions = response.data;
        });

        $scope.next = function (questionId) {
            $log.info('command: ' + commands.QUESTION_NEXT + ', questionId: ' + questionId);
        };

        $scope.skip = function (questionId) {
            $log.info('command: ' + commands.QUESTION_SKIP + ', questionId: ' + questionId);

            $http.post(url, { 'questionId': questionId });
        };
    };

    app.controller('MainController', MainController);
}());
