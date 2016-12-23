import { EventData, Observable } from 'data/observable';
import { Page } from "ui/page";
import * as appSettings from "application-settings";

import { User } from "./models/user";

export function onNavigatedTo(args: EventData) { 
    let page = <Page>args.object;

    page.bindingContext = page.navigationContext;
}