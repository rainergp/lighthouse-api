"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChromeLauncher = require("chrome-launcher");
var lighthouse = require("lighthouse");
var LighthouseLogger = require("lighthouse-logger");
var ReportGenerator = require("lighthouse/lighthouse-core/report/report-generator");
var device_type_enum_1 = require("../models/device-type.enum");
var LighthouseService = /** @class */ (function () {
    function LighthouseService() {
    }
    LighthouseService.launchHeadlessChromeAndRunLighthouse = function (device, config) {
        if (config === void 0) { config = null; }
        var url = 'https://www.celebritycruises.com';
        /**
         * Adjustments needed for DevTools network throttling to simulate
         * more realistic network conditions.
         * @see https://crbug.com/721112
         * @see https://docs.google.com/document/d/10lfVdS1iDWCRKQXPfbxEn4Or99D64mvNlugP1AQuFlE/edit
         * @see https://github.com/WPO-Foundation/webpagetest/blob/master/www/settings/connectivity.ini.sample
         */
        var DEVTOOLS_RTT_ADJUSTMENT_FACTOR = 3.75;
        var DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR = 0.9;
        var TARGET_LATENCY = 70;
        var TARGET_DOWNLOAD_THROUGHPUT = Math.floor(12 * 1024);
        var TARGET_UPLOAD_THROUGHPUT = Math.floor(12 * 1024);
        var mobileThrottlingSettings = {
            // The round trip time in milliseconds
            rttMs: TARGET_LATENCY,
            // The network throughput in kilobytes per second
            throughputKbps: TARGET_DOWNLOAD_THROUGHPUT,
            // devtools settings
            // The network request latency in milliseconds
            requestLatencyMs: TARGET_LATENCY * DEVTOOLS_RTT_ADJUSTMENT_FACTOR,
            // The network download throughput in kilobytes per second
            downloadThroughputKbps: TARGET_DOWNLOAD_THROUGHPUT * DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR,
            // The network upload throughput in kilobytes per second
            uploadThroughputKbps: TARGET_UPLOAD_THROUGHPUT * DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR,
            // used by both
            // The amount of slowdown applied to the cpu (1/<cpuSlowdownMultiplier>)
            cpuSlowdownMultiplier: 4,
        };
        var opts = {
            logLevel: 'info',
            chromeFlags: ['--headless', '--no-sandbox', '--disable-setuid-sandbox'],
            throttlingMethod: device === device_type_enum_1.DeviceType.Desktop ? 'provided' : 'devtools',
            disableDeviceEmulation: false,
            emulatedFormFactor: device === device_type_enum_1.DeviceType.Desktop ? 'desktop' : 'mobile',
            port: null,
        };
        if (device === device_type_enum_1.DeviceType.Mobile) {
            opts.throttling = mobileThrottlingSettings;
        }
        LighthouseLogger.setLevel(opts.logLevel);
        return ChromeLauncher.launch({ chromeFlags: opts.chromeFlags }).then(function (chrome) {
            opts.port = chrome.port;
            return lighthouse(url, opts, config).then(function (results) {
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