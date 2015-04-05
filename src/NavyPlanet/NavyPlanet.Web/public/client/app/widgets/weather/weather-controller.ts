module Widgets.Weather {
    export class WeatherController {
        constructor(private dispatcher: Blocks.IDispatcher, private weatherStore: IWeatherStore, private $log: any) {
            this.init();
        }

        data: any = null;
        cities: string[] = ['London,uk', 'New York,us', 'Turin,it']
        city: string = this.cities[0];

        private init(): void {
            this.dispatcher.register((payload: Blocks.Payload) => {
                if (payload.actionType == Blocks.ActionType.Event)
                    if (payload.body.actionKey == Blocks.ActionKey.WeatherLoaded) {
                        this.$log.info(this.weatherStore.weather);
                        this.data = this.weatherStore.weather.data;
                    }
            });
        }

        cityChanged(): void {
            this.dispatcher.dispatch(new Blocks.Payload(Blocks.ActionType.Command, new Blocks.PayloadBody(Blocks.ActionKey.GetWeather, this.city)));
        }
    }
}