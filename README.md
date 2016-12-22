# NativeScript-Firebase-FacebookAuth


Steps to implement facebook auth via firebase in NativeScrip app.

## Facebook console part
1. log in https://developers.facebook.com/apps/
2. go to Settings >> Basic and add Android platform
3. check **AppId** and **AppSecret** (will be needed in firebase console later) 
    AppId:      242365049527563
    AppSecret:  babeadab2f846955387c2836e2b37530

4. for **Google Play Package Name** add applicationId from your package.json (e.g. in this case `org.nativescript.firebaseAuth`)
5. for **Class Name** add `com.tns.NativeScriptActivity`
6. the final step is to add your **Key Hashes** (if you do not know them now, do not worry - we will add them at our final step!)

## Firebase console part
1. log in https://console.firebase.google.com
2. go to Authentication
3. enable Facebook Authentication
4. add AppID and AppSecret from the Facebook console
5. save all

## Project Steps
1. if you have previously included Firebase plugin delete the platforms folder (do not save your google-services.json as you will need newly generated one)
2. if you do not have the plugin install it with `tns plugin add nativescript-plugin-firebase`
3. open your `firebase.nativescript.json` and make sure that `"facebook_auth": true`
4. `tns platform add android`
5. generate your google-services.json from https://console.firebase.google.com  (make new one with the facebook enabled!!!)
6. paste google-services.json in `platforms/Android/`
7. go to `app/App_Resources/Android/AndroidManifest.xml` and add `<meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/facebook_app_id"/>` 
    Add it as a child of application on the activity level.

8. go to `app/App_Resources/Android/values` folder and create file called `facebooklogin.xml` with content
    ```
        <?xml version='1.0' encoding='utf-8'?>
        <resources>
            <string name="facebook_app_id">242365049527563</string>
        </resources>
    ```
    The value for `facebook_app_id` is your Facebook AppId

9. initialize firebase if not already done: 
    ```
        firebase.init({
            onAuthStateChanged: function (data) { // optional but useful to immediately re-logon the user when he re-visits your app
                console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
                if (data.loggedIn) {
                    console.log("user's email address: " + (data.user.email ? data.user.email : "N/A"));
                }
            },

        }).then(instance => {
            console.log("firebase.init done");
        }).catch(err => {
            console.log("Firebase init error: " + err);
        });
    ```

10. finally implement the login for Facebook
    ```
    firebase.login({
        type: firebase.LoginType.FACEBOOK,
        scope: ['public_profile', 'email'] // optional: defaults to ['public_profile', 'email']
    }).then(
        function (result) {
            console.log(JSON.stringify(result));

            frame.topmost().navigate("./views/drawer-page");
        },
        function (errorMessage) {
            console.log(errorMessage);
        }
    );
    ```

11. Remember those **Key Hashes** we need to set in Facebook console!? Well after your first attempt to login in,
    open `adb logcat` and look for something like Key hash <......> does not match any stored key hashes.
    Copy the hash key and paste it to the faceboook developer console. Voila!

    IN this case : rH+McZMWAbPrSFDCQjRsdyEYMoI=


### Possible issue:

Could not find com.google...

And there's this one: 
    ```
        Could not find com.google.firebase:firebase-auth:9.4.0. 
        ...
        Command /Users/niliev/Desktop/git-nick/NativeScript-Firebase-FacebookAuth/firebaseAuth/platforms/android/gradlew failed with exit code 1
    ```
That means making sure you have the latest Google Repository bits installed. 
Just run android from a command prompt and install any pending updates.

Also, an error like "Could not find com.google.firebase:firebase-core:9.0.0" can be caused by having more than one version of the Android SDK installed. 
Make sure ANDROID_HOME is set to the Android SDK directory that is being updated otherwise it will seem as though your updates have no effect.

e.g.:
`12-22 14:47:09.579: W/fb4a.BlueServiceQueue(10900): X.2Oo: [code] 404 [message]: Key hash hBkR5079MNgyiKSzf1x2/Tv0HjI= does not match any stored key hashes. (404) [extra]: null`
Key hash:  `hBkR5079MNgyiKSzf1x2/Tv0HjI=`
