import { Observable } from 'data/observable';
import * as firebase from "nativescript-plugin-firebase";
import * as frame from "ui/frame";

export class ViewModel extends Observable {

    constructor() {
        super();
    }

    public onFacebookLogin() {
        firebase.login({
            type: firebase.LoginType.FACEBOOK,
            scope: ['public_profile', 'email'] // optional: defaults to ['public_profile', 'email']
        }).then(res => {
            // console.log(JSON.stringify(result));
            frame.topmost().navigate("welcome-page");
        }).catch(err => {
            console.log(err);
        })
    }

    public onGoogleLogin() {
        firebase.login({
            type: firebase.LoginType.GOOGLE,
        }).then(res => {
            console.log(JSON.stringify(res));
            frame.topmost().navigate("welcome-page");
        }).catch(err => {
            console.log(err);
        })
    }

    public onLogout() {
        firebase.logout();
    }
}
