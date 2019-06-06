"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    timestamp: Date,
    deviceType: String,
    requestedUrl: String,
    performance: Number,
    firstContentfulPaint: Number,
    firstMeaningfulPaint: Number,
    speedIndex: Number,
    firstCPUIdle: Number,
    interactive: Number,
    estimatedInputLatency: Number,
    maxPotentialFID: Number
});
exports.default = mongoose_1.model('Medians_Report', schema);
//# sourceMappingURL=medians-report.model.js.map