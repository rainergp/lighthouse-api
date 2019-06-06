"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var medians_report_controller_1 = require("../../controllers/api/medians-report.controller");
var MediansReportRouter = /** @class */ (function () {
    function MediansReportRouter() {
        // Set router
        this.router = express_1.Router();
        this.init();
    }
    // Init all routes in this router
    MediansReportRouter.prototype.init = function () {
        this.router.post('/', medians_report_controller_1.default.postMediansReport);
    };
    return MediansReportRouter;
}());
exports.MediansReportRouter = MediansReportRouter;
// Create Router and export its configured Express.Router
var mediansReportRoutes = new MediansReportRouter();
mediansReportRoutes.init();
exports.default = mediansReportRoutes.router;
//# sourceMappingURL=medians-report.router.js.map