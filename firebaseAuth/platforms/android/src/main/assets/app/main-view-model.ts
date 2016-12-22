import {Observable} from 'data/observable';
import * as firebase from "nativescript-plugin-firebase";
import * as frame from "ui/frame";

export class HelloWorldModel extends Observable {

    private _username: string;

    constructor() {
        super();
    }

    get username(): string {
        return this._username;
    }
    
    set username(value: string) {
        if (this._username !== value) {
            this._username = value;
            this.notifyPropertyChange('username', value)
        }
    }

    public onFacebookLogin() {
        firebase.login({
            type: firebase.LoginType.FACEBOOK,
            scope: ['public_profile', 'email'] // optional: defaults to ['public_profile', 'email']
        }).then(
            function (result) {
                console.log(JSON.stringify(result));
                frame.topmost().navigate("welcome-page");
            },
            function (errorMessage) {
                console.log(errorMessage);
            }
        );
    }
}
