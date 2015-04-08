module Widgets.Weather {
    export interface IWeatherStore {
        init(config: any): void;
        cities: string[];
        city: string;
        weather: any;
    }

    export class WeatherStore implements IWeatherStore {
        constructor(private dispatcher: Blocks.IDispatcher, private $http: any, private $log: any) { }

        cities: string[] = null;
        city: string = null;
        weather: any = null;

        private config: any = null;

        init(config: any) {
            this.config = config;
            this.cities = this.config.cities;
            this.city = this.config.city;
            this.dispatcher.register((payload: Blocks.Payload) => this.register(payload));
        }

        private register(payload: Blocks.Payload): void {
            this.registerEvents(payload);
            this.registerCommands(payload);
        }

        private registerEvents(payload: Blocks.Payload): void {
            if (payload.actionType == Blocks.ActionType.Event) {
                if (payload.body.actionKey == Blocks.ActionKey.WeatherControllerReady) {
                    this.getWeather(this.config.openweathermapEndpoint + this.city);
                }
            }
        }

        private registerCommands(payload: Blocks.Payload): void {
            if (payload.actionType == Blocks.ActionType.Command) {
                if (payload.body.actionKey == Blocks.ActionKey.GetWeather) {
                    this.city = payload.body.value;
                    this.getWeather(this.config.openweathermapEndpoint + this.city);
                }
            }            
        }

        private getWeather(url): void {
            this.$http.get(url).then((response) => {
                this.weather = response.data;
                this.dispatcher.dispatch(new Blocks.Payload(Blocks.ActionType.Event, new Blocks.PayloadBody(Blocks.ActionKey.WeatherLoaded, null)));
            },(reason) => {
                    this.$log.error(reason);
                });
        }
    }
}