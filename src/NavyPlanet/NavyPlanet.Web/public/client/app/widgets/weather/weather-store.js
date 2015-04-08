var Widgets;
(function (Widgets) {
    var Weather;
    (function (Weather) {
        var WeatherStore = (function () {
            function WeatherStore(dispatcher, httpService) {
                this.dispatcher = dispatcher;
                this.httpService = httpService;
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
                this.dispatcher.register(function (payload) { return _this.register(payload); });
            };
            WeatherStore.prototype.register = function (payload) {
                this.registerEvents(payload);
                this.registerCommands(payload);
            };
            WeatherStore.prototype.registerEvents = function (payload) {
                if (payload.actionType == 2 /* Event */) {
                    if (payload.body.actionKey == 1 /* WeatherControllerReady */) {
                        this.getWeather(this.config.openweathermapEndpoint + this.city);
                    }
                }
            };
            WeatherStore.prototype.registerCommands = function (payload) {
                if (payload.actionType == 1 /* Command */) {
                    if (payload.body.actionKey == 3 /* GetWeather */) {
                        this.city = payload.body.value;
                        this.getWeather(this.config.openweathermapEndpoint + this.city);
                    }
                }
            };
            WeatherStore.prototype.getWeather = function (url) {
                var _this = this;
                this.httpService.getByUrl(url, function (response) {
                    _this.weather = response.data;
                    _this.dispatcher.dispatch(new Domain.Payload(2 /* Event */, new Domain.PayloadBody(2 /* WeatherLoaded */, null)));
                });
            };
            return WeatherStore;
        })();
        Weather.WeatherStore = WeatherStore;
    })(Weather = Widgets.Weather || (Widgets.Weather = {}));
})(Widgets || (Widgets = {}));
//# sourceMappingURL=weather-store.js.map