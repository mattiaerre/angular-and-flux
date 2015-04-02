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