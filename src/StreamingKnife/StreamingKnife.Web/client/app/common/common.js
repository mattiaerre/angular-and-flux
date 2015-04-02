///#source 1 1 /client/app/common/dispatcher.js
// see: https://github.com/facebook/flux/blob/master/src/Dispatcher.js
var Common;
(function (Common) {
    var Dispatcher = (function () {
        function Dispatcher() {
            this.lastId = 1;
            this.prefix = 'ID_';
            this.callbacks = [];
            this.isPending = [];
            this.isHandled = [];
            this.pendingPayload = null;
            this._isDispatching = false;
        }
        Dispatcher.prototype.register = function (callback) {
            var id = this.prefix + this.lastId++;
            this.callbacks[id] = callback;
            return id;
        };
        Dispatcher.prototype.unregister = function (id) {
            // todo: invariant
            delete this.callbacks[id];
        };
        Dispatcher.prototype.waitFor = function (ids) {
            for (var i = 0; i < ids.length; i++) {
                var id = ids[i];
                if (this.isPending[id]) {
                    continue;
                }
                // todo: invariant
                this.invokeCallback(id);
            }
        };
        Dispatcher.prototype.dispatch = function (payload) {
            // todo: invariant
            this.startDispatching(payload);
            try {
                for (var id in this.callbacks) {
                    if (this.isPending[id]) {
                        continue;
                    }
                    this.invokeCallback(id);
                }
            }
            finally {
                this.stopDispatching();
            }
        };
        Dispatcher.prototype.isDispatching = function () {
            return this._isDispatching;
        };
        Dispatcher.prototype.invokeCallback = function (id) {
            this.isPending[id] = true;
            this.callbacks[id](this.pendingPayload);
            this.isHandled[id] = true;
        };
        Dispatcher.prototype.startDispatching = function (payload) {
            for (var id in this.callbacks) {
                this.isPending[id] = false;
                this.isHandled[id] = false;
            }
            this.pendingPayload = payload;
            this._isDispatching = true;
        };
        Dispatcher.prototype.stopDispatching = function () {
            this.pendingPayload = null;
            this._isDispatching = false;
        };
        return Dispatcher;
    })();
    Common.Dispatcher = Dispatcher;
})(Common || (Common = {}));
//# sourceMappingURL=dispatcher.js.map
///#source 1 1 /client/app/common/logger.js
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
///#source 1 1 /client/app/common/payload.js
var Common;
(function (Common) {
    var Payload = (function () {
        function Payload(actionType, data) {
            this.actionType = actionType;
            this.data = data;
        }
        return Payload;
    })();
    Common.Payload = Payload;
})(Common || (Common = {}));
//# sourceMappingURL=payload.js.map
///#source 1 1 /client/app/common/text-area-controller.js
var Common;
(function (Common) {
    var TextArea = (function () {
        function TextArea(dispatcher) {
            this.dispatcher = dispatcher;
            this.title = 'Hi man!';
            this.data = null;
        }
        TextArea.prototype.writing = function () {
            this.dispatcher.dispatch(new Common.Payload('writing', this.data));
        };
        return TextArea;
    })();
    Common.TextArea = TextArea;
})(Common || (Common = {}));
//# sourceMappingURL=text-area-controller.js.map
