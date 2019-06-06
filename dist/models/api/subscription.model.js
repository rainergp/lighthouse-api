"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    endpoint: String,
    keys: {
        auth: String,
        p256dh: String
    }
});
exports.default = mongoose_1.model('Subscription', schema);
//# sourceMappingURL=subscription.model.js.map