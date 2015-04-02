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