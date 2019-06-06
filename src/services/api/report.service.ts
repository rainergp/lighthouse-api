import Report from "../../models/api/report.model";

export default class ReportService {

    public static getReport() {

        return new Promise((resolve, reject) => {

            Report.find({}).sort({_id: -1}).limit(500).exec()
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

}
