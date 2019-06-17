"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var medians_report_service_1 = require("../../services/api/medians-report.service");
var report_service_1 = require("../../services/api/report.service");
var device_type_enum_1 = require("../../models/device-type.enum");
var MediansReportController = /** @class */ (function () {
    function MediansReportController() {
    }
    /**
     * Post Subscription
     * @param req
     * @param res
     * @param next
     */
    MediansReportController.postMediansReport = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                MediansReportController.getDailyMetricsMediansAndSaveData()
                    .then(function (result) {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify(result));
                })
                    .catch(function (error) {
                    res.status(500);
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify(error));
                });
                return [2 /*return*/];
            });
        });
    };
    MediansReportController.getDailyMetricsMediansAndSaveData = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var start, end, reportsList, mediansObject, mediansObject_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        start = moment.utc().subtract(1, 'days').startOf('day').format('YYYY-MM-DDTHH:mm:ss');
                        end = moment.utc().subtract(1, 'days').endOf('day').format('YYYY-MM-DDTHH:mm:ss');
                        reportsList = void 0;
                        mediansObject = void 0;
                        return [4 /*yield*/, report_service_1.default.getReportsByDateRangeAndDeviceType(start, end, device_type_enum_1.DeviceType.Desktop)];
                    case 1:
                        reportsList = _a.sent();
                        if (!(reportsList.length > 0)) return [3 /*break*/, 3];
                        mediansObject_1 = MediansReportController.parseDataAndBuildMediansObject(start, reportsList, device_type_enum_1.DeviceType.Desktop);
                        return [4 /*yield*/, medians_report_service_1.default.saveMediansReportIfNotExists(mediansObject_1)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, report_service_1.default.getReportsByDateRangeAndDeviceType(start, end, device_type_enum_1.DeviceType.Mobile)];
                    case 4:
                        reportsList = _a.sent();
                        if (!(reportsList.length > 0)) return [3 /*break*/, 6];
                        mediansObject = MediansReportController.parseDataAndBuildMediansObject(start, reportsList, device_type_enum_1.DeviceType.Mobile);
                        return [4 /*yield*/, medians_report_service_1.default.saveMediansReportIfNotExists(mediansObject)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        resolve(true);
                        return [3 /*break*/, 8];
                    case 7:
                        error_1 = _a.sent();
                        reject(error_1);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); });
    };
    MediansReportController.parseDataAndBuildMediansObject = function (timestamp, data, deviceType) {
        var idx = Math.floor(data.length / 2);
        var requestedUrl = data[0].requestedUrl;
        var performanceArr = [];
        var firstContentfulPaintArr = [];
        var firstMeaningfulPaintArr = [];
        var speedIndexArr = [];
        var firstCPUIdleArr = [];
        var interactiveArr = [];
        var estimatedInputLatencyArr = [];
        var maxPotentialFIDArr = [];
        data.forEach(function (item) {
            performanceArr.push(item.scores.performance);
            firstContentfulPaintArr.push(item.metrics.firstContentfulPaint.numericValue);
            firstMeaningfulPaintArr.push(item.metrics.firstMeaningfulPaint.numericValue);
            speedIndexArr.push(item.metrics.speedIndex.numericValue);
            firstCPUIdleArr.push(item.metrics.firstCPUIdle.numericValue);
            interactiveArr.push(item.metrics.interactive.numericValue);
            estimatedInputLatencyArr.push(item.metrics.estimatedInputLatency.numericValue);
            maxPotentialFIDArr.push(item.metrics.maxPotentialFID.numericValue);
        });
        return ({
            timestamp: timestamp,
            deviceType: deviceType,
            requestedUrl: requestedUrl,
            performance: Math.round(performanceArr.sort(function (n1, n2) { return n1 - n2; })[idx] * 100),
            firstContentfulPaint: parseFloat((firstContentfulPaintArr.sort(function (n1, n2) { return n1 - n2; })[idx] / 1000).toFixed(1)),
            firstMeaningfulPaint: parseFloat((firstMeaningfulPaintArr.sort(function (n1, n2) { return n1 - n2; })[idx] / 1000).toFixed(1)),
            speedIndex: parseFloat((speedIndexArr.sort(function (n1, n2) { return n1 - n2; })[idx] / 1000).toFixed(1)),
            firstCPUIdle: parseFloat((firstCPUIdleArr.sort(function (n1, n2) { return n1 - n2; })[idx] / 1000).toFixed(1)),
            interactive: parseFloat((interactiveArr.sort(function (n1, n2) { return n1 - n2; })[idx] / 1000).toFixed(1)),
            estimatedInputLatency: Math.round(estimatedInputLatencyArr.sort(function (n1, n2) { return n1 - n2; })[idx]),
            maxPotentialFID: Math.round(maxPotentialFIDArr.sort(function (n1, n2) { return n1 - n2; })[idx])
        });
    };
    return MediansReportController;
}());
exports.default = MediansReportController;
//# sourceMappingURL=medians-report.controller.js.map