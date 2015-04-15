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
                this.model = null;
                this.init();
            }
            RxWeatherController.prototype.init = function () {
                var _this = this;
                this.rxWeatherStore.cities.subscribe(function (stream) {
                    _this.cities = stream;
                });
                this.rxWeatherStore.city.subscribe(function (stream) {
                    _this.city = stream;
                });
                this.rxWeatherStore.weather.subscribe(function (stream) {
                    _this.model = stream.data;
                });
            };
            RxWeatherController.prototype.cityChanged = function () {
                // todo: this should update this.rxWeatherStore.city
                console.log(this.city);
            };
            return RxWeatherController;
        })();
        RxWeather.RxWeatherController = RxWeatherController;
    })(RxWeather = Widgets.RxWeather || (Widgets.RxWeather = {}));
})(Widgets || (Widgets = {}));
//# sourceMappingURL=rx-weather-controller.js.map