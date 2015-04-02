var Common;
(function (Common) {
    var Inbox = (function () {
        function Inbox(dispatcher) {
            this.dispatcher = dispatcher;
            this.message = '';
            this.init();
        }
        Inbox.prototype.init = function () {
            var _this = this;
            this.dispatcher.register(function (payload) {
                if (payload.actionType == 'sending')
                    _this.message = payload.data;
            });
        };
        return Inbox;
    })();
    Common.Inbox = Inbox;
})(Common || (Common = {}));
//# sourceMappingURL=inbox-controller.js.map