"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChromeLauncher = require("chrome-launcher");
var Lighthouse = require("lighthouse");
var LighthouseLogger = require("lighthouse-logger");
var ReportGenerator = require("lighthouse/lighthouse-core/report/report-generator");
var LighthouseService = /** @class */ (function () {
    function LighthouseService() {
    }
    LighthouseService.launchHeadlessChromeAndRunLighthouse = function (config) {
        if (config === void 0) { config = null; }
        var url = 'https://www.celebritycruises.com';
        var desktopFlags = {
            logLevel: 'info',
            chromeFlags: ['--headless', '--no-sandbox', '--disable-setuid-sandbox'],
            throttlingMethod: 'provided',
            disableDeviceEmulation: false,
            emulatedFormFactor: 'desktop',
            port: null
            // onlyCategories: ['performance']
        };
        LighthouseLogger.setLevel(desktopFlags.logLevel);
        return ChromeLauncher.launch({ chromeFlags: desktopFlags.chromeFlags }).then(function (chrome) {
            desktopFlags.port = chrome.port;
            return Lighthouse(url, desktopFlags, config).then(function (results) {
                // use results.lhr for the JS-consumable output
                // use results.report for the HTML/JSON/CSV output as a string
                // use results.artifacts for the trace/screenshots/other specific case you need (rarer)
                return chrome.kill().then(function () { return results; });
            });
        });
    };
    LighthouseService.getHTMLReport = function (lhr) {
        return ReportGenerator.generateReport(lhr, 'html');
    };
    return LighthouseService;
}());
exports.default = LighthouseService;
//# sourceMappingURL=lighthouse.service.js.map