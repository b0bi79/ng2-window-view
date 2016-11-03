"use strict";
var core_1 = require('@angular/core');
var _1 = require('../');
var confirm_dialog_component_1 = require('./confirm-dialog/confirm-dialog.component');
var WindowViewComponentModule = (function () {
    function WindowViewComponentModule() {
    }
    WindowViewComponentModule = __decorate([
        core_1.NgModule({
            imports: [
                _1.WindowViewModule
            ],
            declarations: [
                confirm_dialog_component_1.ConfirmDialogComponent
            ],
            exports: [
                confirm_dialog_component_1.ConfirmDialogComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], WindowViewComponentModule);
    return WindowViewComponentModule;
}());
exports.WindowViewComponentModule = WindowViewComponentModule;
//# sourceMappingURL=window-view-components.module.js.map