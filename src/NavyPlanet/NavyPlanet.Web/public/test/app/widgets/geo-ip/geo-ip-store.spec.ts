/// <reference path="../../../../../Scripts/typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../../client/app/blocks/dispatcher.ts" />
/// <reference path="../../../../client/app/domain/domain.ts" />
/// <reference path="../../../../client/app/widgets/geo-ip/geo-ip-store.ts" />

describe('given a geo ip store',() => {
    var dispatcher;
    var store;
    var config = { geoipEndpoint: '/an/enpoint' };
    var response = { data:'something' };
    var fakeHttpService : Blocks.IHttpService = { getByUrl : (url, callback) => { callback(response); } };

    beforeEach(() => {
        dispatcher = new Blocks.Dispatcher();
        store = new Widgets.GeoIp.GeoIpStore(dispatcher, fakeHttpService);
    });

    describe('when calling init',() => {
        it('then it should be able to emit the GeoIpLoaded event upon receiving a GeoIpControllerReady event',() => {
            var count = 0;
            dispatcher.register((payload: Domain.Payload) => {
                count++;
                expect(payload.actionType).toBe(Domain.ActionType.Event);
                if (count == 1) {
                    expect(payload.body.actionKey).toBe(Domain.ActionKey.GeoIpControllerReady);
                } else if (count == 2) {
                    expect(payload.body.actionKey).toBe(Domain.ActionKey.GeoIpLoaded);
                }
            });

            store.init(config);

            dispatcher.dispatch(new Domain.Payload(Domain.ActionType.Event, new Domain.PayloadBody(Domain.ActionKey.GeoIpControllerReady, null)));

            expect(count).toBe(2); // info: in order to make sure that 'GeoIpLoaded' has been dispatched
        });
    });
});