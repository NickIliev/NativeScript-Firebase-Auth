"use strict";
var auth_view_model_1 = require("./view-models/auth-view-model");
var vm = new auth_view_model_1.AuthViewModel();
function navigatingTo(args) {
    var page = args.object;
    page.bindingContext = vm;
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map