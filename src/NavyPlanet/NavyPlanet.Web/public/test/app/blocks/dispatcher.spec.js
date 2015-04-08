/// <reference path="../../../../Scripts/typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../client/app/blocks/dispatcher.ts" />
describe('given a dispatcher', function () {
    var dispatcher;
    var something = { something: 'something' };
    beforeEach(function () {
        dispatcher = new Blocks.Dispatcher();
    });
    describe('when registering a callback', function () {
        it('then it should return an id', function () {
            var id = dispatcher.register(function (payload) {
            });
            expect(id).toBeDefined();
        });
    });
    describe('when registering two callbacks', function () {
        it('then it should return two different ids', function () {
            var idOne = dispatcher.register(function (payload) {
            });
            var idTwo = dispatcher.register(function (payload) {
            });
            expect(idOne).not.toEqual(idTwo);
        });
    });
    describe('when registering a callback', function () {
        it('then it should be able to unregister it', function () {
            var id = dispatcher.register(function (payload) {
                expect(true).toBe(false);
            });
            dispatcher.unregister(id);
            dispatcher.dispatch(something);
            expect(true).toBe(true);
        });
    });
    describe('when registering 3 callbacks', function () {
        it('then it should be able wait for the 1st one before executing the 3rd one before executing the 2nd one', function () {
            var firstCallbackHasBeenCalled = false;
            var secondCallbackHasBeenCalled = false;
            var thirdCallbackHasBeenCalled = false;
            var idOne = dispatcher.register(function (payload) {
                firstCallbackHasBeenCalled = true;
            });
            var idTwo = dispatcher.register(function (payload) {
                dispatcher.waitFor([idThree]);
                secondCallbackHasBeenCalled = true;
                expect(thirdCallbackHasBeenCalled).toBe(true);
            });
            var idThree = dispatcher.register(function (payload) {
                dispatcher.waitFor([idOne]);
                thirdCallbackHasBeenCalled = true;
                expect(firstCallbackHasBeenCalled).toBe(true);
            });
            dispatcher.dispatch(something);
        });
    });
    describe('when registering a callback', function () {
        it('then it should be able to dispatch something', function () {
            var id = dispatcher.register(function (payload) {
                expect(payload.something).toBe('something');
            });
            dispatcher.dispatch(something);
        });
    });
    describe('when dispatching something', function () {
        it('then it should be able to tell whether it is dispatching or not', function () {
            var id = dispatcher.register(function (payload) {
                expect(dispatcher.isDispatching()).toBe(true);
            });
            dispatcher.dispatch(something);
            expect(dispatcher.isDispatching()).toBe(false);
        });
    });
});
//# sourceMappingURL=dispatcher.spec.js.map