"use strict";
var main_view_model_1 = require("./main-view-model");
var vm = new main_view_model_1.ViewModel();
function navigatingTo(args) {
    var page = args.object;
    page.bindingContext = vm;
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map