"use strict";
var core_1 = require('@angular/core');
var window_view_service_1 = require('../window-view.service');
var window_view_layer_service_1 = require('../window-view-layer.service');
var WindowViewContainerComponent = (function () {
    function WindowViewContainerComponent(windowView, windowViewLayer) {
        this.windowView = windowView;
        this.windowViewLayer = windowViewLayer;
        /**
         * Window title.
         *
         * Default: 'Untitled Window'
         */
        this.heading = 'Untitled Window';
        /**
         * Possible option:
         *  small, alias 's'
         *  middle, alias 'm'
         *  large, alias 'l'
         *  relative-small, alias 'rs'
         *  relative-middle, alias 'rm'
         *  relative-large, alias 'rl'
         *
         * Default: 'm'
         */
        this.size = 'M';
        /**
         * Prevent display transparent background.
         *
         * Default: true
         */
        this.showBackground = true;
        /**
         * Floating window, can be drag.
         *
         * Default: false
         */
        this.floating = false;
        /**
         * Panel class.
         *
         * Default: 'card-default'
         */
        this.panelClass = 'card-default';
        this.close = new core_1.EventEmitter();
        this.zIndex = 10;
        this.top = 0;
        this.left = 0;
        this.isMouseDown = false;
        this.isDragging = false;
        this.draggingRelativeLocation = { x: 0, y: 0 };
    }
    Object.defineProperty(WindowViewContainerComponent.prototype, "position", {
        get: function () { return { x: this.left, y: this.top }; },
        set: function (value) {
            this.top = value.y;
            this.left = value.x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowViewContainerComponent.prototype, "hideContainer", {
        get: function () { return this.floating && !!this.windowViewLayer; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowViewContainerComponent.prototype, "sizeClass", {
        get: function () {
            switch (this.size.toLowerCase()) {
                case 's':
                case 'small': return 'size-small';
                case 'm':
                case 'middle': return 'size-middle';
                case 'l':
                case 'large': return 'size-large';
                case 'rs':
                case 'relative-small': return 'size-relative-small';
                case 'rm':
                case 'relative-middle': return 'size-relative-middle';
                case 'rl':
                case 'relative-large': return 'size-relative-large';
            }
        },
        enumerable: true,
        configurable: true
    });
    WindowViewContainerComponent.prototype.ngOnInit = function () {
        if (typeof this.size !== 'string') {
            throw new Error('[WindowViewContainerComponent] property `size` has to be string.');
        }
        if (this.windowViewLayer) {
            this.windowViewLayer.add(this);
        }
    };
    WindowViewContainerComponent.prototype.ngOnDestroy = function () {
        if (this.windowViewLayer) {
            this.windowViewLayer.remove(this);
        }
    };
    WindowViewContainerComponent.prototype.closeWindow = function () {
        this.close.emit({ target: this });
        if (this.floating && this.windowViewLayer) {
            return;
        }
        if (this.windowView) {
            this.windowView.popWindow();
            return;
        }
    };
    WindowViewContainerComponent.prototype.onClickWindow = function () {
        if (this.floating && this.windowViewLayer) {
            this.windowViewLayer.bringToTop(this);
        }
    };
    WindowViewContainerComponent.prototype.onClickBackground = function ($event) {
        if ($event.currentTarget === $event.target) {
            this.closeWindow();
        }
    };
    WindowViewContainerComponent.prototype.onMouseDown = function (e) {
        this.isMouseDown = true;
        if (this.floating) {
            this.draggingRelativeLocation.x = e.offsetX;
            this.draggingRelativeLocation.y = e.offsetY;
        }
    };
    WindowViewContainerComponent.prototype.onMouseUp = function (e) {
        this.isMouseDown = false;
        this.isDragging = false;
    };
    WindowViewContainerComponent.prototype.onMouseMove = function (e) {
        if (this.isDragging) {
            this.left = e.clientX - this.draggingRelativeLocation.x;
            this.top = e.clientY - this.draggingRelativeLocation.y;
        }
        else if (this.isMouseDown && this.floating) {
            this.isDragging = true;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], WindowViewContainerComponent.prototype, "heading", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], WindowViewContainerComponent.prototype, "size", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], WindowViewContainerComponent.prototype, "showBackground", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], WindowViewContainerComponent.prototype, "floating", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], WindowViewContainerComponent.prototype, "panelClass", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], WindowViewContainerComponent.prototype, "close", void 0);
    WindowViewContainerComponent = __decorate([
        core_1.Component({
            selector: 'window-view-container',
            template: "\n  <div class=\"window-container\"\n       [class.floating]=\"floating\"\n       [class.fixed]=\"!floating\"\n       [class.hide-container]=\"hideContainer\"\n       [style.z-index]=\"zIndex\">\n    <div class=\"window-background\" (click)=\"onClickBackground($event)\" *ngIf=\"showBackground\"></div>\n    <div class=\"card {{ panelClass }} {{ sizeClass }}\"\n        [style.top]=\"top + 'px'\"\n        [style.left]=\"left + 'px'\"\n        (click)=\"onClickWindow()\">\n      <div class=\"card-heading\"\n          (mousedown)=\"onMouseDown($event)\"\n          (mouseup)=\"onMouseUp($event)\"\n          (mouseleave)=\"onMouseUp($event)\"\n          (mousemove)=\"onMouseMove($event)\">\n        {{ heading }}\n        <ng-content select=\"[panel-heading]\"></ng-content>\n        <a class=\"btn-close\" (click)=\"closeWindow()\"><i class=\"fa fa-times pull-right\" aria-hidden=\"true\"></i></a>\n      </div>\n      <div class=\"card-body\">\n        <ng-content></ng-content>\n      </div>\n      <div class=\"card-footer\">\n        <ng-content select=\"[panel-footer]\"></ng-content>\n      </div>\n    </div>\n  </div>\n  ",
            styles: ["\n  .window-container,\n  not(.hide-container) .window-background {\n    position: fixed;\n    overflow: auto;\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n  }\n\n  .window-container.hide-container {\n    width: 0;\n    height: 0;\n    overflow: initial;\n    width: inherit;\n    height: inherit;\n  }\n\n  not(.hide-container) .window-background {\n    background-color: rgba(0,0,0,0.6);\n    z-index: -1;\n  }\n\n  .window-container.fixed .card {\n    min-width: 20%;\n    margin: 4% auto;\n  }\n\n  .window-container.floating .card {\n    min-width: 20%;\n    position: fixed;\n    box-shadow: 0px 6px 24px grey;\n  }\n\n  .card.size-relative-large { width: 80%; }\n  .card.size-relative-middle { width: 60%; }\n  .card.size-relative-small { width: 40%; }\n  .card.size-large { width: 1080px; }\n  .card.size-middle { width: 720px; }\n  .card.size-small { width: 360px; }\n\n  .card-heading {\n    text-align: center;\n  }\n\n  .btn-close {\n    cursor: auto;\n  }\n\n  .window-container.floating .card-heading {\n    cursor: move;\n  }\n  "]
        }),
        __param(0, core_1.Optional()),
        __param(1, core_1.Optional()), 
        __metadata('design:paramtypes', [window_view_service_1.WindowViewService, window_view_layer_service_1.WindowViewLayerService])
    ], WindowViewContainerComponent);
    return WindowViewContainerComponent;
}());
exports.WindowViewContainerComponent = WindowViewContainerComponent;
//# sourceMappingURL=window-view-container.component.js.map