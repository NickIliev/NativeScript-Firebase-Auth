"use strict";
var observable_1 = require("data/observable");
var firebase = require("nativescript-plugin-firebase");
var frame = require("ui/frame");
var user_1 = require("./models/user");
var ViewModel = (function (_super) {
    __extends(ViewModel, _super);
    function ViewModel() {
        var _this = _super.call(this) || this;
        _this._isFormVisible = true;
        return _this;
    }
    Object.defineProperty(ViewModel.prototype, "isFormVisible", {
        get: function () {
            return this._isFormVisible;
        },
        set: function (value) {
            if (this._isFormVisible !== value) {
                this._isFormVisible = value;
                this.notifyPropertyChange("isFormVisible", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewModel.prototype, "user", {
        get: function () {
            return this._user;
        },
        set: function (value) {
            if (this._user !== value) {
                this._user = value;
                this.notifyPropertyChange("user", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    ViewModel.prototype.getCurrentUser = function () {
        firebase.getCurrentUser().then(function (user) {
            console.log("User uid: " + user.uid);
            // this.user = new User(user.anonymous, user.email, user.emailVerified, user.name, user.profileImageURL, user.refreshToken, user.uid);
        }).catch(function (err) {
            console.log("Trouble in paradise: " + err);
        });
    };
    // FACEBOOK login
    ViewModel.prototype.onFacebookLogin = function () {
        var _this = this;
        firebase.login({
            type: firebase.LoginType.FACEBOOK,
            scope: ['public_profile', 'email'] // optional: defaults to ['public_profile', 'email']
        }).then(function (user) {
            console.log(JSON.stringify(user));
            _this.user = new user_1.User(user.anonymous, user.email, user.emailVerified, user.name, user.profileImageURL, user.refreshToken, user.uid);
            frame.topmost().navigate({ moduleName: "welcome-page", context: { user: _this.user } });
        }).catch(function (err) {
            console.log(err);
        });
    };
    // GOOGLE login
    ViewModel.prototype.onGoogleLogin = function () {
        var _this = this;
        firebase.login({
            type: firebase.LoginType.GOOGLE,
        }).then(function (user) {
            console.log(JSON.stringify(user));
            _this.user = new user_1.User(user.anonymous, user.email, user.emailVerified, user.name, user.profileImageURL, user.refreshToken, user.uid);
            frame.topmost().navigate({ moduleName: "welcome-page", context: { user: _this.user } });
        }).catch(function (err) {
            console.log(err);
        });
    };
    // ANONYMOUS login
    ViewModel.prototype.onAnonymousLogin = function () {
        firebase.login({
            type: firebase.LoginType.ANONYMOUS
        }).then(function (user) {
            console.log("User uid: " + user.uid);
        }, function (error) {
            console.log("Trouble in paradise: " + error);
        });
    };
    // PASSWORD login
    ViewModel.prototype.onPasswordLogin = function () {
        var _this = this;
        firebase.login({
            type: firebase.LoginType.PASSWORD,
            email: "ala@bala.com",
            password: "123456"
        }).then(function (user) {
            console.log(JSON.stringify(user));
            _this.user = new user_1.User(user.anonymous, user.email, user.emailVerified, user.name, user.profileImageURL, user.refreshToken, user.uid);
            frame.topmost().navigate({ moduleName: "welcome-page", context: { user: _this.user } });
        }).catch(function (err) {
            console.log(err);
        });
    };
    ViewModel.prototype.onCreateUser = function () {
        firebase.createUser({
            email: "ala@bala.com",
            password: "123456"
        }).then(function (result) {
            console.log("userid: " + result.key);
        }).catch(function (err) {
            console.log("createUser error: " + err);
        });
    };
    ViewModel.prototype.onRestPassword = function () {
        firebase.resetPassword({
            email: 'useraccount@provider.com'
        }).then(function () {
            // called when password reset was successful,
            // you could now prompt the user to check his email
        }).catch(function (err) {
            console.log(err);
        });
    };
    ViewModel.prototype.onChangePassword = function () {
        firebase.changePassword({
            email: 'useraccount@provider.com',
            oldPassword: 'myOldPassword',
            newPassword: 'myNewPassword'
        }).then(function () {
            // called when password change was successful
        }).catch(function (err) {
            console.log(err);
        });
    };
    // Universal logout
    ViewModel.prototype.onLogout = function () {
        firebase.logout();
    };
    ViewModel.prototype.onFormToggle = function () {
        this.isFormVisible = !this.isFormVisible;
    };
    return ViewModel;
}(observable_1.Observable));
exports.ViewModel = ViewModel;
//# sourceMappingURL=main-view-model.js.map