"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var subscription_controller_1 = require("./subscription.controller");
var SubscriptionRouter = /** @class */ (function () {
    function SubscriptionRouter() {
        // Set router
        this.router = express_1.Router();
        this.init();
    }
    // Init all routes in this router
    SubscriptionRouter.prototype.init = function () {
        this.router.post('/', subscription_controller_1.default.postSubscription);
    };
    return SubscriptionRouter;
}());
exports.SubscriptionRouter = SubscriptionRouter;
// Create Router and export its configured Express.Router
var subscriptionRoutes = new SubscriptionRouter();
subscriptionRoutes.init();
exports.default = subscriptionRoutes.router;
//# sourceMappingURL=subscription.router.js.map