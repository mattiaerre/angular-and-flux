var Widgets;
(function (Widgets) {
    var Emojis;
    (function (Emojis) {
        var EmojisController = (function () {
            function EmojisController(emojisStore) {
                this.emojisStore = emojisStore;
                this.init();
            }
            EmojisController.prototype.init = function () {
                var _this = this;
                this.emojisStore.emojis.subscribe(function (data) {
                    _this.emojis = data;
                });
            };
            return EmojisController;
        })();
        Emojis.EmojisController = EmojisController;
    })(Emojis = Widgets.Emojis || (Widgets.Emojis = {}));
})(Widgets || (Widgets = {}));
//# sourceMappingURL=emojis-controller.js.map