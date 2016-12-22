import { EventData, Observable } from 'data/observable';
import { Page } from "ui/page";
import * as appSettings from "application-settings";

appSettings.getString("username");
appSettings.getString("name");
appSettings.getString("uid");
appSettings.getString("profileImageURL");

let vm = new Observable();

export function onNavigatedTo(args: EventData) { 
    let page = <Page>args.object;

    vm.set("username", appSettings.getString("username"));
    vm.set("name", appSettings.getString("name"));
    vm.set("uid", appSettings.getString("uid"));
    vm.set("profileImageURL", appSettings.getString("profileImageURL"));

    page.bindingContext = vm;
}