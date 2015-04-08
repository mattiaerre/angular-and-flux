// see: https://github.com/facebook/flux/blob/master/src/Dispatcher.js

module Blocks {
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

    export interface IDispatcher {
        register(callback: any): string;
        unregister(id: string): void;
        waitFor(ids: string[]): void;
        dispatch(payload: any): void;
        isDispatching(): boolean;
    }

    export class Dispatcher implements IDispatcher {
        private lastId: number = 1;
        private prefix: string = 'ID_';
        private callbacks: any[] = [];
        private isPending: any[] = [];
        private isHandled: any[] = [];
        private pendingPayload: any = null;
        private dispatching: boolean = false;

        register(callback: any): string {
            var id: string = this.prefix + this.lastId++;
            this.callbacks[id] = callback;
            return id;
        }

        unregister(id: string): void {
            delete this.callbacks[id];
        }

        waitFor(ids: string[]): void {
            for (var i = 0; i < ids.length; i++) {
                var id = ids[i];
                if (this.isPending[id])
                    continue;
                this.invokeCallback(id);
            }
        }

        dispatch(payload: any): void {
            this.startDispatching(payload);
            try {
                for (var id in this.callbacks) {
                    if (this.isPending[id]) {
                        continue;
                    }
                    this.invokeCallback(id);
                }
            } finally {
                this.stopDispatching();
            }
        }

        isDispatching(): boolean {
            return this.dispatching;
        }

        private invokeCallback(id: string) {
            this.isPending[id] = true;
            this.callbacks[id](this.pendingPayload);
            this.isHandled[id] = true;
        }

        private startDispatching(payload: any) {
            for (var id in this.callbacks) {
                this.isPending[id] = false;
                this.isHandled[id] = false;
            }
            this.pendingPayload = payload;
            this.dispatching = true;
        }

        private stopDispatching() {
            this.pendingPayload = null;
            this.dispatching = false;
        }
    }
}