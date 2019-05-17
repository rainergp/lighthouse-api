"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var DeviceType = {
    DESKTOP: 'desktop',
    MOBILE: 'mobile',
};
var schema = new mongoose_1.Schema({
    id: mongoose_1.Schema.Types.ObjectId,
    deviceType: DeviceType,
    requestedUrl: String,
    fetchTime: Date,
    json: String,
    metrics: {
        firstContentfulPaint: { score: Number, numericValue: Number, displayValue: String },
        firstMeaningfulPaint: { score: Number, numericValue: Number, displayValue: String },
        speedIndex: { score: Number, numericValue: Number, displayValue: String },
        firstCPUIdle: { score: Number, numericValue: Number, displayValue: String },
        interactive: { score: Number, numericValue: Number, displayValue: String },
        estimatedInputLatency: { score: Number, numericValue: Number, displayValue: String },
        maxPotentialFID: { score: Number, numericValue: Number, displayValue: String }
    },
    scores: {
        performance: Number,
        accessibility: Number,
        bestPractices: Number,
        SEO: Number,
        PWA: Number
    }
});
exports.default = mongoose_1.model('Report', schema);
//# sourceMappingURL=subscription.model.js.map