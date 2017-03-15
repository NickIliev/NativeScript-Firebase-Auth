import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { AuthViewModel } from './view-models/auth-view-model';
import * as appSettings from "application-settings";

let vm = new AuthViewModel();

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;

    page.bindingContext = vm;
}