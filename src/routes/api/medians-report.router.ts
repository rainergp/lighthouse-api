import { Router, Request, Response, NextFunction } from 'express';
import MediansReportController from '../../controllers/api/medians-report.controller';

export class MediansReportRouter {

    public router: Router;

    constructor() {

        // Set router
        this.router = Router();
        this.init();
    }

     // Init all routes in this router
    init() {
        this.router.post('/', MediansReportController.postMediansReport);
    }
}

// Create Router and export its configured Express.Router
const mediansReportRoutes = new MediansReportRouter();
mediansReportRoutes.init();

export default mediansReportRoutes.router;
