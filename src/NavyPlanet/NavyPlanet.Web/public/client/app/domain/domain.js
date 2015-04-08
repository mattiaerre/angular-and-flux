var Domain;
(function (Domain) {
    (function (ActionType) {
        ActionType[ActionType["Command"] = 1] = "Command";
        ActionType[ActionType["Event"] = 2] = "Event";
    })(Domain.ActionType || (Domain.ActionType = {}));
    var ActionType = Domain.ActionType;
    (function (ActionKey) {
        ActionKey[ActionKey["WeatherControllerReady"] = 1] = "WeatherControllerReady";
        ActionKey[ActionKey["WeatherLoaded"] = 2] = "WeatherLoaded";
        ActionKey[ActionKey["GetWeather"] = 3] = "GetWeather";
        ActionKey[ActionKey["GeoIpControllerReady"] = 4] = "GeoIpControllerReady";
        ActionKey[ActionKey["GeoIpLoaded"] = 5] = "GeoIpLoaded";
    })(Domain.ActionKey || (Domain.ActionKey = {}));
    var ActionKey = Domain.ActionKey;
    var Payload = (function () {
        function Payload(actionType, body) {
            this.actionType = actionType;
            this.body = body;
        }
        return Payload;
    })();
    Domain.Payload = Payload;
    var PayloadBody = (function () {
        function PayloadBody(actionKey, value) {
            this.actionKey = actionKey;
            this.value = value;
        }
        return PayloadBody;
    })();
    Domain.PayloadBody = PayloadBody;
})(Domain || (Domain = {}));
//# sourceMappingURL=domain.js.map