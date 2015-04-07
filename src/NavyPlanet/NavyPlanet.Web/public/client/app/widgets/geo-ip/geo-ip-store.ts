module Widgets.GeoIp {
    export interface IGeoIpStore {
        init(config: any): void;
        geoIp: any;
    }

    export class GeoIpStore implements IGeoIpStore {
        constructor(private dispatcher: Blocks.IDispatcher, private $http: any, private $log: any) { }

        geoIp: any = null;

        private config: any = null;

        init(config: any): void {
            this.config = config;

            this.dispatcher.register((payload: Blocks.Payload) => {
                if (payload.actionType == Blocks.ActionType.Event) {
                    if (payload.body.actionKey == Blocks.ActionKey.GeoIpControllerReady) {
                        // todo !!!
                        this.getGeoIp('http://www.telize.com/geoip');
                    }
                }
            });
        }

        private getGeoIp(url): void {
            this.$http.get(url).then((response) => {
                this.geoIp = response.data;
                this.dispatcher.dispatch(new Blocks.Payload(Blocks.ActionType.Event, new Blocks.PayloadBody(Blocks.ActionKey.GeoIpLoaded, null)));
            },(reason) => {
                    this.$log.error(reason);
                });
        }
    }
}