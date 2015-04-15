define(function () {
    var city = 'New York,US';
    
    return {
        openweathermapEndpoint : 'http://api.openweathermap.org/data/2.5/weather?q=',
        city : city,
        cities: ['London,GB', 'Moscow,RU', city, 'Turin,Italy'],
        geoipEndpoint: 'http://www.telize.com/geoip',
        emojisEndpoint: 'https://api.github.com/emojis',
    };
});
