/// <reference path="../../app/math-engine.js" />
QUnit.module('given a math engine');

QUnit.test('it should be able to sum 2 and 2', function (assert) {
    var engine = new MathEngine();
    var result = engine.sum(2, 2);
    assert.equal(result, 4);
});