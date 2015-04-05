/// <reference path="../../../../Scripts/typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../client/app/blocks/dispatcher.ts" />

describe('given a dispatcher', () => {
    describe('when registering a callback', () => {
        it('then it should return an id', () => {
            var dispatcher = new Blocks.Dispatcher();
            var id = dispatcher.register(payload => { });

            expect(id).toBeDefined();
        });
    });

    describe('when registering two callbacks', () => {
        it('then it should return two different ids', () => {
            var dispatcher = new Blocks.Dispatcher();
            var idOne = dispatcher.register(payload => { });
            var idTwo = dispatcher.register(payload => { });

            expect(idOne).not.toEqual(idTwo);
        });
    });
});

