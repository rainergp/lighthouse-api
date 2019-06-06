import { Request, Response, NextFunction } from 'express';
import SubscriptionService from "../../services/api/subscription.service";

export default class SubscriptionController {

    /**
     * Post Subscription
     * @param req
     * @param res
     * @param next
     */
    public static async postSubscription(req: Request, res: Response, next: NextFunction) {

        // SubscriptionService.getSubscriptions()
        //     .then(result=> {
        //         res.send(JSON.stringify(result))
        //     })
        //     .catch(error => {
        //         res.send(JSON.stringify(error))
        //     })

        if (!SubscriptionController.isPostRequestValid(req, res)) {
            return;
        }

        SubscriptionService.saveSubscriptionIfNotExists(req.body)
            .then(() => {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({ data: { success: true } }));
            })
            .catch(() => {
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
}
