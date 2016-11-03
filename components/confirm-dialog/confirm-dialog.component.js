"use strict";
var core_1 = require('@angular/core');
var Subject_1 = require('rxjs/Subject');
var _1 = require('../../');
var ConfirmDialogComponent = (function () {
    function ConfirmDialogComponent() {
        this.title = 'Confirm';
        this.confirmString = 'Ok';
        this.denyString = 'Cancel';
        this.size = 's';
        this.result = new core_1.EventEmitter();
        this.dismiss = new core_1.EventEmitter();
        this._result$ = new Subject_1.Subject();
    }
    Object.defineProperty(ConfirmDialogComponent.prototype, "result$", {
        get: function () { return this._result$.asObservable(); },
        enumerable: true,
        configurable: true
    });
    ConfirmDialogComponent.prototype.confirm = function () {
        this._result$.next(true);
        this._result$.complete();
        this.result.emit({ target: this, result: true });
    };
    ConfirmDialogComponent.prototype.deny = function () {
        this._result$.next(false);
        this._result$.complete();
        this.result.emit({ target: this, result: false });
    };
    ConfirmDialogComponent.prototype.onClose = function () {
        this._result$.complete();
        this.dismiss.emit({ target: this });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ConfirmDialogComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ConfirmDialogComponent.prototype, "confirmString", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ConfirmDialogComponent.prototype, "denyString", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ConfirmDialogComponent.prototype, "content", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ConfirmDialogComponent.prototype, "size", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ConfirmDialogComponent.prototype, "result", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ConfirmDialogComponent.prototype, "dismiss", void 0);
    __decorate([
        core_1.ViewChild(_1.WindowViewContainerComponent), 
        __metadata('design:type', _1.WindowViewContainerComponent)
    ], ConfirmDialogComponent.prototype, "windowViewContainer", void 0);
    ConfirmDialogComponent = __decorate([
        core_1.Component({
            selector: 'confirm-dialog',
            template: "\n  <window-view-container [heading]=\"title\"\n                         [size]=\"size\"\n                         (close)=\"onClose()\">\n\n    <div class=\"confirm-dialog-content\">\n      {{ content }}\n      <ng-content></ng-content>\n    </div>\n\n    <div panel-footer class=\"confirm-dialog-button-set\">\n      <button class=\"btn btn-primary\" (click)=\"confirm()\">\n        {{ confirmString }}\n      </button>\n\n      <button class=\"btn btn-default\" (click)=\"deny()\">\n        {{ denyString }}\n      </button>\n    </div>\n\n  </window-view-container>\n  ",
            styles: ["\n  .confirm-dialog-content {\n    margin: 12px;\n  }\n  .confirm-dialog-button-set {\n    margin: 0 auto;\n    text-align: center;\n  }\n  "]
        }), 
        __metadata('design:paramtypes', [])
    ], ConfirmDialogComponent);
    return ConfirmDialogComponent;
}());
exports.ConfirmDialogComponent = ConfirmDialogComponent;
//# sourceMappingURL=confirm-dialog.component.js.map