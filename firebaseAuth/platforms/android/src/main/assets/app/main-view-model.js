"use strict";
var observable_1 = require("data/observable");
var firebase = require("nativescript-plugin-firebase");
var frame = require("ui/frame");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        return _super.call(this) || this;
    }
    Object.defineProperty(HelloWorldModel.prototype, "username", {
        get: function () {
            return this._username;
        },
        set: function (value) {
            if (this._username !== value) {
                this._username = value;
                this.notifyPropertyChange('username', value);
            }
        },
        enumerable: true,
        configurable: true
    });
    HelloWorldModel.prototype.onFacebookLogin = function () {
        firebase.login({
            type: firebase.LoginType.FACEBOOK,
            scope: ['public_profile', 'email'] // optional: defaults to ['public_profile', 'email']
        }).then(function (result) {
            console.log(JSON.stringify(result));
            frame.topmost().navigate("welcome-page");
        }, function (errorMessage) {
            console.log(errorMessage);
        });
    };
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=main-view-model.js.map