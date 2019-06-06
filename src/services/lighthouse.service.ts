import * as ChromeLauncher from "chrome-launcher";
import * as Lighthouse from 'lighthouse';
import * as LighthouseLogger from 'lighthouse-logger';
import * as ReportGenerator from 'lighthouse/lighthouse-core/report/report-generator';


export default class LighthouseService {


    public static launchHeadlessChromeAndRunLighthouse(config = null) {

        const url = 'https://www.celebritycruises.com';

        let desktopFlags = {
            logLevel: 'info',
            chromeFlags: ['--headless', '--no-sandbox', '--disable-setuid-sandbox'],
            throttlingMethod: 'provided',
            disableDeviceEmulation: false,
            emulatedFormFactor: 'desktop',
            port: null
            // onlyCategories: ['performance']
        };

        LighthouseLogger.setLevel(desktopFlags.logLevel);

        return ChromeLauncher.launch({chromeFlags: desktopFlags.chromeFlags}).then(chrome => {

            desktopFlags.port = chrome.port;

            return Lighthouse(url, desktopFlags, config).then(results => {

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
