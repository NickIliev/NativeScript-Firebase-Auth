/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/
import "./bundle-config";
import * as app from 'application';
import * as appSettings from "application-settings";
import * as firebase from "nativescript-plugin-firebase";

firebase.init({
    onAuthStateChanged: function (data) { // optional but useful to immediately re-logon the user when he re-visits your app
        console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
        appSettings.setBoolean("loggedIn", data.loggedIn);

        if (data.loggedIn) {
            console.log("user's email address: " + (data.user.email ? data.user.email : "N/A"));
        }
    }
}).then(instance => {
    console.log("firebase.init done");
}).catch(err => {
    console.log("Firebase init error: " + err);
});

app.start({ moduleName: "main-page" });
/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
