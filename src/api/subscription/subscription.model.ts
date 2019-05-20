import { Schema, model } from 'mongoose';

let schema: Schema = new Schema({
    endpoint: String,
    keys: {
        auth: String,
        p256dh: String
    }
});

export default model('Subscription', schema);
