module Widgets.RxWeather {
    export interface IRxWeatherStore {
        cities: Rx.Observable<any>;
        city: Rx.Observable<any>;
        weather: Rx.Observable<any>;
    }

    export class RxWeatherStore implements IRxWeatherStore {
        cities: Rx.Observable<any>;
        city: Rx.Observable<any>;
        weather: Rx.Observable<any>;

        constructor(private $http: any, private config: any) {
            this.init();
        }

        private init() {
            this.cities = Rx.Observable.return(this.config.cities);

            this.city = Rx.Observable.return(this.config.city);

            var requestStream = Rx.Observable.return(this.config.openweathermapEndpoint + this.config.city); // todo: this should be based on this.city
            var responseStream = requestStream.flatMap(requestUrl => {
                return Rx.Observable.fromPromise(this.$http.get(requestUrl));
            });
            this.weather = responseStream;
        }
    }
}