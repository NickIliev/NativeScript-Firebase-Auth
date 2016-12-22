"use strict";
/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/
require("./bundle-config");
var app = require("application");
var firebase = require("nativescript-plugin-firebase");
var appSettings = require("application-settings");
firebase.init({
    onAuthStateChanged: function (data) {
        console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
        appSettings.setBoolean("loggedIn", data.loggedIn);
        if (data.loggedIn) {
            console.log("user's email address: " + (data.user.email ? data.user.email : "N/A"));
            console.log(JSON.stringify(data));
            appSettings.setString("username", data.user.email);
            appSettings.setString("name", data.user.name);
            appSettings.setString("uid", data.user.uid);
            appSettings.setString("profileImageURL", data.user.profileImageURL);
        }
    }
}).then(function (instance) {
    console.log("firebase.init done");
}).catch(function (err) {
    console.log("Firebase init error: " + err);
});
app.start({ moduleName: 'main-page' });
/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
//# sourceMappingURL=app.js.map