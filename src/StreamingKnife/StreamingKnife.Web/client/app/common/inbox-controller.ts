module Common {
    export class Inbox {
        message: string = '';

        constructor(private dispatcher: Dispatcher) {
            this.init();
        }

        private init(): void {
            this.dispatcher.register((payload : Payload) => {
                if (payload.actionType == 'sending')
                    this.message = payload.data;
            });
        }
    }
} 