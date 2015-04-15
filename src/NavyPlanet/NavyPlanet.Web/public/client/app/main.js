// see: http://stackoverflow.com/questions/8315088/prevent-requirejs-from-caching-required-scripts
require.config({
    paths: {
        angular: '//code.angularjs.org/1.3.14/angular',
        rxjs: '//cdnjs.cloudflare.com/ajax/libs/rxjs/2.5.1/rx.all',
    },
    shim: {
        angular: {
            exports: 'angular',
        },
        rxjs: {
            exports: 'rxjs',
        }
    },
});

// navy-planet.lib
require(['angular', 'app.config', 'rxjs', 'blocks/dispatcher', 'blocks/http-service', 'domain/domain', 
    'widgets/weather/weather-store', 'widgets/weather/weather-controller', 
    'widgets/geo-ip/geo-ip-store', 'widgets/geo-ip/geo-ip-controller',
    'widgets/emojis/emojis-store', 'widgets/emojis/emojis-controller'], function (angular, config) {
    var appName = 'navy-planet';
    angular.module(appName, []);
    angular.module(appName).service('dispatcher', Blocks.Dispatcher);
    angular.module(appName).service('httpService', Blocks.HttpService);
    angular.module(appName).service('weatherStore', Widgets.Weather.WeatherStore);
    angular.module(appName).controller('WeatherController', Widgets.Weather.WeatherController);
    angular.module(appName).service('geoIpStore', Widgets.GeoIp.GeoIpStore);
    angular.module(appName).controller('GeoIpController', Widgets.GeoIp.GeoIpController);
    angular.module(appName).service('emojisStore', Widgets.Emojis.EmojisStore);
    angular.module(appName).controller('EmojisController', Widgets.Emojis.EmojisController);
    
    angular.module(appName).factory('config', function () { return config; });
    
    angular.module(appName).run(bootstrap);
    
    bootstrap.$inject = ['$log', 'dispatcher', 'weatherStore', 'geoIpStore', 'emojisStore'];
    function bootstrap($log, dispatcher, weatherStore, geoIpStore, emojisStore) {
        $log.info(appName + ' is bootstrapping');
        
        dispatcher.register(function (payload) {
            $log.info('payload: ' + JSON.stringify(payload));
        });
    }
});