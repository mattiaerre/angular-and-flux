var Widgets;
(function (Widgets) {
    var Weather;
    (function (Weather) {
        var WeatherController = (function () {
            function WeatherController(dispatcher, weatherStore, $log) {
                this.dispatcher = dispatcher;
                this.weatherStore = weatherStore;
                this.$log = $log;
                this.model = null;
                this.cities = null;
                this.city = null;
                this.init();
            }
            WeatherController.prototype.init = function () {
                var _this = this;
                this.dispatcher.register(function (payload) {
                    if (payload.actionType == 2 /* Event */) {
                        if (payload.body.actionKey == 2 /* WeatherLoaded */) {
                            _this.city = _this.weatherStore.city;
                            _this.cities = _this.weatherStore.cities;
                            _this.model = _this.weatherStore.weather;
                        }
                    }
                });
                this.dispatcher.dispatch(new Blocks.Payload(2 /* Event */, new Blocks.PayloadBody(1 /* WeatherControllerReady */, null)));
            };
            WeatherController.prototype.cityChanged = function () {
                this.dispatcher.dispatch(new Blocks.Payload(1 /* Command */, new Blocks.PayloadBody(3 /* GetWeather */, this.city)));
            };
            return WeatherController;
        })();
        Weather.WeatherController = WeatherController;
    })(Weather = Widgets.Weather || (Widgets.Weather = {}));
})(Widgets || (Widgets = {}));
//# sourceMappingURL=weather-controller.js.map