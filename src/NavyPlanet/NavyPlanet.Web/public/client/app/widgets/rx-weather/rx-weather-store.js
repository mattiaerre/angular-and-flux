var Widgets;
(function (Widgets) {
    var RxWeather;
    (function (RxWeather) {
        var RxWeatherStore = (function () {
            function RxWeatherStore($http, $log, config) {
                this.$http = $http;
                this.$log = $log;
                this.config = config;
                this.city = null;
                this.weather = null;
                this.init();
            }
            RxWeatherStore.prototype.init = function () {
                var _this = this;
                this.city = new Rx.Subject();
                this.city.subscribe(function (city) {
                    var url = _this.config.openweathermapEndpoint + city;
                    _this.$http.get(url).success(function (data, status, headers, config) {
                        _this.weather.onNext(data);
                    }).error(function (data, status, headers, config) {
                        _this.$log.error(data);
                    });
                });
                this.weather = new Rx.Subject();
            };
            return RxWeatherStore;
        })();
        RxWeather.RxWeatherStore = RxWeatherStore;
    })(RxWeather = Widgets.RxWeather || (Widgets.RxWeather = {}));
})(Widgets || (Widgets = {}));
//# sourceMappingURL=rx-weather-store.js.map