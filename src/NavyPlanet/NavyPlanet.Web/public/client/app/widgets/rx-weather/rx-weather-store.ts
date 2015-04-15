module Widgets.RxWeather {
    export interface IRxWeatherStore {
        cities: Rx.Observable<any>;
        city: Rx.Subject<any>;
        weather: Rx.Subject<any>;
    }

    export class RxWeatherStore implements IRxWeatherStore {
        cities: Rx.Observable<any>;
        city: Rx.Subject<any>;
        weather: Rx.Subject<any>;

        constructor(private $http: any, private config: any) {
            this.init();
        }

        private init() {
            this.cities = Rx.Observable.return(this.config.cities);

            this.city = new Rx.Subject();
            this.city.subscribe(city => {
                // do ajax call and update this.weather
                var request = Rx.Observable.return(this.config.openweathermapEndpoint + city);
                var response = request.flatMap(requestUrl => {
                    return Rx.Observable.fromPromise(this.$http.get(requestUrl));
                });
                this.weather.onNext(response);
            });

            this.weather = new Rx.Subject();
            this.city.onNext(this.config.city);
        }
    }
}