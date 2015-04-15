module Widgets.Emojis {
    export class EmojisController {
        emojis: any;

        constructor(private emojisStore: IEmojisStore) {
            this.init();
        }

        private init(): void {
            this.emojisStore.emojis.subscribe(stream => {
                this.emojis = stream.data;
            });
        }
    }
}