import { Router, Request, Response, NextFunction } from 'express';
import SubscriptionController from './subscription.controller';

export class SubscriptionRouter {

    public router: Router;

    constructor() {

        // Set router
        this.router = Router();
        this.init();
    }

     // Init all routes in this router
    init() {
        this.router.post('/', SubscriptionController.postSubscription);
    }
}

// Create Router and export its configured Express.Router
const subscriptionRoutes = new SubscriptionRouter();
subscriptionRoutes.init();

export default subscriptionRoutes.router;
