var Widgets;
(function (Widgets) {
    var Emojis;
    (function (Emojis) {
        var EmojisStore = (function () {
            function EmojisStore($http) {
                this.$http = $http;
            }
            EmojisStore.prototype.init = function () {
                var _this = this;
                var requestStream = Rx.Observable.return('https://api.github.com/emojis');
                requestStream.subscribe(function (requestUrl) {
                    _this.emojis = Rx.Observable.create(function (observer) {
                        _this.$http.get(requestUrl).success(function (data, status, headers, config) {
                            observer.onNext(data);
                        }).error(function (data, status, headers, config) {
                            observer.onError(data);
                        });
                    });
                });
            };
            return EmojisStore;
        })();
        Emojis.EmojisStore = EmojisStore;
    })(Emojis = Widgets.Emojis || (Widgets.Emojis = {}));
})(Widgets || (Widgets = {}));
//# sourceMappingURL=emojis-store.js.map