module Widgets.GeoIp {
    export class GeoIpController {
        constructor(private dispatcher: Blocks.IDispatcher, private geoIpStore: IGeoIpStore) {
            this.init();
        }

        model: any = null;

        private init(): void {
            this.dispatcher.register((payload: Blocks.Payload) => this.register(payload));
            this.dispatcher.dispatch(new Blocks.Payload(Blocks.ActionType.Event, new Blocks.PayloadBody(Blocks.ActionKey.GeoIpControllerReady, null)));
        }

        private register(payload: Blocks.Payload): void {
            if (payload.actionType == Blocks.ActionType.Event) {
                if (payload.body.actionKey == Blocks.ActionKey.GeoIpLoaded) {
                    this.model = this.geoIpStore.geoIp;
                }
            }
        }
    }
}