module Widgets.Emojis {
    export interface IEmojisStore {
        emojis: Rx.Observable<any>;
    }

    export class EmojisStore implements IEmojisStore {
        emojis: Rx.Observable<any>;

        constructor(private $http: any, private config: any) {
            this.init();
        }

        private init(): void {
            var requestStream = Rx.Observable.return(this.config.emojisEndpoint);

            var responseStream = requestStream.flatMap(requestUrl => {
                return Rx.Observable.fromPromise(this.$http.get(requestUrl));
            });

            this.emojis = responseStream;
        }
    }
}