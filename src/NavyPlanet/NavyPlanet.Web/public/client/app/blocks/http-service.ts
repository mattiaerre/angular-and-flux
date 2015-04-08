module Blocks {
    export interface IHttpService {
        getByUrl(url: string, callback): void;
    }

    export class HttpService {
        constructor(private $http: any, private $log: any) {
        }

        getByUrl(url: string, callback): void {
            this.$http.get(url).then(callback,(reason) => {
                this.$log.error(reason);
            });
        }
    }
}