"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cron_1 = require("cron");
var CronService = /** @class */ (function () {
    function CronService() {
    }
    CronService.setCronJob = function (config, job) {
        new cron_1.CronJob(config, job, null, true, 'UTC', this);
    };
    return CronService;
}());
exports.default = CronService;
//# sourceMappingURL=cron.service.js.map