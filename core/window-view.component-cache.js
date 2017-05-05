"use strict";
var WindowViewComponentCache = (function (_super) {
    __extends(WindowViewComponentCache, _super);
    function WindowViewComponentCache() {
        if (!WindowViewComponentCache.isCreating) {
            throw new Error("You can't call new in Singleton instances! Call WindowViewComponentCache.getInstance() instead.");
        }
        _super.call(this);
    }
    WindowViewComponentCache.getInstance = function () {
        if (WindowViewComponentCache.instance == null) {
            WindowViewComponentCache.isCreating = true;
            WindowViewComponentCache.instance = new Map();
            WindowViewComponentCache.instance['__proto__'] = WindowViewComponentCache.prototype;
            WindowViewComponentCache.isCreating = false;
        }
        return WindowViewComponentCache.instance;
    };
    WindowViewComponentCache.isCreating = false;
    return WindowViewComponentCache;
}(Map));
exports.WindowViewComponentCache = WindowViewComponentCache;
//# sourceMappingURL=window-view.component-cache.js.map