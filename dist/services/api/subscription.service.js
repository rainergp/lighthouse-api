"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var subscription_model_1 = require("../../models/api/subscription.model");
var SubscriptionService = /** @class */ (function () {
    function SubscriptionService() {
    }
    SubscriptionService.getSubscriptions = function () {
        return new Promise(function (resolve, reject) {
            subscription_model_1.default.find({}).exec()
                .then(function (result) {
                resolve(result);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    SubscriptionService.saveSubscriptionIfNotExists = function (subscription) {
        return new Promise(function (resolve, reject) {
            subscription_model_1.default.update({ endpoint: subscription.endpoint }, { $setOnInsert: subscription }, { upsert: true }).exec()
                .then(function (result) {
                resolve(result);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    return SubscriptionService;
}());
exports.default = SubscriptionService;
//# sourceMappingURL=subscription.service.js.map