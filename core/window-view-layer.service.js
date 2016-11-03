"use strict";
var core_1 = require('@angular/core');
var WindowViewLayerService = (function () {
    function WindowViewLayerService() {
        /**
         * Order index is same as z-index.
         */
        this.windowViewContainers = [];
        /**
         * Z-Index of controled window view container will
         * always start at it.
         */
        this.zIndexStartAt = 10;
    }
    WindowViewLayerService.prototype.add = function (windowViewContainer) {
        this._add(windowViewContainer);
        this.setAllWindowViewContainersZIndex();
    };
    WindowViewLayerService.prototype.remove = function (windowViewContainer) {
        this._remove(windowViewContainer);
        this.setAllWindowViewContainersZIndex();
    };
    WindowViewLayerService.prototype.bringToTop = function (windowViewContainer) {
        this._remove(windowViewContainer);
        this._add(windowViewContainer);
        this.setAllWindowViewContainersZIndex();
    };
    WindowViewLayerService.prototype._add = function (windowViewContainer) {
        this.windowViewContainers.push(windowViewContainer);
    };
    WindowViewLayerService.prototype._remove = function (windowViewContainer) {
        var index = this.windowViewContainers.indexOf(windowViewContainer);
        this.windowViewContainers.splice(index, 1);
    };
    WindowViewLayerService.prototype.setAllWindowViewContainersZIndex = function () {
        var _this = this;
        this.windowViewContainers.forEach(function (windowViewContainer, index) {
            return windowViewContainer.zIndex = _this.zIndexStartAt + index;
        });
    };
    WindowViewLayerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], WindowViewLayerService);
    return WindowViewLayerService;
}());
exports.WindowViewLayerService = WindowViewLayerService;
//# sourceMappingURL=window-view-layer.service.js.map