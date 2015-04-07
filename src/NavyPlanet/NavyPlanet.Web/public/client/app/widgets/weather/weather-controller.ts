module Widgets.Weather {
    export class WeatherController {
        constructor(private dispatcher: Blocks.IDispatcher, private weatherStore: IWeatherStore, private $log: any) {
            this.init();
        }

        model: any = null;
        cities: string[] = null;
        city: string = null;

        private init(): void {
            this.dispatcher.register((payload: Blocks.Payload) => {
                if (payload.actionType == Blocks.ActionType.Event) {
                    if (payload.body.actionKey == Blocks.ActionKey.WeatherLoaded) {
                        this.city = this.weatherStore.city;
                        this.cities = this.weatherStore.cities;
                        this.model = this.weatherStore.weather;
                    }
                }
            });
            this.dispatcher.dispatch(new Blocks.Payload(Blocks.ActionType.Event, new Blocks.PayloadBody(Blocks.ActionKey.WeatherControllerReady, null)));
        }

        cityChanged(): void {
            this.dispatcher.dispatch(new Blocks.Payload(Blocks.ActionType.Command, new Blocks.PayloadBody(Blocks.ActionKey.GetWeather, this.city)));
        }
    }
}