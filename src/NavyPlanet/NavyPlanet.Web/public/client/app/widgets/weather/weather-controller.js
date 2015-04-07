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
                    if (payload.actionType == Blocks.ActionType.Event) {
                        if (payload.body.actionKey == Blocks.ActionKey.WeatherLoaded) {
                            _this.city = _this.weatherStore.city;
                            _this.cities = _this.weatherStore.cities;
                            _this.model = _this.weatherStore.weather;
                        }
                    }
                });
                this.dispatcher.dispatch(new Blocks.Payload(Blocks.ActionType.Event, new Blocks.PayloadBody(Blocks.ActionKey.WeatherControllerReady, null)));
            };
            WeatherController.prototype.cityChanged = function () {
                this.dispatcher.dispatch(new Blocks.Payload(Blocks.ActionType.Command, new Blocks.PayloadBody(Blocks.ActionKey.GetWeather, this.city)));
            };
            return WeatherController;
        })();
        Weather.WeatherController = WeatherController;
    })(Weather = Widgets.Weather || (Widgets.Weather = {}));
})(Widgets || (Widgets = {}));
//# sourceMappingURL=weather-controller.js.map