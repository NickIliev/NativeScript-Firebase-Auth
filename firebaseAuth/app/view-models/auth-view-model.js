"use strict";
var observable_1 = require("data/observable");
var firebase = require("nativescript-plugin-firebase");
var frame = require("ui/frame");
var dialogs = require("ui/dialogs");
var user_1 = require("../models/user");
var AuthViewModel = (function (_super) {
    __extends(AuthViewModel, _super);
    function AuthViewModel() {
        var _this = _super.call(this) || this;
        _this._email = "test@test.com";
        _this._pass = "test1234";
        _this._newEmail = "test@test.com";
        _this._newPass = "test1234";
        _this.isFormVisible = true;
        return _this;
    }
    Object.defineProperty(AuthViewModel.prototype, "isFormVisible", {
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
    Object.defineProperty(AuthViewModel.prototype, "email", {
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
    Object.defineProperty(AuthViewModel.prototype, "pass", {
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
    Object.defineProperty(AuthViewModel.prototype, "newEmail", {
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
    Object.defineProperty(AuthViewModel.prototype, "newPass", {
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
    // for all login methods
    AuthViewModel.prototype.getCurrentUser = function () {
        var _this = this;
        firebase.getCurrentUser().then(function (user) {
            console.log("User uid: " + user.uid);
            _this.currentUser = new user_1.User(user.anonymous, user.email, user.emailVerified, user.name, user.profileImageURL, user.refreshToken, user.uid);
        }).catch(function (err) {
            console.log("Trouble in paradise: " + err);
            dialogs.alert(err);
        });
    };
    // FACEBOOK login
    AuthViewModel.prototype.onFacebookLogin = function () {
        var _this = this;
        firebase.login({
            type: firebase.LoginType.FACEBOOK,
            scope: ['public_profile', 'email'] // optional: defaults to ['public_profile', 'email']
        }).then(function (user) {
            console.log(JSON.stringify(user));
            _this.currentUser = new user_1.User(user.anonymous, user.email, user.emailVerified, user.name, user.profileImageURL, user.refreshToken, user.uid);
            frame.topmost().navigate({ moduleName: "welcome-page", context: { currentUser: _this.currentUser } });
        }).catch(function (err) {
            console.log(err);
            dialogs.alert(err);
        });
    };
    // GOOGLE login
    AuthViewModel.prototype.onGoogleLogin = function () {
        var _this = this;
        firebase.login({
            type: firebase.LoginType.GOOGLE,
        }).then(function (user) {
            console.log(JSON.stringify(user));
            _this.currentUser = new user_1.User(user.anonymous, user.email, user.emailVerified, user.name, user.profileImageURL, user.refreshToken, user.uid);
            frame.topmost().navigate({ moduleName: "welcome-page", context: { currentUser: _this.currentUser } });
        }).catch(function (err) {
            console.log(err);
            dialogs.alert(err);
        });
    };
    // ANONYMOUS login
    AuthViewModel.prototype.onAnonymousLogin = function () {
        var _this = this;
        firebase.login({
            type: firebase.LoginType.ANONYMOUS
        }).then(function (user) {
            console.log(JSON.stringify(user));
            _this.currentUser = new user_1.User(user.anonymous, user.email, user.emailVerified, user.name, user.profileImageURL, user.refreshToken, user.uid);
            frame.topmost().navigate({ moduleName: "welcome-page", context: { currentUser: _this.currentUser } });
        }).catch(function (err) {
            console.log("Trouble in paradise: " + err);
            dialogs.alert(err);
        });
    };
    // PASSWORD login
    AuthViewModel.prototype.onPasswordLogin = function () {
        var _this = this;
        firebase.login({
            type: firebase.LoginType.PASSWORD,
            email: this.email,
            password: this.pass
        }).then(function (user) {
            console.log(JSON.stringify(user));
            _this.currentUser = new user_1.User(user.anonymous, user.email, user.emailVerified, user.name, user.profileImageURL, user.refreshToken, user.uid);
            frame.topmost().navigate({ moduleName: "welcome-page", context: { currentUser: _this.currentUser } });
        }).catch(function (err) {
            console.log(err);
            dialogs.alert(err);
        });
    };
    AuthViewModel.prototype.onCreateUser = function () {
        firebase.createUser({
            email: this.newEmail,
            password: this.newPass
        }).then(function (result) {
            console.log("userid: " + result.key);
        }).catch(function (err) {
            console.log("createUser error: " + err);
            dialogs.alert(err);
        });
    };
    AuthViewModel.prototype.onResetPassword = function () {
        var _this = this;
        firebase.resetPassword({
            email: this.email
        }).then(function () {
            // called when password reset was successful,
            // you could now prompt the user to check his email
            dialogs.alert("Password Rest instructions send to " + _this.email);
        }).catch(function (err) {
            console.log(err);
            dialogs.alert(err);
        });
    };
    AuthViewModel.prototype.onChangePassword = function () {
        firebase.changePassword({
            email: this.email,
            oldPassword: 'myOldPassword',
            newPassword: 'myNewPassword'
        }).then(function () {
            // called when password change was successful
        }).catch(function (err) {
            console.log(err);
            dialogs.alert(err);
        });
    };
    // Universal methods
    AuthViewModel.prototype.onLogout = function () {
        firebase.logout()
            .then(function (res) {
            dialogs.alert("Logout succsessfull!");
        }).catch(function (err) {
            dialogs.alert(err);
        });
    };
    // Sending an "email confirmation" email can be done after the user logged in
    AuthViewModel.prototype.onSendEmailVerification = function () {
        firebase.sendEmailVerification().then(function () {
            console.log("Email verification sent");
        }).catch(function (err) {
            console.log("Error sending email verification: " + err);
        });
    };
    // If you want to authenticate your user from your backend server you can obtain a Firebase auth token for the currently logged in user.
    AuthViewModel.prototype.onGetAuthToken = function () {
        firebase.getAuthToken({
            // default false, not recommended to set to true by Firebase but exposed for {N} devs nonetheless :)
            forceRefresh: false
        }).then(function (token) {
            console.log("Auth token retrieved: " + token);
        }).catch(function (err) {
            console.log("Auth token retrieval error: " + err);
            dialogs.alert(err);
        });
    };
    // UI specific
    AuthViewModel.prototype.onFormToggle = function () {
        this.isFormVisible = !this.isFormVisible;
    };
    return AuthViewModel;
}(observable_1.Observable));
exports.AuthViewModel = AuthViewModel;
//# sourceMappingURL=auth-view-model.js.map