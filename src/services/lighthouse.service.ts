import * as ChromeLauncher from "chrome-launcher";
import * as lighthouse from 'lighthouse';
import * as LighthouseLogger from 'lighthouse-logger';
import * as ReportGenerator from 'lighthouse/lighthouse-core/report/report-generator';
import {DeviceType} from "../models/device-type.enum";


export default class LighthouseService {


    public static launchHeadlessChromeAndRunLighthouse(device: DeviceType, config = null) {

        const url = 'https://www.celebritycruises.com';

        /**
         * Adjustments needed for DevTools network throttling to simulate
         * more realistic network conditions.
         * @see https://crbug.com/721112
         * @see https://docs.google.com/document/d/10lfVdS1iDWCRKQXPfbxEn4Or99D64mvNlugP1AQuFlE/edit
         * @see https://github.com/WPO-Foundation/webpagetest/blob/master/www/settings/connectivity.ini.sample
         */
        const DEVTOOLS_RTT_ADJUSTMENT_FACTOR = 3.75;
        const DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR = 0.9;
        const TARGET_LATENCY = 70;
        const TARGET_DOWNLOAD_THROUGHPUT = Math.floor(12 * 1024);
        const TARGET_UPLOAD_THROUGHPUT = Math.floor(12 * 1024);

        const mobileThrottlingSettings = {
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
            uploadThroughputKbps:TARGET_UPLOAD_THROUGHPUT * DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR,
            // used by both
            // The amount of slowdown applied to the cpu (1/<cpuSlowdownMultiplier>)
            cpuSlowdownMultiplier: 4,
        };

        let opts: any = {
            logLevel: 'info',
            chromeFlags: ['--headless', '--no-sandbox', '--disable-setuid-sandbox'],
            throttlingMethod: device === DeviceType.Desktop ? 'provided' : 'devtools',
            disableDeviceEmulation: false,
            emulatedFormFactor: device === DeviceType.Desktop ? 'desktop' : 'mobile',
            port: null,
        };

        if (device === DeviceType.Mobile) {
            opts.throttling = mobileThrottlingSettings;
        }

        LighthouseLogger.setLevel(opts.logLevel);

        return ChromeLauncher.launch({chromeFlags: opts.chromeFlags}).then(chrome => {

            opts.port = chrome.port;

            return lighthouse(url, opts, config).then(results => {

                // use results.lhr for the JS-consumable output
                // use results.report for the HTML/JSON/CSV output as a string
                // use results.artifacts for the trace/screenshots/other specific case you need (rarer)

                return chrome.kill().then(() => results)
            })
        });
    }

    public static getHTMLReport(lhr) {
        return ReportGenerator.generateReport(lhr, 'html');
    }
}
