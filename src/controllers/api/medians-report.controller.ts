import {Request, Response, NextFunction} from 'express';
import * as moment from 'moment';
import Report from "../../models/api/report.model";
import MediansReportService from "../../services/api/medians-report.service";
import ReportService from "../../services/api/report.service";

export default class MediansReportController {

    /**
     * Post Subscription
     * @param req
     * @param res
     * @param next
     */
    public static async postMediansReport(req: Request, res: Response, next: NextFunction) {

        MediansReportController.getDailyMetricsMediansAndSaveData()
            .then(result => {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(result));
            })
            .catch(error => {
                res.status(500);
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(error));
            })

    }

    public static getDailyMetricsMediansAndSaveData() {

        return new Promise(async (resolve, reject) => {

            try {
                const start = moment.utc().subtract(1, 'days').startOf('day').format('YYYY-MM-DDTHH:mm:ss');
                const end = moment.utc().subtract(1, 'days').endOf('day').format('YYYY-MM-DDTHH:mm:ss');

                let reportsList = await ReportService.getReportsByDateRange(start, end);

                let mediansObject = MediansReportController.parseDataAndBuildMediansObject(start, reportsList);

                resolve(await MediansReportService.saveMediansReportIfNotExists(mediansObject))

            } catch (error) {
                reject(error)
            }
        });
    }

    private static parseDataAndBuildMediansObject(timestamp, data: any) {
        let idx = Math.floor(data.length / 2);
        let deviceType = data[0].deviceType;
        let requestedUrl = data[0].requestedUrl;
        let performanceArr = [];
        let firstContentfulPaintArr = [];
        let firstMeaningfulPaintArr = [];
        let speedIndexArr = [];
        let firstCPUIdleArr = [];
        let interactiveArr = [];
        let estimatedInputLatencyArr = [];
        let maxPotentialFIDArr = [];

        data.forEach((item: any) => {
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
            performance: Math.round(performanceArr.sort((n1, n2) => n1 - n2)[idx] * 100),
            firstContentfulPaint: parseFloat((firstContentfulPaintArr.sort((n1, n2) => n1 - n2)[idx] / 1000).toFixed(1)),
            firstMeaningfulPaint: parseFloat((firstMeaningfulPaintArr.sort((n1, n2) => n1 - n2)[idx] / 1000).toFixed(1)),
            speedIndex: parseFloat((speedIndexArr.sort((n1, n2) => n1 - n2)[idx] / 1000).toFixed(1)),
            firstCPUIdle: parseFloat((firstCPUIdleArr.sort((n1, n2) => n1 - n2)[idx] / 1000).toFixed(1)),
            interactive: parseFloat((interactiveArr.sort((n1, n2) => n1 - n2)[idx] / 1000).toFixed(1)),
            estimatedInputLatency: Math.round(estimatedInputLatencyArr.sort((n1, n2) => n1 - n2)[idx]),
            maxPotentialFID: Math.round(maxPotentialFIDArr.sort((n1, n2) => n1 - n2)[idx])
        });
    }
}
