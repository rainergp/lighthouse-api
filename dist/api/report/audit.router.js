"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var audit_controller_1 = require("./audit.controller");
var AuditRouter = /** @class */ (function () {
    /*--------  Constructor  --------*/
    function AuditRouter() {
        // 
        // Set router
        this.router = express_1.Router();
        this.init();
    }
    /*--------  Methods  --------*/
    /**
     * Init all routes in this router
     */
    AuditRouter.prototype.init = function () {
        this.router.get('/', audit_controller_1.default.getAll);
        this.router.post('/', audit_controller_1.default.create);
    };
    return AuditRouter;
}());
exports.AuditRouter = AuditRouter;
// 
// Create Router and export its configured Express.Router
var exampleRoutes = new AuditRouter();
exampleRoutes.init();
exports.default = exampleRoutes.router;
//# sourceMappingURL=audit.router.js.map