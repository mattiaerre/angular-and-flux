var Widgets;
(function (Widgets) {
    var RxWeather;
    (function (RxWeather) {
        var RxWeatherController = (function () {
            function RxWeatherController(rxWeatherStore, $log, config) {
                this.rxWeatherStore = rxWeatherStore;
                this.$log = $log;
                this.config = config;
                this.cities = null;
                this.city = null;
                this.weather = null;
                this.init();
            }
            RxWeatherController.prototype.init = function () {
                var _this = this;
                this.cities = this.config.cities;
                this.city = this.config.city;
                this.rxWeatherStore.weather.subscribe(function (stream) {
                    _this.weather = stream;
                });
                this.changeCity();
            };
            RxWeatherController.prototype.changeCity = function () {
                this.rxWeatherStore.city.onNext(this.city);
            };
            return RxWeatherController;
        })();
        RxWeather.RxWeatherController = RxWeatherController;
    })(RxWeather = Widgets.RxWeather || (Widgets.RxWeather = {}));
})(Widgets || (Widgets = {}));
//# sourceMappingURL=rx-weather-controller.js.map