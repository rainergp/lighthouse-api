import { Request, Response, NextFunction } from 'express';
import * as ChromeLauncher from 'chrome-launcher';
import * as Lighthouse from 'lighthouse';
import * as LighthouseLogger from 'lighthouse-logger';
import * as ReportGenerator from 'lighthouse/lighthouse-core/report/report-generator';
import * as fs from 'fs';
import * as webPush from "web-push";
import Subscription from '../subscription/subscription.model';
import Report from './report.model';
import {Schema} from "mongoose";
import {DeviceType} from "../../models/device-type.enum";

export default class ReportController {

    private static flags = {
        logLevel: 'info',
        chromeFlags: ['--headless', '--no-sandbox', '--disable-setuid-sandbox'],
        throttlingMethod: 'provided',
        disableDeviceEmulation: false,
        emulatedFormFactor: 'desktop'

        // onlyCategories: ['performance']
    };

    private static url = 'https://www.celebritycruises.com';

    /**
     * Get Report
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    public static async getReport(req: Request, res: Response, next: NextFunction) {
        Report.find({}).sort({_id: -1}).limit(240).exec()
        // Report.find({}).sort({name: 'asc'}).exec()
            .then(data => {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({ data: data }));
            })
            .catch(error => {
                res.status(500);
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(error));
            });

    }

    /**
     * Post Report
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    public static async postReport(req: Request, res: Response, next: NextFunction) {

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

        LighthouseLogger.setLevel(this.flags.logLevel);

        ReportController.launchHeadlessChromeAndRunLighthouse(this.url, this.flags)
            .then(results => {

                let parsedData = ReportController.parseData(results.lhr);

                ReportController.saveDataAndHTMLReport(results, parsedData)
                    .then(() => {
                        ReportController.sendNotifications();
                    })
                    .catch(error => {
                        res.status(500);
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify(error));
                    });

                res.send(true);
            })
            .catch(error => {
                res.status(500);
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(error));
            })

    }

    public static runCronJobReport() {
        LighthouseLogger.setLevel(this.flags.logLevel);

        ReportController.launchHeadlessChromeAndRunLighthouse(this.url, this.flags)
            .then(results => {

                let parsedData = ReportController.parseData(results.lhr);

                ReportController.saveDataAndHTMLReport(results, parsedData)
                    .then(() => {
                        ReportController.sendNotifications();
                    })
                    .catch(error => {
                        //TODO: Implement error handler
                        console.log(error)
                    });
            })
            .catch(error => {
                //TODO: Implement error handler
                console.log(error)
            })
    }

    private static launchHeadlessChromeAndRunLighthouse(url: string, flags: any, config = null) {

        return ChromeLauncher.launch({chromeFlags: flags.chromeFlags}).then(chrome => {

            flags.port = chrome.port;

            return Lighthouse(url, flags, config).then(results => {

                // use results.lhr for the JS-consumable output
                // use results.report for the HTML/JSON/CSV output as a string
                // use results.artifacts for the trace/screenshots/other specific case you need (rarer)

                return chrome.kill().then(() => results)
            })
        });
    }

    private static parseData(json): any {

        let firstContentfulPaint = json.audits['first-contentful-paint'],
            firstMeaningfulPaint = json.audits['first-meaningful-paint'],
            speedIndex = json.audits['speed-index'],
            firstCPUIdle = json.audits['first-cpu-idle'],
            interactive = json.audits['interactive'],
            estimatedInputLatency = json.audits['estimated-input-latency'],
            maxPotentialFID = json.audits['max-potential-fid'],
            categories = json.categories;

        return new Report({
            deviceType: DeviceType.Desktop,
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
    }

    private static saveDataAndHTMLReport(results, parsedData) {

        return new Promise((resolve, reject) => {

            let report = new Report(parsedData);

            report.save()
                .then((result: any) => {

                    let id = './reports/' + result._doc._id.toString();
                    let filename = `${id}.html`;
                    let html = ReportGenerator.generateReport(results.lhr, 'html');

                    fs.writeFile(filename, html, function(err) {
                        if (err) {
                            return console.log(err);
                        }
                    });

                    resolve(result);

                })
                .catch(error => {
                    reject(error);
                })
        });

    }

    private static sendNotifications() {
        const notificationPayload = {
            notification: {
                title: 'New Data',
                body: 'Your application data has been updated.',
                icon: 'assets/icons/icon-512x512.png',
                // vibrate: [100, 50, 100],
                // data: ,
                // actions: [{
                //     action: 'explore',
                //     title: 'Go to the site'
                // }]
            },
        };

        Subscription.find({}, (err, subscriptions) => {
            const promises = [];
            subscriptions.forEach((subscription: any) => {
                promises.push(
                    webPush.sendNotification(
                        subscription,
                        JSON.stringify(notificationPayload)
                    )
                    .then(result => {
                        console.log(result)
                    })
                    .catch(error => {
                        console.log(error);
                    })
                )
            });
        });
    }

}
