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

require(['angular', 'blocks/dispatcher', 'widgets/weather/weather-store', 'widgets/weather/weather-controller'], function (angular) {
    var appName = 'navy-planet';
    angular.module(appName, []);
    angular.module(appName).service('dispatcher', Blocks.Dispatcher);
    angular.module(appName).service('weatherStore', Widgets.Weather.WeatherStore);
    angular.module(appName).controller('WeatherController', Widgets.Weather.WeatherController);
    
    angular.module(appName).run(bootstrap);
    
    bootstrap.$inject = ['$log', 'dispatcher', 'weatherStore'];
    function bootstrap($log, dispatcher, weatherStore) {
        $log.info(appName + ' is bootstrapping');
        
        dispatcher.register(function (payload) {
            $log.info('payload: ' + JSON.stringify(payload));
        });
        
        weatherStore.init(function () {
            dispatcher.dispatch(new Blocks.Payload(Blocks.ActionType.Command, new Blocks.PayloadBody(Blocks.ActionKey.GetWeather, 'London,uk')));
        });
    }
});