import { Request, Response, NextFunction } from 'express';
import * as ReportGenerator from 'lighthouse/lighthouse-core/report/report-generator';
import Report from '../../models/api/report.model';
import {DeviceType} from "../../models/device-type.enum";
import ReportService from "../../services/api/report.service";
import LighthouseService from "../../services/lighthouse.service";
import FileService from "../../services/file.service";
import NotificationsService from "../../services/notifications.service";
import SubscriptionService from "../../services/api/subscription.service";

export default class ReportController {

    /**
     * Get Report
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    public static async getReport(req: Request, res: Response, next: NextFunction) {
        ReportService.getReport()
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

        ReportController.runLighthouseAndSaveData()
            .then(data => {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(data));
            })
            .catch(error => {
                res.status(500);
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(error));
            });
    }

    public static runLighthouseAndSaveData() {
        return new Promise(async (resolve, reject) => {

            try {
                let lighthouseResults = [];

                lighthouseResults.push({result: await LighthouseService.launchHeadlessChromeAndRunLighthouse(DeviceType.Desktop), device: DeviceType.Desktop});

                lighthouseResults.push({result: await LighthouseService.launchHeadlessChromeAndRunLighthouse(DeviceType.Mobile), device: DeviceType.Mobile});

                lighthouseResults.forEach(async (data: any) => {
                    let parsedData = ReportController.parseData(data);

                    let saveReportResult: any = await ReportService.saveReport(parsedData);

                    let path = `./src/public/reports/${saveReportResult._doc._id.toString()}.html`;
                    let html = ReportGenerator.generateReport(data.result.lhr, 'html');

                    await FileService.writeFile(path, html);
                });

                let subscriptionsList = await SubscriptionService.getSubscriptions();

                resolve(await NotificationsService.sendNotifications(subscriptionsList));

            } catch (error) {
                reject(error)
            }
        });
    }

    private static parseData(data): any {

        let json = data.result.lhr;

        let firstContentfulPaint = json.audits['first-contentful-paint'],
            firstMeaningfulPaint = json.audits['first-meaningful-paint'],
            speedIndex = json.audits['speed-index'],
            firstCPUIdle = json.audits['first-cpu-idle'],
            interactive = json.audits['interactive'],
            estimatedInputLatency = json.audits['estimated-input-latency'],
            maxPotentialFID = json.audits['max-potential-fid'],
            categories = json.categories;

        return new Report({
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
    }

}
