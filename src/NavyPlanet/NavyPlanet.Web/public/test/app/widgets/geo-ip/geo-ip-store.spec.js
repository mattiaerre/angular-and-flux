/// <reference path="../../../../../Scripts/typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../../client/app/blocks/dispatcher.ts" />
/// <reference path="../../../../client/app/domain/domain.ts" />
/// <reference path="../../../../client/app/widgets/geo-ip/geo-ip-store.ts" />
describe('given a geo ip store', function () {
    var dispatcher;
    var store;
    var config = { geoipEndpoint: '/an/enpoint' };
    var response = { data: 'something' };
    var fakeHttpService = { getByUrl: function (url, callback) {
        callback(response);
    } };
    beforeEach(function () {
        dispatcher = new Blocks.Dispatcher();
        store = new Widgets.GeoIp.GeoIpStore(dispatcher, fakeHttpService, {});
    });
    describe('when calling init', function () {
        it('then it should be able to emit the GeoIpLoaded event upon receiving a GeoIpControllerReady event', function () {
            var count = 0;
            dispatcher.register(function (payload) {
                count++;
                expect(payload.actionType).toBe(2 /* Event */);
                if (count == 1) {
                    expect(payload.body.actionKey).toBe(4 /* GeoIpControllerReady */);
                }
                else if (count == 2) {
                    expect(payload.body.actionKey).toBe(5 /* GeoIpLoaded */);
                }
            });
            store.init(config);
            dispatcher.dispatch(new Domain.Payload(2 /* Event */, new Domain.PayloadBody(4 /* GeoIpControllerReady */, null)));
            expect(count).toBe(2); // info: in order to make sure that 'GeoIpLoaded' has been dispatched
        });
    });
});
//# sourceMappingURL=geo-ip-store.spec.js.map