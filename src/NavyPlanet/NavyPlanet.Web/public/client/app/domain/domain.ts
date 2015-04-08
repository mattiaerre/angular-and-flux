module Domain {
    export enum ActionType {
        Command = 1,
        Event = 2
    }

    export enum ActionKey {
        WeatherControllerReady = 1,
        WeatherLoaded = 2,
        GetWeather = 3,
        GeoIpControllerReady = 4,
        GeoIpLoaded = 5,
    }

    export class Payload {
        constructor(public actionType: ActionType, public body: PayloadBody) {
        }
    }

    export class PayloadBody {
        constructor(public actionKey: ActionKey, public value: any) {
        }
    }
}