module PaceCalculator {
    export class PaceCalculatorController {
        minutes: number = null;
        seconds: number = null;
        kph: number = null;

        constructor(private $log: any) {
            this.minutes = 4;
            this.seconds = 44;
            this.toKph();
        }

        toKph(): void {
            // todo: move into a separate component? maybe try to make a server call?
            var kph = 60 / (this.minutes + (this.seconds / 60));
            this.kph = Math.round(kph * 100) / 100;

            this.$log.info('minutes: [' + this.minutes + '] seconds: [' + this.seconds + '] kph: [' + this.kph + ']');
        }
    }
}