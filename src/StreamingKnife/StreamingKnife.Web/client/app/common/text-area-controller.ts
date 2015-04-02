module Common {
    export class Base {
        constructor() {
        }
    }

    export class TextArea extends Base {
        title: string = 'Hi man!';
        data: any = null;

        constructor(private dispatcher: Dispatcher) {
            super();
        }

        writing(): void {
            this.dispatcher.dispatch(new Common.Payload('writing', this.data));
        }

        send(): void {
            this.dispatcher.dispatch(new Common.Payload('sending', this.data));
        }
    }
} 