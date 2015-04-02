var Common;
(function (Common) {
    var Logger = (function () {
        function Logger($log, dispatcher) {
            this.$log = $log;
            this.dispatcher = dispatcher;
        }
        Logger.prototype.init = function () {
            var _this = this;
            var id = this.dispatcher.register(function (payload) {
                _this.$log.info('payload: ' + JSON.stringify(payload));
            });
            this.$log.info('id: ' + id);
        };
        return Logger;
    })();
    Common.Logger = Logger;
})(Common || (Common = {}));
//# sourceMappingURL=logger.js.map