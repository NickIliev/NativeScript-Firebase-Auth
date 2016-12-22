"use strict";
var observable_1 = require("data/observable");
var firebase = require("nativescript-plugin-firebase");
var frame = require("ui/frame");
var ViewModel = (function (_super) {
    __extends(ViewModel, _super);
    function ViewModel() {
        return _super.call(this) || this;
    }
    ViewModel.prototype.onFacebookLogin = function () {
        firebase.login({
            type: firebase.LoginType.FACEBOOK,
            scope: ['public_profile', 'email'] // optional: defaults to ['public_profile', 'email']
        }).then(function (res) {
            // console.log(JSON.stringify(result));
            frame.topmost().navigate("welcome-page");
        }).catch(function (err) {
            console.log(err);
        });
    };
    ViewModel.prototype.onGoogleLogin = function () {
        firebase.login({
            type: firebase.LoginType.GOOGLE,
        }).then(function (res) {
            console.log(JSON.stringify(res));
            frame.topmost().navigate("welcome-page");
        }).catch(function (err) {
            console.log(err);
        });
    };
    ViewModel.prototype.onLogout = function () {
        firebase.logout();
    };
    return ViewModel;
}(observable_1.Observable));
exports.ViewModel = ViewModel;
//# sourceMappingURL=main-view-model.js.map