/// <reference path="../../../../Scripts/typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../client/app/blocks/dispatcher.ts" />

describe('given a dispatcher',() => {
    var dispatcher;
    var something = { something: 'something' };

    beforeEach(() => {
        dispatcher = new Blocks.Dispatcher();
    });

    describe('when registering a callback',() => {
        it('then it should return an id',() => {

            var id = dispatcher.register(payload => { });

            expect(id).toBeDefined();
        });
    });

    describe('when registering two callbacks',() => {
        it('then it should return two different ids',() => {
            var idOne = dispatcher.register(payload => { });
            var idTwo = dispatcher.register(payload => { });

            expect(idOne).not.toEqual(idTwo);
        });
    });

    describe('when registering a callback',() => {
        it('then it should be able to unregister it',() => {
            var id = dispatcher.register(payload => {
                expect(true).toBe(false);
            });

            dispatcher.unregister(id);

            dispatcher.dispatch(something);

            expect(true).toBe(true);
        });
    });

    describe('when registering 3 callbacks',() => {
        it('then it should be able wait for the 1st one before executing the 3rd one before executing the 2nd one',() => {
            var firstCallbackHasBeenCalled = false;
            var secondCallbackHasBeenCalled = false;
            var thirdCallbackHasBeenCalled = false;

            var idOne = dispatcher.register(payload => {
                firstCallbackHasBeenCalled = true;
            });
            var idTwo = dispatcher.register(payload => {
                dispatcher.waitFor([idThree]);
                secondCallbackHasBeenCalled = true;
                expect(thirdCallbackHasBeenCalled).toBe(true);
            });
            var idThree = dispatcher.register(payload => {
                dispatcher.waitFor([idOne]);
                thirdCallbackHasBeenCalled = true;
                expect(firstCallbackHasBeenCalled).toBe(true);
            });
            dispatcher.dispatch(something);
        });
    });

    describe('when registering a callback',() => {
        it('then it should be able to dispatch something',() => {
            var id = dispatcher.register(payload => {
                expect(payload.something).toBe('something');
            });
            dispatcher.dispatch(something);
        });
    });

    describe('when dispatching something',() => {
        it('then it should be able to tell whether it is dispatching or not',() => {
            var id = dispatcher.register(payload => {
                expect(dispatcher.isDispatching()).toBe(true);
            });

            dispatcher.dispatch(something);

            expect(dispatcher.isDispatching()).toBe(false);
        });
    });
});