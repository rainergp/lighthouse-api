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
var ReportGenerator = require("lighthouse/lighthouse-core/report/report-generator");
var report_model_1 = require("../../models/api/report.model");
var device_type_enum_1 = require("../../models/device-type.enum");
var report_service_1 = require("../../services/api/report.service");
var lighthouse_service_1 = require("../../services/lighthouse.service");
var file_service_1 = require("../../services/file.service");
var notifications_service_1 = require("../../services/notifications.service");
var subscription_service_1 = require("../../services/api/subscription.service");
var moment = require("moment");
var ReportController = /** @class */ (function () {
    function ReportController() {
    }
    /**
     * Get Report
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    ReportController.getReport = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var start, end;
            return __generator(this, function (_a) {
                start = moment.utc().subtract(168, 'h').startOf('minutes').format('YYYY-MM-DDTHH:mm:ss');
                end = moment.utc().format('YYYY-MM-DDTHH:mm:ss');
                report_service_1.default.getReportsByDateRange(start, end)
                    .then(function (data) {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify({ data: data }));
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
    /**
     * Post Report
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    ReportController.postReport = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                ReportController.runLighthouseAndSaveData()
                    .then(function (data) {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify(data));
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
    ReportController.runLighthouseAndSaveData = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var lighthouseResults, urlsList, _a, _b, _c, _d, _e, _f, subscriptionsList, _g, error_1;
            var _this = this;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        _h.trys.push([0, 6, , 7]);
                        lighthouseResults = [];
                        urlsList = [
                            'https://www.celebritycruises.com',
                            'https://www.carnival.com',
                            'https://disneycruise.disney.go.com',
                            'https://www.hollandamerica.com',
                            'https://www.ncl.com',
                            'https://www.oceaniacruises.com',
                            'https://www.princess.com',
                            'https://www.royalcaribbean.com',
                            'https://www.vikingcruises.com',
                        ];
                        _b = (_a = lighthouseResults).push;
                        _c = {};
                        return [4 /*yield*/, lighthouse_service_1.default.launchHeadlessChromeAndRunLighthouse(device_type_enum_1.DeviceType.Desktop)];
                    case 1:
                        _b.apply(_a, [(_c.result = _h.sent(), _c.device = device_type_enum_1.DeviceType.Desktop, _c)]);
                        _e = (_d = lighthouseResults).push;
                        _f = {};
                        return [4 /*yield*/, lighthouse_service_1.default.launchHeadlessChromeAndRunLighthouse(device_type_enum_1.DeviceType.Mobile)];
                    case 2:
                        _e.apply(_d, [(_f.result = _h.sent(), _f.device = device_type_enum_1.DeviceType.Mobile, _f)]);
                        lighthouseResults.forEach(function (data) { return __awaiter(_this, void 0, void 0, function () {
                            var parsedData, saveReportResult, path, html;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        parsedData = ReportController.parseData(data);
                                        return [4 /*yield*/, report_service_1.default.saveReport(parsedData)];
                                    case 1:
                                        saveReportResult = _a.sent();
                                        path = "./src/public/reports/" + saveReportResult._doc._id.toString() + ".html";
                                        html = ReportGenerator.generateReport(data.result.lhr, 'html');
                                        return [4 /*yield*/, file_service_1.default.writeFile(path, html)];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, subscription_service_1.default.getSubscriptions()];
                    case 3:
                        subscriptionsList = _h.sent();
                        if (!(subscriptionsList && subscriptionsList.length > 0)) return [3 /*break*/, 5];
                        _g = resolve;
                        return [4 /*yield*/, notifications_service_1.default.sendNotifications(subscriptionsList)];
                    case 4:
                        _g.apply(void 0, [_h.sent()]);
                        _h.label = 5;
                    case 5:
                        resolve(true);
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _h.sent();
                        reject(error_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); });
    };
    ReportController.parseData = function (data) {
        var json = data.result.lhr;
        var firstContentfulPaint = json.audits['first-contentful-paint'], firstMeaningfulPaint = json.audits['first-meaningful-paint'], speedIndex = json.audits['speed-index'], firstCPUIdle = json.audits['first-cpu-idle'], interactive = json.audits['interactive'], estimatedInputLatency = json.audits['estimated-input-latency'], maxPotentialFID = json.audits['max-potential-fid'], categories = json.categories;
        return new report_model_1.default({
            deviceType: data.device,
            requestedUrl: json.requestedUrl,
            fetchTime: json.fetchTime,
            metrics: {
                firstContentfulPaint: {
                    score: firstContentfulPaint.score,
                    numericValue: firstContentfulPaint.numericValue,
                    displayValue: firstContentfulPaint.displayValue
                },
                firstMeaningfulPaint: {
                    score: firstMeaningfulPaint.score,
                    numericValue: firstMeaningfulPaint.numericValue,
                    displayValue: firstMeaningfulPaint.displayValue
                },
                speedIndex: {
                    score: speedIndex.score,
                    numericValue: speedIndex.numericValue,
                    displayValue: speedIndex.displayValue
                },
                firstCPUIdle: {
                    score: firstCPUIdle.score,
                    numericValue: firstCPUIdle.numericValue,
                    displayValue: firstCPUIdle.displayValue
                },
                interactive: {
                    score: interactive.score,
                    numericValue: interactive.numericValue,
                    displayValue: interactive.displayValue
                },
                estimatedInputLatency: {
                    score: estimatedInputLatency.score,
                    numericValue: estimatedInputLatency.numericValue,
                    displayValue: estimatedInputLatency.displayValue
                },
                maxPotentialFID: {
                    score: maxPotentialFID.score,
                    numericValue: maxPotentialFID.numericValue,
                    displayValue: maxPotentialFID.displayValue
                }
            },
            scores: {
                performance: categories['performance'].score,
                accessibility: categories['accessibility'].score,
                bestPractices: categories['best-practices'].score,
                SEO: categories['seo'].score,
                PWA: categories['pwa'].score
            }
        });
    };
    return ReportController;
}());
exports.default = ReportController;
//# sourceMappingURL=report.controller.js.map