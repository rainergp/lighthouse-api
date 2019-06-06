import * as fs from "fs";

export default class FileService {

    public static writeFile(path: string, data: string) {
        return new Promise((resolve, reject) => {
            // let id = './src/public/reports/' + result._doc._id.toString();
            // let filename = `${id}.html`;
            // let html = ReportGenerator.generateReport(results.lhr, 'html');

            fs.writeFile(path, data, error => {
                if (error) {
                    reject(error);
                }
            });

            resolve(true);
        })
    }
}
