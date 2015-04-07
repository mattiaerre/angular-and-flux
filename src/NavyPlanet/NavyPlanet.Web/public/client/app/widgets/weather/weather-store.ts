module Widgets.Weather {
    export interface IWeatherStore {
        init(callback: any): void;
        weather: any;
    }

    export class WeatherStore implements IWeatherStore {
        constructor(private dispatcher: Blocks.IDispatcher, private $http: any, private $log: any) {
        }

        weather: any = null;

        init(callback: any) {
            this.dispatcher.register((payload: Blocks.Payload) => {
                if (payload.actionType == Blocks.ActionType.Command) {
                    if (payload.body.actionKey == Blocks.ActionKey.GetWeather) {
                        // todo: get base path from config
                        this.$http.get('http://api.openweathermap.org/data/2.5/weather?q=' + payload.body.value).then((response) => {
                            //this.$log.info('response: ' + JSON.stringify(response));
                            this.weather = response;
                            this.dispatcher.dispatch(new Blocks.Payload(Blocks.ActionType.Event, new Blocks.PayloadBody(Blocks.ActionKey.WeatherLoaded, null)));
                        }, (reason) => {
                                this.$log.error(reason);
                            });
                    }
                }
            });
            callback();
        }
    }
}