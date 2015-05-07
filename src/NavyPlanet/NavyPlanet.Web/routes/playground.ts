import express = require('express');
import Twitter = require('twitter');

export function list(req: express.Request, res: express.Response) {
    // twitter public streams
    // https://stream.twitter.com/1.1/statuses/filter.json

    var client = new Twitter({
        consumer_key: '',
        consumer_secret: '',
        access_token_key: '',
        access_token_secret: ''
    });

    res.send("respond with a resource");
};