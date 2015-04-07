var Widgets;
(function (Widgets) {
    var GeoIp;
    (function (GeoIp) {
        var GeoIpStore = (function () {
            function GeoIpStore(dispatcher, $http, $log) {
                this.dispatcher = dispatcher;
                this.$http = $http;
                this.$log = $log;
                this.geoIp = null;
                this.config = null;
            }
            GeoIpStore.prototype.init = function (config) {
                var _this = this;
                this.config = config;
                this.dispatcher.register(function (payload) {
                    if (payload.actionType == Blocks.ActionType.Event) {
                        if (payload.body.actionKey == Blocks.ActionKey.GeoIpControllerReady) {
                            // todo !!!
                            _this.getGeoIp('http://www.telize.com/geoip');
                        }
                    }
                });
            };
            GeoIpStore.prototype.getGeoIp = function (url) {
                var _this = this;
                this.$http.get(url).then(function (response) {
                    _this.geoIp = response.data;
                    _this.dispatcher.dispatch(new Blocks.Payload(Blocks.ActionType.Event, new Blocks.PayloadBody(Blocks.ActionKey.GeoIpLoaded, null)));
                }, function (reason) {
                    _this.$log.error(reason);
                });
            };
            return GeoIpStore;
        })();
        GeoIp.GeoIpStore = GeoIpStore;
    })(GeoIp = Widgets.GeoIp || (Widgets.GeoIp = {}));
})(Widgets || (Widgets = {}));
//# sourceMappingURL=geo-ip-store.js.map