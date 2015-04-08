module Widgets.GeoIp {
    export interface IGeoIpStore {
        init(config: any): void;
        geoIp: any;
    }

    export class GeoIpStore implements IGeoIpStore {
        constructor(private dispatcher: Blocks.IDispatcher, private httpService: Blocks.IHttpService) { }

        geoIp: any = null;

        private config: any = null;

        init(config: any): void {
            this.config = config;
            this.dispatcher.register((payload: Blocks.Payload) => this.register(payload));
        }

        private register(payload: Blocks.Payload): void {
            if (payload.actionType == Blocks.ActionType.Event) {
                if (payload.body.actionKey == Blocks.ActionKey.GeoIpControllerReady) {
                    this.getGeoIp(this.config.geoipEndpoint);
                }
            }
        }

        private getGeoIp(url): void {
            this.httpService.getByUrl(url,(response) => {
                this.geoIp = response.data;
                this.dispatcher.dispatch(new Blocks.Payload(Blocks.ActionType.Event, new Blocks.PayloadBody(Blocks.ActionKey.GeoIpLoaded, null)));
            });
        }
    }
}