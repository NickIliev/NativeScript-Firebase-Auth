# Firebase authentication in NativeScript

This POC application demonstrates how to use Firebase authentication methods.
Everything is setup in the master branch to work with debug build.
Currently implemented authentication methods:
 - Facebook
 - Google
 - email / password based login
 - anonymious login

To enable Firebase authentication in your own project follow the steps below.

## Facebook authentication

### Facebook console part
Steps to implement facebook auth via Firebase in NativeScrip app.

1. log in https://developers.facebook.com/apps/
2. go to Settings >> Basic and add Android platform
3. check **AppId** and **AppSecret** (will be needed in firebase console later) 
    example AppId:      123456789123456
    example AppSecret:  xxyyzzccvvbb6955387c2836e2b37530

4. for **Google Play Package Name** add applicationId from your package.json (e.g. in this case `org.nativescript.firebaseAuth`)
5. for **Class Name** add `com.tns.NativeScriptActivity`
6. the final step is to add your **Key Hashes** (if you do not know them now, do not worry - we will add them at our final step!)

### Firebase console part
1. log in https://console.firebase.google.com
2. go to Authentication
3. enable Facebook Authentication
4. add AppID and AppSecret from the Facebook console
5. save all

### Project Steps
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
    <string name="facebook_app_id">123456789123456</string>
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
    },
    function (errorMessage) {
        console.log(errorMessage);
    }
);
```

11. Remember those **Key Hashes** we need to set in Facebook console!? Well after your first attempt to login in,
    open `adb logcat` and look for something like Key hash <......> does not match any stored key hashes.
    Copy the hash key and paste it to the faceboook developer console. Voila!

    example key hash : rH+McZXCVPZXCVCZXCVdyEYMoI=


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


## Google authentication
Steps to implement Google auth via Firebase in NativeScrip app.

### Firebase Console Steps

1. log in https://console.firebase.google.com
2. go to Authentication
3. enable Google Authentication + enable Web SDK configuration in the same tab
4. Go to **Overview** >> **Project Settings** and add SHA1 certificate
    - to generate SHA1 certificate go to https://developers.google.com/android/guides/client-auth
        
        example SHA1 : 84:19:xx:yy:zz:vv:bb:D8:32:88:A4:B3:7F:5C:76:FD:3B:F4:1E:32

    > Note: You can generate debug and release certificate fingerprints. To create release certificate you will need generate keystore file and its name

### Project Steps

1. Go through steps 1-6 from *Facebook* >> *Project Steps* and make sure everything is done (for step 3 look for `google_auth: true`)
2. If you haven't initialized firebase yet, then go through step 9 from *Facebook* >> *Project Steps*

```
public onGoogleLogin() {
    firebase.login({
        type: firebase.LoginType.GOOGLE,
    }).then(res => {
        console.log(JSON.stringify(res));
    }).catch(err => {
        console.log(err);
    })
}
```

## Email-Password based authentication

### Firebase Console Steps

- In your Firebase console enable sign-in method "Email/Password"
- Firebase has automatic guards for validation of emails and will return error if invalid email is provided
- Paswword mandatory minimum length is 6 characters
- Multiple accounts per email address can resolve smae user loggin with Facebook, Google and emaul using the same credentials for emaul (account linking).


### Code samples for email/password based login

```
public onPasswordLogin() {
    firebase.login({
        type: firebase.LoginType.PASSWORD,
        email: this.email,
        password: this.pass
    }).then(user => {
        console.log(JSON.stringify(user));
        this.currentUser = new User(user.anonymous, user.email, user.emailVerified, user.name, user.profileImageURL, user.refreshToken, user.uid);
        frame.topmost().navigate({ moduleName: "welcome-page", context: { currentUser: this.currentUser } });
    }).catch(err => {
        console.log(err);
        dialogs.alert(err);
    })
}

public onCreateUser() {
    firebase.createUser({
        email: this.newEmail,
        password: this.newPass
    }).then(result => {
        console.log("userid: " + result.key);
    }).catch(err => {
        console.log("createUser error: " + err);
        dialogs.alert(err);
    })
}

public onResetPassword() {
    firebase.resetPassword({
        email: this.email
    }).then(() => {
        // called when password reset was successful,
        // you could now prompt the user to check his email
        dialogs.alert("Password Rest instructions send to " + this.user);
    }).catch(err => {
        console.log(err);
        dialogs.alert(err);
    })
}

public onChangePassword() {
    firebase.changePassword({
        email: this.email,
        oldPassword: 'myOldPassword',
        newPassword: 'myNewPassword'
    }).then(() => {
        // called when password change was successful
    }).catch(err => {
        console.log(err);
        dialogs.alert(err);
    })
}
```

### Anonymious authentication

- enable anonymious sign-in method in firebase console

```
// ANONYMOUS login
public onAnonymousLogin() {
    firebase.login({
        type: firebase.LoginType.ANONYMOUS
    }).then(user => {
        console.log(JSON.stringify(user));
        this.currentUser = new User(user.anonymous, user.email, user.emailVerified, user.name, user.profileImageURL, user.refreshToken, user.uid);
        frame.topmost().navigate({ moduleName: "welcome-page", context: { currentUser: this.currentUser } });
    }).catch(err => {
        console.log("Trouble in paradise: " + err);
        dialogs.alert(err);
    })
}
```

