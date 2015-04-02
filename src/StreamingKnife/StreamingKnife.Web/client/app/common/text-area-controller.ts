module Common {
    export class TextArea {
        title: string = 'Hi man!';
        data: any = null;

        constructor(private dispatcher: Dispatcher) {
        }

        writing(): void {
            this.dispatcher.dispatch(new Common.Payload('writing', this.data));
        }
    }
} 