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
    Object.defineProperty(ViewModel.prototype, "email", {
        get: function () {
            return this._email;
        },
        set: function (value) {
            if (this._email !== value) {
                this._email = value;
                this.notifyPropertyChange("email", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewModel.prototype, "pass", {
        get: function () {
            return this._pass;
        },
        set: function (value) {
            if (this._pass !== value) {
                this._pass = value;
                this.notifyPropertyChange("pass", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewModel.prototype, "newEmail", {
        get: function () {
            return this._newEmail;
        },
        set: function (value) {
            if (this._newEmail !== value) {
                this._newEmail = value;
                this.notifyPropertyChange("newEmail", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewModel.prototype, "newPass", {
        get: function () {
            return this._newPass;
        },
        set: function (value) {
            if (this._newPass !== value) {
                this._newPass = value;
                this.notifyPropertyChange("newPass", value);
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
        }, function (err) {
            console.log(err);
        });
    };
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