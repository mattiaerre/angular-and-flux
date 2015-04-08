module Widgets.Weather {
    export class WeatherController {
        constructor(private dispatcher: Blocks.IDispatcher, private weatherStore: IWeatherStore, private $log: any) {
            this.init();
        }

        model: any = null;
        cities: string[] = null;
        city: string = null;

        private init(): void {
            this.dispatcher.register((payload: Domain.Payload) => this.register(payload));
            this.dispatcher.dispatch(new Domain.Payload(Domain.ActionType.Event, new Domain.PayloadBody(Domain.ActionKey.WeatherControllerReady, null)));
        }

        private register(payload: Domain.Payload): void {
            if (payload.actionType == Domain.ActionType.Event) {
                if (payload.body.actionKey == Domain.ActionKey.WeatherLoaded) {
                    this.city = this.weatherStore.city;
                    this.cities = this.weatherStore.cities;
                    this.model = this.weatherStore.weather;
                }
            }
        }

        cityChanged(): void {
            this.dispatcher.dispatch(new Domain.Payload(Domain.ActionType.Command, new Domain.PayloadBody(Domain.ActionKey.GetWeather, this.city)));
        }
    }
}