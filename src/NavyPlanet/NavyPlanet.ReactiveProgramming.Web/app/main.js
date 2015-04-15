require.config({
    paths: {
        rxjs: '//cdnjs.cloudflare.com/ajax/libs/rxjs/2.5.1/rx.all',
        jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min',
    },
    shim: {
        rxjs: {
            exports: 'rxjs',
        },
        jquery: {
            exports: 'jquery',
        },
    },
});

require(['rxjs', 'jquery'], function () {
    var requestStream = Rx.Observable.just('https://api.github.com/users');

    requestStream.subscribe(function (requestUrl) {
        // execute the request
        var responseStream = Rx.Observable.create(function (observer) {
            // todo: replace w/ AngularJS
            $.getJSON(requestUrl)
                .done(function (response) { observer.onNext(response); })
                .fail(function (jqXHR, status, error) { observer.onError(error); })
                .always(function () { observer.onCompleted(); });
        });

        responseStream.subscribe(function (response) {
            // do something with the response
            console.log(JSON.stringify(response));
        });
    });
});