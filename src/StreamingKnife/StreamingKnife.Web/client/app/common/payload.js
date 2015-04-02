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