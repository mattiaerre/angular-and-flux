// see: https://github.com/facebook/flux/blob/master/src/Dispatcher.js
var Blocks;
(function (Blocks) {
    var Dispatcher = (function () {
        function Dispatcher() {
            this.lastId = 1;
            this.prefix = 'ID_';
            this.callbacks = [];
            this.isPending = [];
            this.isHandled = [];
            this.pendingPayload = null;
            this.dispatching = false;
        }
        Dispatcher.prototype.register = function (callback) {
            var id = this.prefix + this.lastId++;
            this.callbacks[id] = callback;
            return id;
        };
        Dispatcher.prototype.unregister = function (id) {
            delete this.callbacks[id];
        };
        Dispatcher.prototype.waitFor = function (ids) {
            for (var i = 0; i < ids.length; i++) {
                var id = ids[i];
                if (this.isPending[id])
                    continue;
                this.invokeCallback(id);
            }
        };
        Dispatcher.prototype.dispatch = function (payload) {
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
            return this.dispatching;
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
            this.dispatching = true;
        };
        Dispatcher.prototype.stopDispatching = function () {
            this.pendingPayload = null;
            this.dispatching = false;
        };
        return Dispatcher;
    })();
    Blocks.Dispatcher = Dispatcher;
})(Blocks || (Blocks = {}));
//# sourceMappingURL=dispatcher.js.map