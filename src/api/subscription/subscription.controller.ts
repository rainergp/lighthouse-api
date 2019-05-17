import { Request, Response, NextFunction } from 'express';

const fakeDatabase = [];

export default class SubscriptionController {

    /**
     * Post Subscription
     * @param req
     * @param res
     * @param next
     */
    public static async postSubscription(req: Request, res: Response, next: NextFunction) {
        const subscription = req.body;
        fakeDatabase.push(subscription);
        console.log('FakeDB: ', fakeDatabase);
    }
}
