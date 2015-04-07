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
                this.dispatcher.register(function (payload) {
                    if (payload.actionType == Blocks.ActionType.Event) {
                        if (payload.body.actionKey == Blocks.ActionKey.GeoIpLoaded) {
                            _this.model = _this.geoIpStore.geoIp;
                        }
                    }
                });
                this.dispatcher.dispatch(new Blocks.Payload(Blocks.ActionType.Event, new Blocks.PayloadBody(Blocks.ActionKey.GeoIpControllerReady, null)));
            };
            return GeoIpController;
        })();
        GeoIp.GeoIpController = GeoIpController;
    })(GeoIp = Widgets.GeoIp || (Widgets.GeoIp = {}));
})(Widgets || (Widgets = {}));
//# sourceMappingURL=geo-ip-controller.js.map