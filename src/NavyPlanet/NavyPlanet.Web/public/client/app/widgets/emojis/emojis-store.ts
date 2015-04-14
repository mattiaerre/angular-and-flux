module Widgets.Emojis {
    export interface IEmojisStore {
        emojis: Rx.Observable<any>;
        init():void;
    }

    export class EmojisStore implements IEmojisStore {
        emojis: Rx.Observable<any>;

        constructor(private $http: any) {
        }

        init(): void {
            var requestStream = Rx.Observable.return('https://api.github.com/emojis');
            requestStream.subscribe(requestUrl => {
                this.emojis = Rx.Observable.create(observer => {
                    this.$http.get(requestUrl)
                        .success((data, status, headers, config) => { observer.onNext(data); })
                        .error((data, status, headers, config) => { observer.onError(data); });
                });
            });
        }
    }
}