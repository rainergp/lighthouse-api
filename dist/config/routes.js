"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var report_router_1 = require("../api/report/report.router");
var Routes = /** @class */ (function () {
    function Routes(app) {
        // Set router
        this.router = express_1.Router();
        // Set app
        this.app = app;
        // Set all routes
        this.setAllRoutes();
    }
    // Set all app routes
    Routes.prototype.setAllRoutes = function () {
        // Your routes goes here
        this.app.use('/api/report', report_router_1.default);
        // Set main route for any other route found
        this.setMainRoute();
    };
    // Set main route, this route will be used for all other routes not found before
    Routes.prototype.setMainRoute = function () {
        // All other routes should redirect to the index.html
        this.app.route('/*').get(this.index);
    };
    // Main route
    Routes.prototype.index = function (req, res, next) {
        res.json({
            message: 'Hello World!'
        });
    };
    return Routes;
}());
exports.default = Routes;
//# sourceMappingURL=routes.js.map