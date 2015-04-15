var Widgets;
(function (Widgets) {
    var RxWeather;
    (function (RxWeather) {
        var WeatherStore = (function () {
            function WeatherStore(config) {
                this.config = config;
                this.init();
            }
            WeatherStore.prototype.init = function () {
                this.cities = Rx.Observable.fromArray(this.config.cities);
                //this.city = this.config.city;
                //this.dispatcher.register((payload: Domain.Payload) => this.register(payload));
            };
            return WeatherStore;
        })();
        RxWeather.WeatherStore = WeatherStore;
    })(RxWeather = Widgets.RxWeather || (Widgets.RxWeather = {}));
})(Widgets || (Widgets = {}));
//# sourceMappingURL=weather-store.js.map