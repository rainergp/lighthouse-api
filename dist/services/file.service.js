"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var FileService = /** @class */ (function () {
    function FileService() {
    }
    FileService.writeFile = function (path, data) {
        return new Promise(function (resolve, reject) {
            // let id = './src/public/reports/' + result._doc._id.toString();
            // let filename = `${id}.html`;
            // let html = ReportGenerator.generateReport(results.lhr, 'html');
            fs.writeFile(path, data, function (error) {
                if (error) {
                    reject(error);
                }
            });
            resolve(true);
        });
    };
    return FileService;
}());
exports.default = FileService;
//# sourceMappingURL=file.service.js.map