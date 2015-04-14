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
                this.dispatcher.register(function (payload) { return _this.register(payload); });
                this.dispatcher.dispatch(new Domain.Payload(Domain.ActionType.Event, new Domain.PayloadBody(Domain.ActionKey.WeatherControllerReady, null)));
            };
            WeatherController.prototype.register = function (payload) {
                if (payload.actionType == Domain.ActionType.Event) {
                    if (payload.body.actionKey == Domain.ActionKey.WeatherLoaded) {
                        this.city = this.weatherStore.city;
                        this.cities = this.weatherStore.cities;
                        this.model = this.weatherStore.weather;
                    }
                }
            };
            WeatherController.prototype.cityChanged = function () {
                this.dispatcher.dispatch(new Domain.Payload(Domain.ActionType.Command, new Domain.PayloadBody(Domain.ActionKey.GetWeather, this.city)));
            };
            return WeatherController;
        })();
        Weather.WeatherController = WeatherController;
    })(Weather = Widgets.Weather || (Widgets.Weather = {}));
})(Widgets || (Widgets = {}));
//# sourceMappingURL=weather-controller.js.map