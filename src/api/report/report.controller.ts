import { Request, Response, NextFunction } from 'express';
import * as ChromeLauncher from 'chrome-launcher';
import * as Lighthouse from 'lighthouse';
import * as LighthouseLogger from 'lighthouse-logger';
import * as ReportGenerator from 'lighthouse/lighthouse-core/report/report-generator';
import * as fs from 'fs';
import Model from './report.model';

export default class ReportController {

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
     * Get Report
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    public static async getReport(req: Request, res: Response, next: NextFunction) {

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

        const notificationPayload = {
            notification: {
                title: 'New Notification',
                body: 'This is the body of the notification',
                icon: 'assets/icons/icon-512x512.png',
            },
        }

    }

    private launchChromeAndRunLighthouse(url: string, flags: any, config = null) {

        return ChromeLauncher.launch({chromeFlags: flags.chromeFlags}).then(chrome => {

            flags.port = chrome.port;

            return Lighthouse(url, flags, config).then(results => {

                // use results.lhr for the JS-consumable output
                // use results.report for the HTML/JSON/CSV output as a string
                // use results.artifacts for the trace/screenshots/other specific case you need (rarer)

                let id = './reports/test';
                let utcTimestamp = new Date().getTime();
                let filename = `${id}-${utcTimestamp}.html`;
                let html = ReportGenerator.generateReport(results.lhr, 'html');

                fs.writeFile(filename, html, function(err) {
                    if (err) {
                        return console.log(err);
                    }
                });

                return chrome.kill().then(() => results.lhr)
            })
        });
    }
}
