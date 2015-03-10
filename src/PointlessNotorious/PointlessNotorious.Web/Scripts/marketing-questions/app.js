var app = angular.module('marketing-questions', ['cgBusy']);

var config = { apiUrl: '/api/marketingquestions', commands: { QUESTION_NEXT: 'question-next', QUESTION_SKIP: 'question-skip' } };