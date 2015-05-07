var Twitter = require('twitter');
function list(req, res) {
    // twitter public streams
    // https://stream.twitter.com/1.1/statuses/filter.json
    var client = new Twitter({
        consumer_key: '',
        consumer_secret: '',
        access_token_key: '',
        access_token_secret: ''
    });
    res.send("respond with a resource");
}
exports.list = list;
;
//# sourceMappingURL=playground.js.map