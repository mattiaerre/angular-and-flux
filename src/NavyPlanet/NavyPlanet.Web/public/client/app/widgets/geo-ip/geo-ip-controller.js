var Widgets;
(function (Widgets) {
    var GeoIp;
    (function (GeoIp) {
        var GeoIpController = (function () {
            function GeoIpController(dispatcher, geoIpStore) {
                this.dispatcher = dispatcher;
                this.geoIpStore = geoIpStore;
                this.model = null;
                this.init();
            }
            GeoIpController.prototype.init = function () {
                var _this = this;
                this.dispatcher.register(function (payload) { return _this.register(payload); });
                this.dispatcher.dispatch(new Blocks.Payload(2 /* Event */, new Blocks.PayloadBody(4 /* GeoIpControllerReady */, null)));
            };
            GeoIpController.prototype.register = function (payload) {
                if (payload.actionType == 2 /* Event */) {
                    if (payload.body.actionKey == 5 /* GeoIpLoaded */) {
                        this.model = this.geoIpStore.geoIp;
                    }
                }
            };
            return GeoIpController;
        })();
        GeoIp.GeoIpController = GeoIpController;
    })(GeoIp = Widgets.GeoIp || (Widgets.GeoIp = {}));
})(Widgets || (Widgets = {}));
//# sourceMappingURL=geo-ip-controller.js.map