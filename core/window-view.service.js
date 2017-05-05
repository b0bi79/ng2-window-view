"use strict";
var core_1 = require('@angular/core');
var Subject_1 = require('rxjs/Subject');
var window_view_component_cache_1 = require('./window-view.component-cache');
var WindowViewService = (function () {
    function WindowViewService(cfr, compiler, injector) {
        this.cfr = cfr;
        this.compiler = compiler;
        this.injector = injector;
        this.cachedComponentFactories = window_view_component_cache_1.WindowViewComponentCache.getInstance();
        this.stack = [];
        this._length$ = new Subject_1.Subject();
        this._open$ = new Subject_1.Subject();
        this._close$ = new Subject_1.Subject();
    }
    Object.defineProperty(WindowViewService.prototype, "length", {
        get: function () { return this.stack.length; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowViewService.prototype, "length$", {
        /**
         * Current window's count.
         */
        get: function () { return this._length$.asObservable(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowViewService.prototype, "open$", {
        /**
         * Emit after window open.
         */
        get: function () { return this._open$.asObservable(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowViewService.prototype, "close$", {
        /**
         * Emit before window close.
         */
        get: function () { return this._close$.asObservable(); },
        enumerable: true,
        configurable: true
    });
    WindowViewService.prototype.setOutlet = function (outlet) {
        if (!!this.outlet) {
            throw new Error('[WindowViewService] setOutlet error. Multiple window-view-outlet');
        }
        this.outlet = outlet;
    };
    WindowViewService.prototype.getInstanceAt = function (index) {
        return (this.stack[index]) ? this.stack[index].instance : null;
    };
    WindowViewService.prototype.add = function (componentRef) {
        this.stack.push(componentRef);
        this._open$.next(componentRef.instance);
        this._length$.next(this.stack.length);
    };
    WindowViewService.prototype.remove = function (componentRef) {
        if (!this.canCloseWindowView(componentRef)) {
            return false;
        }
        var index = this.stack.indexOf(componentRef);
        this.stack.splice(index, 1);
        this._close$.next(componentRef.instance);
        this._length$.next(this.stack.length);
        componentRef.destroy();
        return true;
    };
    WindowViewService.prototype.removeByInstance = function (instance) {
        var removedComponentRef = this.stack.find(function (componentRef) {
            return componentRef.instance === instance;
        });
        return this.remove(removedComponentRef);
    };
    /**
     * Add window to top.
     *
     * The component type have to registry on entryComponents of module.
     * Or provide component factory directly.
     */
    WindowViewService.prototype.pushWindow = function (componentType, useCache) {
        if (useCache === void 0) { useCache = false; }
        if (!this.outlet) {
            throw new Error('[WindowViewService] pushWindow error. Not found window-view-outlet');
        }
        var factory;
        if (componentType instanceof core_1.ComponentFactory) {
            factory = componentType;
        }
        else {
            if (useCache) {
                factory = this.cachedComponentFactories.get(componentType);
            }
            if (!factory) {
                factory = this.cfr.resolveComponentFactory(componentType);
            }
        }
        var componentRef = this.outlet.createComponent(factory);
        this.add(componentRef);
        return componentRef.instance;
    };
    /**
     * Compile module and get component factory from it and do push window.
     *
     * About third parameter `cached`.
     * In usual case, module has been cached by angular, you don't need to concern about it.
     * But, if module is created on the fly, angular can't not cached it and always compile everytime.
     * In addition to this, repeatly creating module on the fly with declare same component is invalid,
     * resolving those problem by caching component factory.
     */
    WindowViewService.prototype.pushDynamicWindow = function (moduleType, componentType, cached) {
        var _this = this;
        if (cached === void 0) { cached = false; }
        if (cached && this.cachedComponentFactories.has(componentType)) {
            return Promise.resolve().then(function () { return _this.pushWindow(componentType, true); });
        }
        return this.compiler.compileModuleAsync(moduleType).then(function (moduleFactory) {
            var moduleRef = moduleFactory.create(_this.injector);
            var componentFactory = moduleRef
                .componentFactoryResolver
                .resolveComponentFactory(componentType);
            if (cached) {
                _this.cachedComponentFactories.set(componentType, componentFactory);
            }
            return _this.pushWindow(componentFactory);
        });
    };
    /**
     *
     */
    WindowViewService.prototype.pushBareDynamicWindow = function (componentType, options) {
        if (options === void 0) { options = {}; }
        var moduleMetadataParams = {
            id: options.id,
            declarations: options.declarations || [],
            entryComponents: [componentType],
            imports: options.imports || [],
            providers: options.providers
        };
        if (moduleMetadataParams.declarations.indexOf(componentType) < 0) {
            moduleMetadataParams.declarations.push(componentType);
        }
        var WindowViewModule = require('./window-view.module').WindowViewModule;
        if (moduleMetadataParams.imports.indexOf(WindowViewModule) < 0) {
            moduleMetadataParams.imports.push(WindowViewModule);
        }
        var moduleMetadata = core_1.NgModule(moduleMetadataParams);
        var moduleType = moduleMetadata((function () {
            function class_1() {
            }
            return class_1;
        }()));
        return this.pushDynamicWindow(moduleType, componentType, true);
    };
    /**
     * Remove latest window.
     */
    WindowViewService.prototype.popWindow = function () {
        if (this.stack.length === 0) {
            return false;
        }
        var componentRef = this.stack[this.stack.length - 1];
        return this.remove(componentRef);
    };
    WindowViewService.prototype.clearCache = function () {
        this.cachedComponentFactories.clear();
    };
    WindowViewService.prototype.canCloseWindowView = function (componentRef) {
        if (typeof componentRef.instance.windowViewCanClose !== 'function') {
            return true;
        }
        return componentRef.instance.windowViewCanClose();
    };
    WindowViewService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [core_1.ComponentFactoryResolver, core_1.Compiler, core_1.Injector])
    ], WindowViewService);
    return WindowViewService;
}());
exports.WindowViewService = WindowViewService;
//# sourceMappingURL=window-view.service.js.map