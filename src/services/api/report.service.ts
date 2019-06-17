import Report from "../../models/api/report.model";

export default class ReportService {

    public static getReport() {

        return new Promise((resolve, reject) => {

            Report.find({}).sort({_id: -1}).limit(672).exec()
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error);
                });
        })
    }

    public static saveReport(data) {

        return new Promise((resolve, reject) => {

            let report = new Report(data);

            report.save()
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error);
                });
        })
    }

    public static getReportsByDateRange(start, end) {

        return new Promise((resolve, reject) => {

            Report.find({fetchTime: {$gte: start, $lte: end}}).sort({_id: -1}).exec()
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error);
                });
        })
    }

    public static getReportsByDateRangeAndDeviceType(start, end, deviceType) {

        return new Promise((resolve, reject) => {

            Report.find({$and: [{deviceType: deviceType}, {fetchTime: {$gte: start, $lte: end}}]}).sort({_id: -1}).exec()
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error);
                });
        })
    }

}
