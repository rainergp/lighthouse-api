"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var report_model_1 = require("../../models/api/report.model");
var ReportService = /** @class */ (function () {
    function ReportService() {
    }
    ReportService.getReport = function () {
        return new Promise(function (resolve, reject) {
            report_model_1.default.find({}).sort({ _id: -1 }).limit(672).exec()
                .then(function (result) {
                resolve(result);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    ReportService.saveReport = function (data) {
        return new Promise(function (resolve, reject) {
            var report = new report_model_1.default(data);
            report.save()
                .then(function (result) {
                resolve(result);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    ReportService.getReportsByDateRange = function (start, end) {
        return new Promise(function (resolve, reject) {
            report_model_1.default.find({ fetchTime: { $gte: start, $lte: end } }).sort({ _id: -1 }).exec()
                .then(function (result) {
                resolve(result);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    return ReportService;
}());
exports.default = ReportService;
//# sourceMappingURL=report.service.js.map