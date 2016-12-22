"use strict";
var observable_1 = require("data/observable");
var appSettings = require("application-settings");
appSettings.getString("username");
appSettings.getString("name");
appSettings.getString("uid");
appSettings.getString("profileImageURL");
var vm = new observable_1.Observable();
function onNavigatedTo(args) {
    var page = args.object;
    vm.set("username", appSettings.getString("username"));
    vm.set("name", appSettings.getString("name"));
    vm.set("uid", appSettings.getString("uid"));
    vm.set("profileImageURL", appSettings.getString("profileImageURL"));
    page.bindingContext = vm;
}
exports.onNavigatedTo = onNavigatedTo;
//# sourceMappingURL=welcome-page.js.map