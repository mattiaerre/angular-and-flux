define(function () {
    //var city = 'London,uk';
    var city = 'Moscow,ru';
    
    return {
        openweathermapEndpoint : 'http://api.openweathermap.org/data/2.5/weather?q=',
        city : city,
        cities: ['London,uk', city, 'New York,us', 'Turin,it'],
    };
});
