module Widgets.RxWeather {
    export class RxWeatherController {
        constructor(private rxWeatherStore: IRxWeatherStore, private $log: any, private config: any) {
            this.init();
        }

        cities: string[] = [];
        city: string = null;
        weather: any = null;

        private init(): void {
            this.cities = this.config.cities;
            this.city = this.config.city;
            this.rxWeatherStore.weather.subscribe(stream => {
                this.weather = stream;
            });
            this.rxWeatherStore.city.onNext(this.config.city);
        }

        cityChanged(): void {
            this.rxWeatherStore.city.onNext(this.city);
        }
    }
}