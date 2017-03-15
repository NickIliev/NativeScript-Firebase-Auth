"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXV0aC12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTZDO0FBQzdDLHVEQUF5RDtBQUN6RCxnQ0FBa0M7QUFDbEMsb0NBQXNDO0FBQ3RDLHVDQUFzQztBQUV0QztJQUFtQyxpQ0FBVTtJQVV6QztRQUFBLFlBQ0ksaUJBQU8sU0FHVjtRQVpPLFlBQU0sR0FBVyxlQUFlLENBQUM7UUFDakMsV0FBSyxHQUFXLFVBQVUsQ0FBQztRQUMzQixlQUFTLEdBQVcsZUFBZSxDQUFDO1FBQ3BDLGNBQVEsR0FBVyxVQUFVLENBQUM7UUFRbEMsS0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7O0lBQzlCLENBQUM7SUFFRCxzQkFBVyx3Q0FBYTthQUF4QjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQy9CLENBQUM7YUFFRCxVQUF5QixLQUFjO1lBQ25DLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDdEQsQ0FBQztRQUNMLENBQUM7OztPQVBBO0lBU0Qsc0JBQVcsZ0NBQUs7YUFBaEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDO2FBRUQsVUFBaUIsS0FBYTtZQUMxQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUNwQixJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzlDLENBQUM7UUFDTCxDQUFDOzs7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UUFDSSxRQUFRLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFBLEdBQUc7WUFDUixPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzVELENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELHdJQUF3STtJQUNqSSxzQ0FBYyxHQUFyQjtRQUNJLFFBQVEsQ0FBQyxZQUFZLENBQUM7WUFDbEIsb0dBQW9HO1lBQ3BHLFlBQVksRUFBRSxLQUFLO1NBQ3RCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxLQUFLO1lBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUNsRCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxHQUFHO1lBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNsRCxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUNELGNBQWM7SUFDUCxvQ0FBWSxHQUFuQjtRQUNJLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzdDLENBQUM7SUFDTCxvQkFBQztBQUFELENBQUMsQUF0TkQsQ0FBbUMsdUJBQVUsR0FzTjVDO0FBdE5ZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ2RhdGEvb2JzZXJ2YWJsZSc7XHJcbmltcG9ydCAqIGFzIGZpcmViYXNlIGZyb20gXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCI7XHJcbmltcG9ydCAqIGFzIGZyYW1lIGZyb20gXCJ1aS9mcmFtZVwiO1xyXG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vbW9kZWxzL3VzZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBdXRoVmlld01vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBfZW1haWw6IHN0cmluZyA9IFwidGVzdEB0ZXN0LmNvbVwiO1xyXG4gICAgcHJpdmF0ZSBfcGFzczogc3RyaW5nID0gXCJ0ZXN0MTIzNFwiO1xyXG4gICAgcHJpdmF0ZSBfbmV3RW1haWw6IHN0cmluZyA9IFwidGVzdEB0ZXN0LmNvbVwiO1xyXG4gICAgcHJpdmF0ZSBfbmV3UGFzczogc3RyaW5nID0gXCJ0ZXN0MTIzNFwiO1xyXG4gICAgcHJpdmF0ZSBfaXNGb3JtVmlzaWJsZTogYm9vbGVhbjtcclxuXHJcbiAgICBwdWJsaWMgY3VycmVudFVzZXI6IFVzZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5pc0Zvcm1WaXNpYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzRm9ybVZpc2libGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzRm9ybVZpc2libGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBpc0Zvcm1WaXNpYmxlKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzRm9ybVZpc2libGUgIT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzRm9ybVZpc2libGUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5ub3RpZnlQcm9wZXJ0eUNoYW5nZShcImlzRm9ybVZpc2libGVcIiwgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGVtYWlsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lbWFpbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGVtYWlsKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodGhpcy5fZW1haWwgIT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VtYWlsID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMubm90aWZ5UHJvcGVydHlDaGFuZ2UoXCJlbWFpbFwiLCB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcGFzcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGFzcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHBhc3ModmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0aGlzLl9wYXNzICE9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9wYXNzID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMubm90aWZ5UHJvcGVydHlDaGFuZ2UoXCJwYXNzXCIsIHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBuZXdFbWFpbCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmV3RW1haWw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBuZXdFbWFpbCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX25ld0VtYWlsICE9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9uZXdFbWFpbCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLm5vdGlmeVByb3BlcnR5Q2hhbmdlKFwibmV3RW1haWxcIiwgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IG5ld1Bhc3MoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25ld1Bhc3M7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBuZXdQYXNzKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodGhpcy5fbmV3UGFzcyAhPT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fbmV3UGFzcyA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLm5vdGlmeVByb3BlcnR5Q2hhbmdlKFwibmV3UGFzc1wiLCB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGZvciBhbGwgbG9naW4gbWV0aG9kc1xyXG4gICAgcHVibGljIGdldEN1cnJlbnRVc2VyKCkge1xyXG4gICAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbih1c2VyID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJVc2VyIHVpZDogXCIgKyB1c2VyLnVpZCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFVzZXIgPSBuZXcgVXNlcih1c2VyLmFub255bW91cywgdXNlci5lbWFpbCwgdXNlci5lbWFpbFZlcmlmaWVkLCB1c2VyLm5hbWUsIHVzZXIucHJvZmlsZUltYWdlVVJMLCB1c2VyLnJlZnJlc2hUb2tlbiwgdXNlci51aWQpO1xyXG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVHJvdWJsZSBpbiBwYXJhZGlzZTogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KGVycik7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyBGQUNFQk9PSyBsb2dpblxyXG4gICAgcHVibGljIG9uRmFjZWJvb2tMb2dpbigpIHtcclxuICAgICAgICBmaXJlYmFzZS5sb2dpbih7XHJcbiAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLkxvZ2luVHlwZS5GQUNFQk9PSyxcclxuICAgICAgICAgICAgc2NvcGU6IFsncHVibGljX3Byb2ZpbGUnLCAnZW1haWwnXSAvLyBvcHRpb25hbDogZGVmYXVsdHMgdG8gWydwdWJsaWNfcHJvZmlsZScsICdlbWFpbCddXHJcbiAgICAgICAgfSkudGhlbih1c2VyID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodXNlcikpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRVc2VyID0gbmV3IFVzZXIodXNlci5hbm9ueW1vdXMsIHVzZXIuZW1haWwsIHVzZXIuZW1haWxWZXJpZmllZCwgdXNlci5uYW1lLCB1c2VyLnByb2ZpbGVJbWFnZVVSTCwgdXNlci5yZWZyZXNoVG9rZW4sIHVzZXIudWlkKTtcclxuICAgICAgICAgICAgZnJhbWUudG9wbW9zdCgpLm5hdmlnYXRlKHsgbW9kdWxlTmFtZTogXCJ3ZWxjb21lLXBhZ2VcIiwgY29udGV4dDogeyBjdXJyZW50VXNlcjogdGhpcy5jdXJyZW50VXNlciB9IH0pO1xyXG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoZXJyKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEdPT0dMRSBsb2dpblxyXG4gICAgcHVibGljIG9uR29vZ2xlTG9naW4oKSB7XHJcbiAgICAgICAgZmlyZWJhc2UubG9naW4oe1xyXG4gICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5Mb2dpblR5cGUuR09PR0xFLFxyXG4gICAgICAgIH0pLnRoZW4odXNlciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHVzZXIpKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VXNlciA9IG5ldyBVc2VyKHVzZXIuYW5vbnltb3VzLCB1c2VyLmVtYWlsLCB1c2VyLmVtYWlsVmVyaWZpZWQsIHVzZXIubmFtZSwgdXNlci5wcm9maWxlSW1hZ2VVUkwsIHVzZXIucmVmcmVzaFRva2VuLCB1c2VyLnVpZCk7XHJcbiAgICAgICAgICAgIGZyYW1lLnRvcG1vc3QoKS5uYXZpZ2F0ZSh7IG1vZHVsZU5hbWU6IFwid2VsY29tZS1wYWdlXCIsIGNvbnRleHQ6IHsgY3VycmVudFVzZXI6IHRoaXMuY3VycmVudFVzZXIgfSB9KTtcclxuICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KGVycik7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyBBTk9OWU1PVVMgbG9naW5cclxuICAgIHB1YmxpYyBvbkFub255bW91c0xvZ2luKCkge1xyXG4gICAgICAgIGZpcmViYXNlLmxvZ2luKHtcclxuICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuTG9naW5UeXBlLkFOT05ZTU9VU1xyXG4gICAgICAgIH0pLnRoZW4odXNlciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHVzZXIpKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VXNlciA9IG5ldyBVc2VyKHVzZXIuYW5vbnltb3VzLCB1c2VyLmVtYWlsLCB1c2VyLmVtYWlsVmVyaWZpZWQsIHVzZXIubmFtZSwgdXNlci5wcm9maWxlSW1hZ2VVUkwsIHVzZXIucmVmcmVzaFRva2VuLCB1c2VyLnVpZCk7XHJcbiAgICAgICAgICAgIGZyYW1lLnRvcG1vc3QoKS5uYXZpZ2F0ZSh7IG1vZHVsZU5hbWU6IFwid2VsY29tZS1wYWdlXCIsIGNvbnRleHQ6IHsgY3VycmVudFVzZXI6IHRoaXMuY3VycmVudFVzZXIgfSB9KTtcclxuICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRyb3VibGUgaW4gcGFyYWRpc2U6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgZGlhbG9ncy5hbGVydChlcnIpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8gUEFTU1dPUkQgbG9naW5cclxuICAgIHB1YmxpYyBvblBhc3N3b3JkTG9naW4oKSB7XHJcbiAgICAgICAgZmlyZWJhc2UubG9naW4oe1xyXG4gICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5Mb2dpblR5cGUuUEFTU1dPUkQsXHJcbiAgICAgICAgICAgIGVtYWlsOiB0aGlzLmVtYWlsLFxyXG4gICAgICAgICAgICBwYXNzd29yZDogdGhpcy5wYXNzXHJcbiAgICAgICAgfSkudGhlbih1c2VyID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodXNlcikpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRVc2VyID0gbmV3IFVzZXIodXNlci5hbm9ueW1vdXMsIHVzZXIuZW1haWwsIHVzZXIuZW1haWxWZXJpZmllZCwgdXNlci5uYW1lLCB1c2VyLnByb2ZpbGVJbWFnZVVSTCwgdXNlci5yZWZyZXNoVG9rZW4sIHVzZXIudWlkKTtcclxuICAgICAgICAgICAgZnJhbWUudG9wbW9zdCgpLm5hdmlnYXRlKHsgbW9kdWxlTmFtZTogXCJ3ZWxjb21lLXBhZ2VcIiwgY29udGV4dDogeyBjdXJyZW50VXNlcjogdGhpcy5jdXJyZW50VXNlciB9IH0pO1xyXG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoZXJyKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNyZWF0ZVVzZXIoKSB7XHJcbiAgICAgICAgZmlyZWJhc2UuY3JlYXRlVXNlcih7XHJcbiAgICAgICAgICAgIGVtYWlsOiB0aGlzLm5ld0VtYWlsLFxyXG4gICAgICAgICAgICBwYXNzd29yZDogdGhpcy5uZXdQYXNzXHJcbiAgICAgICAgfSkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInVzZXJpZDogXCIgKyByZXN1bHQua2V5KTtcclxuICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNyZWF0ZVVzZXIgZXJyb3I6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgZGlhbG9ncy5hbGVydChlcnIpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uUmVzZXRQYXNzd29yZCgpIHtcclxuICAgICAgICBmaXJlYmFzZS5yZXNldFBhc3N3b3JkKHtcclxuICAgICAgICAgICAgZW1haWw6IHRoaXMuZW1haWxcclxuICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgLy8gY2FsbGVkIHdoZW4gcGFzc3dvcmQgcmVzZXQgd2FzIHN1Y2Nlc3NmdWwsXHJcbiAgICAgICAgICAgIC8vIHlvdSBjb3VsZCBub3cgcHJvbXB0IHRoZSB1c2VyIHRvIGNoZWNrIGhpcyBlbWFpbFxyXG4gICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KFwiUGFzc3dvcmQgUmVzdCBpbnN0cnVjdGlvbnMgc2VuZCB0byBcIiArIHRoaXMuZW1haWwpO1xyXG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoZXJyKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNoYW5nZVBhc3N3b3JkKCkge1xyXG4gICAgICAgIGZpcmViYXNlLmNoYW5nZVBhc3N3b3JkKHtcclxuICAgICAgICAgICAgZW1haWw6IHRoaXMuZW1haWwsXHJcbiAgICAgICAgICAgIG9sZFBhc3N3b3JkOiAnbXlPbGRQYXNzd29yZCcsXHJcbiAgICAgICAgICAgIG5ld1Bhc3N3b3JkOiAnbXlOZXdQYXNzd29yZCdcclxuICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgLy8gY2FsbGVkIHdoZW4gcGFzc3dvcmQgY2hhbmdlIHdhcyBzdWNjZXNzZnVsXHJcbiAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgZGlhbG9ncy5hbGVydChlcnIpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8gVW5pdmVyc2FsIG1ldGhvZHNcclxuICAgIHB1YmxpYyBvbkxvZ291dCgpIHtcclxuICAgICAgICBmaXJlYmFzZS5sb2dvdXQoKVxyXG4gICAgICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGlhbG9ncy5hbGVydChcIkxvZ291dCBzdWNjc2Vzc2Z1bGwhXCIpO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGlhbG9ncy5hbGVydChlcnIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFNlbmRpbmcgYW4gXCJlbWFpbCBjb25maXJtYXRpb25cIiBlbWFpbCBjYW4gYmUgZG9uZSBhZnRlciB0aGUgdXNlciBsb2dnZWQgaW5cclxuICAgIHB1YmxpYyBvblNlbmRFbWFpbFZlcmlmaWNhdGlvbigpIHtcclxuICAgICAgICBmaXJlYmFzZS5zZW5kRW1haWxWZXJpZmljYXRpb24oKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFbWFpbCB2ZXJpZmljYXRpb24gc2VudFwiKTtcclxuICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHNlbmRpbmcgZW1haWwgdmVyaWZpY2F0aW9uOiBcIiArIGVycik7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyBJZiB5b3Ugd2FudCB0byBhdXRoZW50aWNhdGUgeW91ciB1c2VyIGZyb20geW91ciBiYWNrZW5kIHNlcnZlciB5b3UgY2FuIG9idGFpbiBhIEZpcmViYXNlIGF1dGggdG9rZW4gZm9yIHRoZSBjdXJyZW50bHkgbG9nZ2VkIGluIHVzZXIuXHJcbiAgICBwdWJsaWMgb25HZXRBdXRoVG9rZW4oKSB7XHJcbiAgICAgICAgZmlyZWJhc2UuZ2V0QXV0aFRva2VuKHtcclxuICAgICAgICAgICAgLy8gZGVmYXVsdCBmYWxzZSwgbm90IHJlY29tbWVuZGVkIHRvIHNldCB0byB0cnVlIGJ5IEZpcmViYXNlIGJ1dCBleHBvc2VkIGZvciB7Tn0gZGV2cyBub25ldGhlbGVzcyA6KVxyXG4gICAgICAgICAgICBmb3JjZVJlZnJlc2g6IGZhbHNlXHJcbiAgICAgICAgfSkudGhlbih0b2tlbiA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQXV0aCB0b2tlbiByZXRyaWV2ZWQ6IFwiICsgdG9rZW4pO1xyXG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQXV0aCB0b2tlbiByZXRyaWV2YWwgZXJyb3I6IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgZGlhbG9ncy5hbGVydChlcnIpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvLyBVSSBzcGVjaWZpY1xyXG4gICAgcHVibGljIG9uRm9ybVRvZ2dsZSgpIHtcclxuICAgICAgICB0aGlzLmlzRm9ybVZpc2libGUgPSAhdGhpcy5pc0Zvcm1WaXNpYmxlO1xyXG4gICAgfVxyXG59Il19