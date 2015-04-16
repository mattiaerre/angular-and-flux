module Widgets.RxWeather {
    export class RxWeatherController {
        cities: string[] = null;
        city: string = null;
        weather: any = null;

        constructor(private rxWeatherStore: IRxWeatherStore, private $log: any, private config: any) {
            this.init();
        }

        private init(): void {
            this.cities = this.config.cities;
            this.city = this.config.city;
            this.rxWeatherStore.weather.subscribe(data => {
                this.weather = data;
            });
            this.changeCity();
        }

        changeCity(): void {
            this.rxWeatherStore.city.onNext(this.city);
        }
    }
}