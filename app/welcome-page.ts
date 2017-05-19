import { EventData } from 'data/observable';
import { Page } from 'ui/page';

export function onNavigatedTo(args: EventData) {
    let page = <Page>args.object;

    page.bindingContext = page.navigationContext;
}