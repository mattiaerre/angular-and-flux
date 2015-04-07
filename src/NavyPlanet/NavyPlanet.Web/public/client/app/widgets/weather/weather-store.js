var Widgets;
(function (Widgets) {
    var Weather;
    (function (Weather) {
        var WeatherStore = (function () {
            function WeatherStore(dispatcher, $http, $log) {
                this.dispatcher = dispatcher;
                this.$http = $http;
                this.$log = $log;
                this.cities = null;
                this.city = null;
                this.weather = null;
                this.config = null;
            }
            WeatherStore.prototype.init = function (config) {
                var _this = this;
                this.config = config;
                this.cities = this.config.cities;
                this.city = this.config.city;
                this.dispatcher.register(function (payload) {
                    if (payload.actionType == Blocks.ActionType.Event) {
                        if (payload.body.actionKey == Blocks.ActionKey.WeatherControllerReady) {
                            _this.getWeather(_this.config.openweathermapEndpoint + _this.city);
                        }
                    }
                    if (payload.actionType == Blocks.ActionType.Command) {
                        if (payload.body.actionKey == Blocks.ActionKey.GetWeather) {
                            _this.city = payload.body.value;
                            _this.getWeather(_this.config.openweathermapEndpoint + _this.city);
                        }
                    }
                });
            };
            WeatherStore.prototype.getWeather = function (url) {
                var _this = this;
                this.$http.get(url).then(function (response) {
                    _this.weather = response.data;
                    _this.dispatcher.dispatch(new Blocks.Payload(Blocks.ActionType.Event, new Blocks.PayloadBody(Blocks.ActionKey.WeatherLoaded, null)));
                }, function (reason) {
                    _this.$log.error(reason);
                });
            };
            return WeatherStore;
        })();
        Weather.WeatherStore = WeatherStore;
    })(Weather = Widgets.Weather || (Widgets.Weather = {}));
})(Widgets || (Widgets = {}));
//# sourceMappingURL=weather-store.js.map