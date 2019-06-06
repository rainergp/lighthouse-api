import { Request, Response, NextFunction } from 'express';
import * as moment from 'moment';
import Report from "../../models/api/report.model";
import Medians_Report from "../../models/api/medians-report.model";

export default class MediansReportController {

    /**
     * Post Subscription
     * @param req
     * @param res
     * @param next
     */
    public static async postMediansReport(req: Request, res: Response, next: NextFunction) {

        MediansReportController.getDailyMetricsMedians()
            .then(result => {

                MediansReportController.saveIfNotExists(result)
                    .then(() => {
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify(result));
                    })
                    .catch(error => {
                        res.status(500);
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify(error));
                    });

            })
            .catch(error => {
                res.status(500);
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(error));
            })

    }

    private static getDailyMetricsMedians() {

        const start = moment.utc().subtract(1, 'days').startOf('day').format('YYYY-MM-DDTHH:mm:ss');
        const end = moment.utc().subtract(1, 'days').endOf('day').format('YYYY-MM-DDTHH:mm:ss');

        console.log(start);
        console.log(end);

        return new Promise((resolve, reject) => {

            Report.find({fetchTime: {$gte: start, $lte: end}}).sort({_id: -1}).exec()
                .then((data: any) => {
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

                    resolve({
                        timestamp: start,
                        deviceType: deviceType,
                        requestedUrl: requestedUrl,
                        performance: Math.round(performanceArr.sort((n1,n2) => n1 - n2)[idx] * 100),
                        firstContentfulPaint: parseFloat((firstContentfulPaintArr.sort((n1,n2) => n1 - n2)[idx] / 1000).toFixed(1)),
                        firstMeaningfulPaint: parseFloat((firstMeaningfulPaintArr.sort((n1,n2) => n1 - n2)[idx] / 1000).toFixed(1)),
                        speedIndex: parseFloat((speedIndexArr.sort((n1,n2) => n1 - n2)[idx] / 1000).toFixed(1)),
                        firstCPUIdle: parseFloat((firstCPUIdleArr.sort((n1,n2) => n1 - n2)[idx] / 1000).toFixed(1)),
                        interactive: parseFloat((interactiveArr.sort((n1,n2) => n1 - n2)[idx] / 1000).toFixed(1)),
                        estimatedInputLatency: Math.round(estimatedInputLatencyArr.sort((n1,n2) => n1 - n2)[idx]),
                        maxPotentialFID: Math.round(maxPotentialFIDArr.sort((n1,n2) => n1 - n2)[idx])
                    });
                })
                .catch(error => {
                    reject(error)
                });
        });

    }

    private static saveIfNotExists(data: any) {
        return new Promise((resolve, reject) => {

            Medians_Report.update(
                {timestamp: data.timestamp},
                {$setOnInsert: data},
                {upsert: true},
                (error, result) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    resolve(result);
                })
        })
    }

}
