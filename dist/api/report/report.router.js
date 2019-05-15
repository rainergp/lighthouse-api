"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var report_controller_1 = require("./report.controller");
var ReportRouter = /** @class */ (function () {
    function ReportRouter() {
        // Set router
        this.router = express_1.Router();
        this.init();
    }
    // Init all routes in this router
    ReportRouter.prototype.init = function () {
        // this.router.get('/', ReportController.getAll);
        // this.router.post('/', ReportController.create);
        this.router.get('/', report_controller_1.default.getReport);
    };
    return ReportRouter;
}());
exports.ReportRouter = ReportRouter;
// Create Router and export its configured Express.Router
var reportRoutes = new ReportRouter();
reportRoutes.init();
exports.default = reportRoutes.router;
//# sourceMappingURL=report.router.js.map