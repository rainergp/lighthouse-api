"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var medians_report_model_1 = require("../../models/api/medians-report.model");
var MediansReportService = /** @class */ (function () {
    function MediansReportService() {
    }
    MediansReportService.saveMediansReportIfNotExists = function (data) {
        return new Promise(function (resolve, reject) {
            medians_report_model_1.default.update({ timestamp: data.timestamp }, { $setOnInsert: data }, { upsert: true }).exec()
                .then(function (result) {
                resolve(result);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    MediansReportService.getMediansReportsByDateRange = function (start, end) {
        return new Promise(function (resolve, reject) {
            medians_report_model_1.default.find({ fetchTime: { $gte: start, $lte: end } }).sort({ _id: -1 }).exec()
                .then(function (result) {
                resolve(result);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    return MediansReportService;
}());
exports.default = MediansReportService;
//# sourceMappingURL=medians-report.service.js.map