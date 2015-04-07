/// <reference path="../../../../Scripts/typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../client/app/blocks/dispatcher.ts" />
describe('given a dispatcher', function () {
    describe('when registering a callback', function () {
        it('then it should return an id', function () {
            var dispatcher = new Blocks.Dispatcher();
            var id = dispatcher.register(function (payload) {
            });
            expect(id).toBeDefined();
        });
    });
    describe('when registering two callbacks', function () {
        it('then it should return two different ids', function () {
            var dispatcher = new Blocks.Dispatcher();
            var idOne = dispatcher.register(function (payload) {
            });
            var idTwo = dispatcher.register(function (payload) {
            });
            expect(idOne).not.toEqual(idTwo);
        });
    });
});
//# sourceMappingURL=dispatcher.spec.js.map