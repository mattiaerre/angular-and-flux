module Widgets.RxWeather {
    export class RxWeatherController {
        constructor(private rxWeatherStore: IRxWeatherStore, private $log: any) {
            this.init();
        }

        cities: string[] = [];
        city: string = null;
        model: any = null;

        private init(): void {
            this.rxWeatherStore.cities.subscribe(stream => {
                this.cities = stream;
            });
            this.rxWeatherStore.city.subscribe(stream => {
                this.city = stream;
            });
            this.rxWeatherStore.weather.subscribe(stream => {
                this.model = stream.data;
            });
        }

        cityChanged(): void {
            // todo: this should update this.rxWeatherStore.city
            console.log(this.city);
        }
    }
}