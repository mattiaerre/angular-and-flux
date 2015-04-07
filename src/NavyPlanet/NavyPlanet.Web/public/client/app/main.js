// see: http://stackoverflow.com/questions/8315088/prevent-requirejs-from-caching-required-scripts
require.config({
    paths: {
        angular: '//code.angularjs.org/1.3.14/angular'
    },
    shim: {
        angular: {
            exports: 'angular'
        }
    },
});

// navy-planet.lib
require(['angular', 'app.config', 'blocks/dispatcher', 'widgets/weather/weather-store', 'widgets/weather/weather-controller', 'widgets/geo-ip/geo-ip-store', 'widgets/geo-ip/geo-ip-controller'], function (angular, config) {
    var appName = 'navy-planet';
    angular.module(appName, []);
    angular.module(appName).service('dispatcher', Blocks.Dispatcher);
    angular.module(appName).service('weatherStore', Widgets.Weather.WeatherStore);
    angular.module(appName).controller('WeatherController', Widgets.Weather.WeatherController);
    angular.module(appName).service('geoIpStore', Widgets.GeoIp.GeoIpStore);
    angular.module(appName).controller('GeoIpController', Widgets.GeoIp.GeoIpController);
    
    angular.module(appName).run(bootstrap);
    
    bootstrap.$inject = ['$log', 'dispatcher', 'weatherStore', 'geoIpStore'];
    function bootstrap($log, dispatcher, weatherStore, geoIpStore) {
        $log.info(appName + ' is bootstrapping');
        
        dispatcher.register(function (payload) {
            $log.info('payload: ' + JSON.stringify(payload));
        });
        
        weatherStore.init(config);
        geoIpStore.init(config);
    }
});