var Widgets;
(function (Widgets) {
    var GeoIp;
    (function (GeoIp) {
        var GeoIpStore = (function () {
            function GeoIpStore(dispatcher, httpService) {
                this.dispatcher = dispatcher;
                this.httpService = httpService;
                this.geoIp = null;
                this.config = null;
            }
            GeoIpStore.prototype.init = function (config) {
                var _this = this;
                this.config = config;
                this.dispatcher.register(function (payload) { return _this.register(payload); });
            };
            GeoIpStore.prototype.register = function (payload) {
                if (payload.actionType == 2 /* Event */) {
                    if (payload.body.actionKey == 4 /* GeoIpControllerReady */) {
                        this.getGeoIp(this.config.geoipEndpoint);
                    }
                }
            };
            GeoIpStore.prototype.getGeoIp = function (url) {
                var _this = this;
                this.httpService.getByUrl(url, function (response) {
                    _this.geoIp = response.data;
                    _this.dispatcher.dispatch(new Domain.Payload(2 /* Event */, new Domain.PayloadBody(5 /* GeoIpLoaded */, null)));
                });
            };
            return GeoIpStore;
        })();
        GeoIp.GeoIpStore = GeoIpStore;
    })(GeoIp = Widgets.GeoIp || (Widgets.GeoIp = {}));
})(Widgets || (Widgets = {}));
//# sourceMappingURL=geo-ip-store.js.map