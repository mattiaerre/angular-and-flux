var Widgets;
(function (Widgets) {
    var Emojis;
    (function (Emojis) {
        var EmojisStore = (function () {
            function EmojisStore($http, config) {
                this.$http = $http;
                this.config = config;
                this.init();
            }
            EmojisStore.prototype.init = function () {
                var _this = this;
                var requestStream = Rx.Observable.return(this.config.emojisEndpoint);
                var responseStream = requestStream.flatMap(function (requestUrl) {
                    return Rx.Observable.fromPromise(_this.$http.get(requestUrl));
                });
                this.emojis = responseStream;
            };
            return EmojisStore;
        })();
        Emojis.EmojisStore = EmojisStore;
    })(Emojis = Widgets.Emojis || (Widgets.Emojis = {}));
})(Widgets || (Widgets = {}));
//# sourceMappingURL=emojis-store.js.map