var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    var Base = (function () {
        function Base() {
        }
        return Base;
    })();
    Common.Base = Base;
    var TextArea = (function (_super) {
        __extends(TextArea, _super);
        function TextArea(dispatcher) {
            _super.call(this);
            this.dispatcher = dispatcher;
            this.title = 'Hi man!';
            this.data = null;
        }
        TextArea.prototype.writing = function () {
            this.dispatcher.dispatch(new Common.Payload('writing', this.data));
        };
        TextArea.prototype.send = function () {
            this.dispatcher.dispatch(new Common.Payload('sending', this.data));
        };
        return TextArea;
    })(Base);
    Common.TextArea = TextArea;
})(Common || (Common = {}));
//# sourceMappingURL=text-area-controller.js.map