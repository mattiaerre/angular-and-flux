var Widgets;
(function (Widgets) {
    (function (Weather) {
        var WeatherController = (function () {
            function WeatherController(dispatcher, weatherStore, $log) {
                this.dispatcher = dispatcher;
                this.weatherStore = weatherStore;
                this.$log = $log;
                this.data = null;
                this.cities = ['London,uk', 'New York,us', 'Turin,it'];
                this.city = this.cities[0];
                this.init();
            }
            WeatherController.prototype.init = function () {
                var _this = this;
                this.dispatcher.register(function (payload) {
                    if (payload.actionType == 2 /* Event */)
                        if (payload.body.actionKey == 2 /* WeatherLoaded */) {
                            _this.$log.info(_this.weatherStore.weather);
                            _this.data = _this.weatherStore.weather.data;
                        }
                });
            };

            WeatherController.prototype.cityChanged = function () {
                this.dispatcher.dispatch(new Blocks.Payload(1 /* Command */, new Blocks.PayloadBody(1 /* GetWeather */, this.city)));
            };
            return WeatherController;
        })();
        Weather.WeatherController = WeatherController;
    })(Widgets.Weather || (Widgets.Weather = {}));
    var Weather = Widgets.Weather;
})(Widgets || (Widgets = {}));
//# sourceMappingURL=weather-controller.js.map
