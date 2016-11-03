"use strict";
var core_1 = require('@angular/core');
var window_view_service_1 = require('../window-view.service');
var WindowViewOutletComponent = (function () {
    function WindowViewOutletComponent(viewContainerRef, windowView) {
        this.viewContainerRef = viewContainerRef;
        this.windowView = windowView;
    }
    WindowViewOutletComponent.prototype.ngAfterViewInit = function () {
        this.windowView.setOutlet(this.viewContainerRef);
    };
    WindowViewOutletComponent = __decorate([
        core_1.Component({
            selector: 'window-view-outlet',
            template: ''
        }), 
        __metadata('design:paramtypes', [core_1.ViewContainerRef, window_view_service_1.WindowViewService])
    ], WindowViewOutletComponent);
    return WindowViewOutletComponent;
}());
exports.WindowViewOutletComponent = WindowViewOutletComponent;
//# sourceMappingURL=window-view-outlet.component.js.map