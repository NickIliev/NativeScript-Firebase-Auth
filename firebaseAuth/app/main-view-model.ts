import { Observable } from 'data/observable';
import * as firebase from "nativescript-plugin-firebase";
import * as frame from "ui/frame";
import { User } from "./models/user";

export class ViewModel extends Observable {

    private _user: User;
    public _isFormVisible: boolean;

    constructor() {
        super();

        this._isFormVisible = true;
    }

    public get isFormVisible() {
        return this._isFormVisible;
    }

    public set isFormVisible(value: boolean) {
        if (this._isFormVisible !== value) {
            this._isFormVisible = value;
            this.notifyPropertyChange("isFormVisible", value);
        }
    }

    public get user() {
        return this._user;
    }

    public set user(value: User) {
        if (this._user !== value) {
            this._user = value;
            this.notifyPropertyChange("user", value);
        }
    }

    public getCurrentUser() {
        firebase.getCurrentUser().then(user => {
            console.log("User uid: " + user.uid);
            // this.user = new User(user.anonymous, user.email, user.emailVerified, user.name, user.profileImageURL, user.refreshToken, user.uid);
        }).catch(err => {
            console.log("Trouble in paradise: " + err);
        })
    }

    // FACEBOOK login
    public onFacebookLogin() {
        firebase.login({
            type: firebase.LoginType.FACEBOOK,
            scope: ['public_profile', 'email'] // optional: defaults to ['public_profile', 'email']
        }).then(user => {
            console.log(JSON.stringify(user));
            this.user = new User(user.anonymous, user.email, user.emailVerified, user.name, user.profileImageURL, user.refreshToken, user.uid);
            frame.topmost().navigate({ moduleName: "welcome-page", context: { user: this.user } });
        }).catch(err => {
            console.log(err);
        })
    }

    // GOOGLE login
    public onGoogleLogin() {
        firebase.login({
            type: firebase.LoginType.GOOGLE,
        }).then(user => {
            console.log(JSON.stringify(user));
            this.user = new User(user.anonymous, user.email, user.emailVerified, user.name, user.profileImageURL, user.refreshToken, user.uid);
            frame.topmost().navigate({ moduleName: "welcome-page", context: { user: this.user } });
        }).catch(err => {
            console.log(err);
        })
    }

    // ANONYMOUS login
    public onAnonymousLogin() {
        firebase.login({
            type: firebase.LoginType.ANONYMOUS
        }).then(user => {
            console.log("User uid: " + user.uid);
        }, (error) => {
            console.log("Trouble in paradise: " + error);
        });
    }

    // PASSWORD login
    public onPasswordLogin() {
        firebase.login({
            type: firebase.LoginType.PASSWORD,
            email: "ala@bala.com",
            password: "123456"
        }).then(user => {
            console.log(JSON.stringify(user));
            this.user = new User(user.anonymous, user.email, user.emailVerified, user.name, user.profileImageURL, user.refreshToken, user.uid);
            frame.topmost().navigate({ moduleName: "welcome-page", context: { user: this.user } });
        }).catch(err => {
            console.log(err);
        })
    }

    public onCreateUser() {
        firebase.createUser({
            email: "ala@bala.com",
            password: "123456"
        }).then(result => {
            console.log("userid: " + result.key);
        }).catch(err => {
            console.log("createUser error: " + err);
        })
    }

    public onRestPassword() {
        firebase.resetPassword({
            email: 'useraccount@provider.com'
        }).then(() => {
            // called when password reset was successful,
            // you could now prompt the user to check his email
        }).catch(err => {
            console.log(err);
        })
    }

    public onChangePassword() {
        firebase.changePassword({
            email: 'useraccount@provider.com',
            oldPassword: 'myOldPassword',
            newPassword: 'myNewPassword'
        }).then(() => {
            // called when password change was successful
        }).catch(err => {
            console.log(err);
        })
    }

    // Universal logout
    public onLogout() {
        firebase.logout();
    }

    public onFormToggle() {
        this.isFormVisible = !this.isFormVisible;
    }
}
