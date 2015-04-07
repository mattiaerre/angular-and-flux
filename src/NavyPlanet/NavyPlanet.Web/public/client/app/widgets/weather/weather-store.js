var Widgets;
(function (Widgets) {
    var Weather;
    (function (Weather) {
        var WeatherStore = (function () {
            function WeatherStore(dispatcher, $http, $log) {
                this.dispatcher = dispatcher;
                this.$http = $http;
                this.$log = $log;
                this.weather = null;
            }
            WeatherStore.prototype.init = function (callback) {
                var _this = this;
                this.dispatcher.register(function (payload) {
                    if (payload.actionType == 1 /* Command */) {
                        if (payload.body.actionKey == 1 /* GetWeather */) {
                            // todo: get base path from config
                            _this.$http.get('http://api.openweathermap.org/data/2.5/weather?q=' + payload.body.value).then(function (response) {
                                //this.$log.info('response: ' + JSON.stringify(response));
                                _this.weather = response;
                                _this.dispatcher.dispatch(new Blocks.Payload(2 /* Event */, new Blocks.PayloadBody(2 /* WeatherLoaded */, null)));
                            }, function (reason) {
                                _this.$log.error(reason);
                            });
                        }
                    }
                });
                callback();
            };
            return WeatherStore;
        })();
        Weather.WeatherStore = WeatherStore;
    })(Weather = Widgets.Weather || (Widgets.Weather = {}));
})(Widgets || (Widgets = {}));
//# sourceMappingURL=weather-store.js.map