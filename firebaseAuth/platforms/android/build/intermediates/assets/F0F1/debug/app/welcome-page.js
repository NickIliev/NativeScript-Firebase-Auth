"use strict";
function onNavigatedTo(args) {
    var page = args.object;
    page.bindingContext = page.navigationContext;
}
exports.onNavigatedTo = onNavigatedTo;
//# sourceMappingURL=welcome-page.js.map