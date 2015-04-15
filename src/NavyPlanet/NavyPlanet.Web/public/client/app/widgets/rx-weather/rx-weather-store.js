var Widgets;
(function (Widgets) {
    var RxWeather;
    (function (RxWeather) {
        var RxWeatherStore = (function () {
            function RxWeatherStore($http, config) {
                this.$http = $http;
                this.config = config;
                this.init();
            }
            RxWeatherStore.prototype.init = function () {
                var _this = this;
                this.cities = Rx.Observable.return(this.config.cities);
                this.city = new Rx.Subject();
                this.city.subscribe(function (city) {
                    // do ajax call and update this.weather
                    var request = Rx.Observable.return(_this.config.openweathermapEndpoint + city);
                    var response = request.flatMap(function (requestUrl) {
                        return Rx.Observable.fromPromise(_this.$http.get(requestUrl));
                    });
                    _this.weather.onNext(response);
                });
                this.weather = new Rx.Subject();
                this.city.onNext(this.config.city);
            };
            return RxWeatherStore;
        })();
        RxWeather.RxWeatherStore = RxWeatherStore;
    })(RxWeather = Widgets.RxWeather || (Widgets.RxWeather = {}));
})(Widgets || (Widgets = {}));
//# sourceMappingURL=rx-weather-store.js.map