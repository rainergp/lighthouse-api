import Medians_Report from "../../models/api/medians-report.model";

export default class MediansReportService {

    public static saveMediansReportIfNotExists(data: any) {
        return new Promise((resolve, reject) => {

            Medians_Report.update(
                {timestamp: data.timestamp},
                {$setOnInsert: data},
                {upsert: true}
            ).exec()
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error);
                });
        })
    }

    public static getMediansReportsByDateRange(start, end) {

        return new Promise((resolve, reject) => {

            Medians_Report.find({fetchTime: {$gte: start, $lte: end}}).sort({_id: -1}).exec()
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error);
                });
        })
    }

}
