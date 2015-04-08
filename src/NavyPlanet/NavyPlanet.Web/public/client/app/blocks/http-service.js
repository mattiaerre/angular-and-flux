var Blocks;
(function (Blocks) {
    var HttpService = (function () {
        function HttpService($http, $log) {
            this.$http = $http;
            this.$log = $log;
        }
        HttpService.prototype.getByUrl = function (url, callback) {
            var _this = this;
            this.$http.get(url).then(callback, function (reason) {
                _this.$log.error(reason);
            });
        };
        return HttpService;
    })();
    Blocks.HttpService = HttpService;
})(Blocks || (Blocks = {}));
//# sourceMappingURL=http-service.js.map