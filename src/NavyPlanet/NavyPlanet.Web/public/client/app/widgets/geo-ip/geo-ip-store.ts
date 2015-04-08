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
            this.dispatcher.register((payload: Domain.Payload) => this.register(payload));
        }

        private register(payload: Domain.Payload): void {
            if (payload.actionType == Domain.ActionType.Event) {
                if (payload.body.actionKey == Domain.ActionKey.GeoIpControllerReady) {
                    this.getGeoIp(this.config.geoipEndpoint);
                }
            }
        }

        private getGeoIp(url): void {
            this.httpService.getByUrl(url,(response) => {
                this.geoIp = response.data;
                this.dispatcher.dispatch(new Domain.Payload(Domain.ActionType.Event, new Domain.PayloadBody(Domain.ActionKey.GeoIpLoaded, null)));
            });
        }
    }
}