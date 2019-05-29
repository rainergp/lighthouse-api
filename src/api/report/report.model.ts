import { Schema, model } from 'mongoose';

let schema: Schema = new Schema({
    id: Schema.Types.ObjectId,
    deviceType: String,
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

export default model('Report', schema);
