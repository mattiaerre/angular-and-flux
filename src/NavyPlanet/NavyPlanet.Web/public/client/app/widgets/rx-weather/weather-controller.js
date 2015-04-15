var Widgets;
(function (Widgets) {
    var RxWeather;
    (function (RxWeather) {
        var WeatherController = (function () {
            function WeatherController(weatherStore, $log) {
                this.weatherStore = weatherStore;
                this.$log = $log;
                this.model = null;
                this.cities = null;
                this.city = null;
                this.init();
            }
            WeatherController.prototype.init = function () {
                var _this = this;
                //this.dispatcher.register((payload: Domain.Payload) => this.register(payload));
                //this.dispatcher.dispatch(new Domain.Payload(Domain.ActionType.Event, new Domain.PayloadBody(Domain.ActionKey.WeatherControllerReady, null)));
                this.weatherStore.cities.subscribe(function (stream) {
                    _this.cities = stream.data;
                });
            };
            return WeatherController;
        })();
        RxWeather.WeatherController = WeatherController;
    })(RxWeather = Widgets.RxWeather || (Widgets.RxWeather = {}));
})(Widgets || (Widgets = {}));
//# sourceMappingURL=weather-controller.js.map