"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var window_view_container_component_1 = require('./window-view-container/window-view-container.component');
var window_view_outlet_component_1 = require('./window-view-outlet/window-view-outlet.component');
var window_view_service_1 = require('./window-view.service');
var window_view_layer_service_1 = require('./window-view-layer.service');
var WindowViewModule = (function () {
    function WindowViewModule() {
    }
    WindowViewModule.forRoot = function () {
        return {
            ngModule: WindowViewModule,
            providers: [window_view_service_1.WindowViewService, window_view_layer_service_1.WindowViewLayerService],
        };
    };
    WindowViewModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            declarations: [
                window_view_container_component_1.WindowViewContainerComponent,
                window_view_outlet_component_1.WindowViewOutletComponent
            ],
            exports: [
                window_view_container_component_1.WindowViewContainerComponent,
                window_view_outlet_component_1.WindowViewOutletComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], WindowViewModule);
    return WindowViewModule;
}());
exports.WindowViewModule = WindowViewModule;
//# sourceMappingURL=window-view.module.js.map