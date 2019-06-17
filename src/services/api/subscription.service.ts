import Subscription from "../../models/api/subscription.model";

export default class SubscriptionService {

    public static getSubscriptions(): Promise<any[]> {
        return new Promise((resolve, reject) => {

            Subscription.find({}).exec()
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error);
                });
        })
    }

    public static saveSubscriptionIfNotExists(subscription: any) {
        return new Promise((resolve, reject) => {

            Subscription.update(
                {endpoint: subscription.endpoint},
                {$setOnInsert: subscription},
                {upsert: true}
            ).exec()
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error);
                });

        })
    }
}
