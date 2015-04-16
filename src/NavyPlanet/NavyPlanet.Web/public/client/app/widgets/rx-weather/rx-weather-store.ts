module Widgets.RxWeather {
    export interface IRxWeatherStore {
        city: Rx.Subject<any>;
        weather: Rx.Subject<any>;
    }

    export class RxWeatherStore implements IRxWeatherStore {
        city: Rx.Subject<any> = null;
        weather: Rx.Subject<any> = null;

        constructor(private $http: any, private $log: any, private config: any) {
            this.init();
        }

        private init(): void {
            this.city = new Rx.Subject();
            this.city.subscribe(city => {
                var url = this.config.openweathermapEndpoint + city;
                this.$http.get(url)
                    .success((data, status, headers, config) => { this.weather.onNext(data); })
                    .error((data, status, headers, config) => { this.$log.error(data); });
            });
            this.weather = new Rx.Subject();
        }
    }
}