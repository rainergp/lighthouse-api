import { Router, Request, Response, NextFunction } from 'express';
import ReportRouter from '../routes/api/report.router';
import SubscriptionRouter from "../routes/api/subscription.router";
import MediansReportRouter from "../routes/api/medians-report.router";

export default class Routes {

    public router: Router;
    private app;

    constructor(app) {

        // Set router
        this.router = Router();

        // Set app
        this.app = app;

        // Set all routes
        this.setAllRoutes();
    }

     // Set all app routes
    setAllRoutes() {

        // Your routes goes here
        this.app.use('/api/subscription', SubscriptionRouter);
        this.app.use('/api/report', ReportRouter);
        this.app.use('/api/medians', MediansReportRouter);

        // Set main route for any other route found
        this.setMainRoute();
    }

    // Set main route, this route will be used for all other routes not found before
    private setMainRoute() {

        // All other routes should redirect to the index.html
        this.app.route('/*').get(this.index);
    }

    // Main route
    private index(req: Request, res: Response, next: NextFunction) {
        res.json({
            message: 'Hello World!'
        });
    }
}
