import { Request, Response, NextFunction } from 'express';
import Subscription from './subscription.model';

export default class SubscriptionController {

    /**
     * Post Subscription
     * @param req
     * @param res
     * @param next
     */
    public static async postSubscription(req: Request, res: Response, next: NextFunction) {

        if (!SubscriptionController.isPostRequestValid(req, res)) {
            return;
        }

        SubscriptionController.saveIfNotExist(req.body)
            .then(result => {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({ data: { success: true } }));
            })
            .catch(err => {
                res.status(500);
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({
                    error: {
                        id: 'unable-to-save-subscription',
                        message: 'Subscription received but failed to save it'
                    }
                }));
            })
    }

    private static isPostRequestValid(req, res): boolean {
        if (!req.body || !req.body.endpoint) {
            res.status(400);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({
                error: {
                    id: 'no-endpoint',
                    message: 'Subscription must have an endpoint'
                }
            }));
            return false
        }
        return true
    }

    private static saveIfNotExist(subscription: any) {
        return new Promise((resolve, reject) => {

            Subscription.update(
                {endpoint: subscription.endpoint},
                {$setOnInsert: subscription},
                {upsert: true},
                (error, result) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    resolve(result);
                })
        })
    }
}
