import { Router, Request, Response, NextFunction } from 'express';
import ReportController from './report.controller';

export class ReportRouter {

    public router: Router;

    constructor() {

        // Set router
        this.router = Router();
        this.init();
    }

     // Init all routes in this router
    init() {
        // this.router.get('/', ReportController.getAll);
        // this.router.post('/', ReportController.create);
        this.router.get('/', ReportController.getReport);
    }
}

// Create Router and export its configured Express.Router
const reportRoutes = new ReportRouter();
reportRoutes.init();

export default reportRoutes.router;
