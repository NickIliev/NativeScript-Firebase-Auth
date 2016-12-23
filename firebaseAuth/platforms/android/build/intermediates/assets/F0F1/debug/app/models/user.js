"use strict";
var User = (function () {
    function User(anonymous, email, emailVerified, name, profileImageURL, refreshToken, uid) {
        this.anonymous = anonymous;
        this.email = email;
        this.emailVerified = emailVerified;
        this.name = name;
        this.profileImageURL = profileImageURL;
        this.refreshToken = refreshToken;
        this.uid = uid;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map