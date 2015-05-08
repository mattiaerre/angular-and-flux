var PaceCalculator;
(function (PaceCalculator) {
    var PaceCalculatorController = (function () {
        function PaceCalculatorController($log) {
            this.$log = $log;
            this.minutes = null;
            this.seconds = null;
            this.kph = null;
            this.minutes = 4;
            this.seconds = 44;
            this.toKph();
        }
        PaceCalculatorController.prototype.toKph = function () {
            // todo: move into a separate component? maybe try to make a server call?
            var kph = 60 / (this.minutes + (this.seconds / 60));
            this.kph = Math.round(kph * 100) / 100;
            this.$log.info('minutes: [' + this.minutes + '] seconds: [' + this.seconds + '] kph: [' + this.kph + ']');
        };
        return PaceCalculatorController;
    })();
    PaceCalculator.PaceCalculatorController = PaceCalculatorController;
})(PaceCalculator || (PaceCalculator = {}));
//# sourceMappingURL=pace-calculator.controller.js.map