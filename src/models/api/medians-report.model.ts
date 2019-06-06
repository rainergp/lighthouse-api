import { Schema, model } from 'mongoose';

let schema: Schema = new Schema({
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

export default model('Medians_Report', schema);
