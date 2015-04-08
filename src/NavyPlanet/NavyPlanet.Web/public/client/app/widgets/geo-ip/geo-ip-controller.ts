module Widgets.GeoIp {
    export class GeoIpController {
        constructor(private dispatcher: Blocks.IDispatcher, private geoIpStore: IGeoIpStore) {
            this.init();
        }

        model: any = null;

        private init(): void {
            this.dispatcher.register((payload: Domain.Payload) => this.register(payload));
            this.dispatcher.dispatch(new Domain.Payload(Domain.ActionType.Event, new Domain.PayloadBody(Domain.ActionKey.GeoIpControllerReady, null)));
        }

        private register(payload: Domain.Payload): void {
            if (payload.actionType == Domain.ActionType.Event) {
                if (payload.body.actionKey == Domain.ActionKey.GeoIpLoaded) {
                    this.model = this.geoIpStore.geoIp;
                }
            }
        }
    }
}