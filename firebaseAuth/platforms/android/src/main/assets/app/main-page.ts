import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { ViewModel } from './main-view-model';
import * as appSettings from "application-settings";

let vm = new ViewModel();

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;

    page.bindingContext = vm;
}