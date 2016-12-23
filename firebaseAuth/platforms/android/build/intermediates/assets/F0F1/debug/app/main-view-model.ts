import { Observable } from 'data/observable';
import * as firebase from "nativescript-plugin-firebase";
import * as frame from "ui/frame";

import { User } from "./models/user";

export class ViewModel extends Observable {

    private _user: User;

    private _email: string;
    private _pass: string;

    private _newEmail: string;
    private _newPass: string;
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

    public get email() {
        return this._email;
    }

    public set email(value: string) {
        if (this._email !== value) {
            this._email = value;
            this.notifyPropertyChange("email", value);
        }
    }

    public get pass() {
        return this._pass;
    }

    public set pass(value: string) {
        if (this._pass !== value) {
            this._pass = value;
            this.notifyPropertyChange("pass", value);
        }
    }     

    public get newEmail() {
        return this._newEmail;
    }

    public set newEmail(value: string) {
        if (this._newEmail !== value) {
            this._newEmail = value;
            this.notifyPropertyChange("newEmail", value);
        }
    }

    public get newPass() {
        return this._newPass;
    }

    public set newPass(value: string) {
        if (this._newPass !== value) {
            this._newPass = value;
            this.notifyPropertyChange("newPass", value);
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

    public onFacebookLogin() {
        firebase.login({
            type: firebase.LoginType.FACEBOOK,
            scope: ['public_profile', 'email'] // optional: defaults to ['public_profile', 'email']
        }).then(user => {
            console.log(JSON.stringify(user));
            this.user = new User(user.anonymous, user.email, user.emailVerified, user.name, user.profileImageURL, user.refreshToken, user.uid);
            frame.topmost().navigate({ moduleName: "welcome-page", context: { user: this.user}});
        }).catch(err => {
            console.log(err);
        })
    }

    public onGoogleLogin() {
        firebase.login({
            type: firebase.LoginType.GOOGLE,
        }).then(user => {
            console.log(JSON.stringify(user));
            this.user = new User(user.anonymous, user.email, user.emailVerified, user.name, user.profileImageURL, user.refreshToken, user.uid);
            frame.topmost().navigate({ moduleName: "welcome-page", context: { user: this.user}});
        }).catch(err => {
            console.log(err);
        })
    }

    public onPasswordLogin() {
        firebase.login({
            type: firebase.LoginType.PASSWORD,
            email: "ala@bala.com",
            password: "123456"
        }).then(user => {
            console.log(JSON.stringify(user));
            this.user = new User(user.anonymous, user.email, user.emailVerified, user.name, user.profileImageURL, user.refreshToken, user.uid);
            frame.topmost().navigate({ moduleName: "welcome-page", context: { user: this.user}});
        }).catch(err => {
            console.log(err);
        })
    }

    public onCreateUser() {
        firebase.createUser({
            email: "ala@bala.com",
            password: "123456"
        }).then(
            function (result) {
                console.log("userid: " + result.key);
            },
            function (err) {
                console.log(err);
            }
        );
    }

    public onLogout() {
        firebase.logout();
    }

    public onFormToggle() {
        this.isFormVisible = !this.isFormVisible;
    }
}
