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
var ChromeLauncher = require("chrome-launcher");
var Lighthouse = require("lighthouse");
var ReportGenerator = require("lighthouse/lighthouse-core/report/report-generator");
var fs = require("fs");
var ReportController = /** @class */ (function () {
    function ReportController() {
    }
    /**
     * Get all
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    // public static async getAll(req: Request, res: Response, next: NextFunction) {
    //
    //     try {
    //
    //         //
    //         // Get data
    //         let result = await Model.find().exec();
    //
    //         //
    //         // Response
    //         res.send({
    //             message: 'it works! We got all examples',
    //             result: result
    //         });
    //     } catch (err) {
    //
    //         //
    //         // Error response
    //         res.send({
    //             message: 'Could not get Examples',
    //             err: err
    //         });
    //     }
    // }
    /**
     * Create
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    // public static async create(req: Request, res: Response, next: NextFunction) {
    //
    //     //
    //     // Create model
    //     let model = new Model({
    //         title: 'Test title',
    //         subtitle: 'test subtitle'
    //     });
    //
    //     //
    //     // Save
    //     await model.save();
    //
    //     res.send({
    //         message: 'Created!',
    //         model: model
    //     });
    // }
    /**
     * Create
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    ReportController.subscribe = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res.json('{"response": "subscribe"}');
                return [2 /*return*/];
            });
        });
    };
    /**
     * Create
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    ReportController.getReport = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // const flags = {
                //     logLevel: 'info',
                //     chromeFlags: ['--headless', '--no-sandbox', '--disable-setuid-sandbox'],
                //     throttlingMethod: 'provided',
                //     disableDeviceEmulation: false,
                //     emulatedFormFactor: 'desktop'
                //
                //     // onlyCategories: ['performance']
                // };
                // /** @type {LH.Config.Json} */
                // const config = {
                // 	extends: 'lighthouse:default',
                // settings: {
                // 	maxWaitForLoad: 35 * 1000,
                // 	emulatedFormFactor: 'desktop',
                // 	throttling: {
                // 		rttMs: 40,
                // 		throughputKbps: 10 * 1024,
                // 		cpuSlowdownMultiplier: 1,
                // 	},
                // 	skipAudits: ['uses-http2'],
                // },
                // audits: [0000
                // 	{path: 'metrics/first-contentful-paint', options: {scorePODR: 800, scoreMedian: 1600}},
                // 	{path: 'metrics/first-meaningful-paint', options: {scorePODR: 800, scoreMedian: 1600}},
                // 	{path: 'metrics/speed-index', options: {scorePODR: 1100, scoreMedian: 2300}},
                // 	{path: 'metrics/interactive', options: {scorePODR: 2000, scoreMedian: 4500}},
                // 	{path: 'metrics/first-cpu-idle', options: {scorePODR: 2000, scoreMedian: 4500}},
                // ],
                // };
                // LighthouseLogger.setLevel(flags.logLevel);
                //
                // ReportController.prototype.launchChromeAndRunLighthouse('https://www.celebritycruises.com', flags).then(result => {
                //     res.json(result)
                // });
                res.json('{"response": "report"}');
                return [2 /*return*/];
            });
        });
    };
    ReportController.prototype.launchChromeAndRunLighthouse = function (url, flags, config) {
        if (config === void 0) { config = null; }
        return ChromeLauncher.launch({ chromeFlags: flags.chromeFlags }).then(function (chrome) {
            flags.port = chrome.port;
            return Lighthouse(url, flags, config).then(function (results) {
                // use results.lhr for the JS-consumable output
                // use results.report for the HTML/JSON/CSV output as a string
                // use results.artifacts for the trace/screenshots/other specific case you need (rarer)
                var id = './reports/test';
                var utcTimestamp = new Date().getTime();
                var filename = id + "-" + utcTimestamp + ".html";
                var html = ReportGenerator.generateReport(results.lhr, 'html');
                fs.writeFile(filename, html, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });
                return chrome.kill().then(function () { return results.lhr; });
            });
        });
    };
    return ReportController;
}());
exports.default = ReportController;
//# sourceMappingURL=report.controller.js.map