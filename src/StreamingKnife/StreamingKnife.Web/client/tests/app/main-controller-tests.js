/// <reference path="../../app/main-controller.js" />
QUnit.module('given a main controller');

QUnit.test('it should have a title', function (assert) {
    var controller = new MainController();
    assert.equal(controller.title, 'HELLO!');
});