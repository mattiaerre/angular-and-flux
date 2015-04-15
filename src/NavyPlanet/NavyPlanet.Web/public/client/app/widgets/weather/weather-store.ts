module Widgets.Weather {
    export interface IWeatherStore {
        //init(config: any): void;
        cities: string[];
        city: string;
        weather: any;
    }

    export class WeatherStore implements IWeatherStore {
        constructor(private dispatcher: Blocks.IDispatcher, private httpService: Blocks.IHttpService, private config: any) {
            this.init();
        }

        cities: string[] = null;
        city: string = null;
        weather: any = null;

        private init() {
            this.cities = this.config.cities;
            this.city = this.config.city;
            this.dispatcher.register((payload: Domain.Payload) => this.register(payload));
        }

        private register(payload: Domain.Payload): void {
            this.registerEvents(payload);
            this.registerCommands(payload);
        }

        private registerEvents(payload: Domain.Payload): void {
            if (payload.actionType == Domain.ActionType.Event) {
                if (payload.body.actionKey == Domain.ActionKey.WeatherControllerReady) {
                    this.getWeather(this.config.openweathermapEndpoint + this.city);
                }
            }
        }

        private registerCommands(payload: Domain.Payload): void {
            if (payload.actionType == Domain.ActionType.Command) {
                if (payload.body.actionKey == Domain.ActionKey.GetWeather) {
                    this.city = payload.body.value;
                    this.getWeather(this.config.openweathermapEndpoint + this.city);
                }
            }
        }

        private getWeather(url): void {
            this.httpService.getByUrl(url,(response) => {
                this.weather = response.data;
                this.dispatcher.dispatch(new Domain.Payload(Domain.ActionType.Event, new Domain.PayloadBody(Domain.ActionKey.WeatherLoaded, null)));
            });
        }
    }
}