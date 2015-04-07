define(function () {
    //var city = 'London,uk';
    //var city = 'Moscow,ru';
    var city = 'New York,us';
    
    return {
        openweathermapEndpoint : 'http://api.openweathermap.org/data/2.5/weather?q=',
        city : city,
        cities: ['London,uk', 'Moscow,ru', city, 'Turin,it'],
    };
});
