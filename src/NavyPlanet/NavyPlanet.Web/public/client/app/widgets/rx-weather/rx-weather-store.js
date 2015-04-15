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
                this.city = Rx.Observable.return(this.config.city);
                var requestStream = Rx.Observable.return(this.config.openweathermapEndpoint + this.config.city); // todo: this should be based on this.city
                var responseStream = requestStream.flatMap(function (requestUrl) {
                    return Rx.Observable.fromPromise(_this.$http.get(requestUrl));
                });
                this.weather = responseStream;
            };
            return RxWeatherStore;
        })();
        RxWeather.RxWeatherStore = RxWeatherStore;
    })(RxWeather = Widgets.RxWeather || (Widgets.RxWeather = {}));
})(Widgets || (Widgets = {}));
//# sourceMappingURL=rx-weather-store.js.map