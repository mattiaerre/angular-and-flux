var Widgets;
(function (Widgets) {
    var RxWeather;
    (function (RxWeather) {
        var RxWeatherController = (function () {
            function RxWeatherController(rxWeatherStore, $log) {
                this.rxWeatherStore = rxWeatherStore;
                this.$log = $log;
                this.cities = [];
                this.city = null;
                this.weather = null;
                this.init();
            }
            RxWeatherController.prototype.init = function () {
                var _this = this;
                this.rxWeatherStore.cities.subscribe(function (stream) {
                    _this.cities = stream;
                });
                this.rxWeatherStore.weather.subscribe(function (observable) {
                    // WTF!!!
                });
            };
            RxWeatherController.prototype.cityChanged = function () {
                this.rxWeatherStore.city.onNext(this.city);
            };
            return RxWeatherController;
        })();
        RxWeather.RxWeatherController = RxWeatherController;
    })(RxWeather = Widgets.RxWeather || (Widgets.RxWeather = {}));
})(Widgets || (Widgets = {}));
//# sourceMappingURL=rx-weather-controller.js.map