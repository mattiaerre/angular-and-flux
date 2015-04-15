module Widgets.RxWeather {
    export class RxWeatherController {
        constructor(private rxWeatherStore: IRxWeatherStore, private $log: any) {
            this.init();
        }

        cities: string[] = [];
        city: string = null;
        weather: any = null;

        private init(): void {
            this.rxWeatherStore.cities.subscribe(stream => {
                this.cities = stream;
            });
            this.rxWeatherStore.weather.subscribe(observable => {
                // WTF!!!
            });
        }

        cityChanged(): void {
            this.rxWeatherStore.city.onNext(this.city);
        }
    }
}