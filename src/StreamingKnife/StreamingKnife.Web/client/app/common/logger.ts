module Common {
    export class Logger {
        constructor(private $log: any, private dispatcher: Dispatcher) {
        }

        init(): void {
            var id = this.dispatcher.register(payload => {
                this.$log.info('payload: ' + JSON.stringify(payload));
            });

            this.$log.info('id: ' + id);
        }
    }
}