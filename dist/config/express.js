"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var express = require("express");
var logger = require("morgan");
var path = require("path");
var mongoose = require("mongoose");
var cors = require("cors");
var webPush = require("web-push");
var routes_1 = require("./routes");
var report_controller_1 = require("../controllers/api/report.controller");
var cron_service_1 = require("../services/cron.service");
var medians_report_controller_1 = require("../controllers/api/medians-report.controller");
var Express = /** @class */ (function () {
    function Express() {
        this.envFile = 'src/config/env/.env';
        // ENV
        this.setEnv();
        // Mongo
        this.connectToMongo();
        // Start App
        this.app = express();
        // Set view engine
        this.setViewEngine();
        // Middleware
        this.setMiddleware();
        // Set static files
        this.setStaticFiles();
        // Routes
        this.setRoutes();
        // Vapid Details
        this.setVapidDetails();
        this.setCronJobs();
    }
    // Set env from .env or .env.${NODE_ENV} file using dotenv
    Express.prototype.setEnv = function () {
        // Add NODE_ENV to path if is not production
        if (process.env.NODE_ENV !== 'production')
            this.envFile += '.' + process.env.NODE_ENV;
        // Set env from file
        dotenv.config({ path: this.envFile });
    };
    // Connect to mongo
    Express.prototype.connectToMongo = function () {
        // Connecting to the database
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true
        }).then(function () {
            console.log("Successfully connected to the database");
        }).catch(function (err) {
            console.log('Could not connect to the database. Exiting now...', err);
            process.exit();
        });
    };
    // Set view engine
    Express.prototype.setViewEngine = function () {
        // Configure ejs as view engine
        this.app.set("views", path.join(__dirname, "../../src/views"));
        this.app.set("view engine", "ejs");
    };
    // Set middleware
    Express.prototype.setMiddleware = function () {
        // Add cors
        this.app.use(cors());
        // Add logging
        this.app.use(logger("dev"));
        // Add body parser
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // Add cookie parser
        this.app.use(cookieParser());
        this.app.use('/reports', express.static(__dirname + '/public/reports'));
    };
    // Set static files
    Express.prototype.setStaticFiles = function () {
        // Set static route for public folder
        this.app.use(express.static(path.join(__dirname, "../../src/public")));
    };
    // Set routes
    Express.prototype.setRoutes = function () {
        // Create Routes, and export its configured Express.Router
        new routes_1.default(this.app);
    };
    // Set Vapid Details
    Express.prototype.setVapidDetails = function () {
        webPush.setVapidDetails('mailto:rainergonzalez@celebrity.com', process.env.VAPID_PUBLIC, process.env.VAPID_PRIVATE);
    };
    Express.prototype.setCronJobs = function () {
        cron_service_1.default.setCronJob('0,15,30,45 * * * *', function () {
            report_controller_1.default.runLighthouseAndSaveData()
                .then(function (result) {
                console.log(result);
            })
                .catch(function (error) {
                //TODO: Implement error handler
                console.log(error);
            });
        });
        cron_service_1.default.setCronJob('5 0 * * *', function () {
            medians_report_controller_1.default.getDailyMetricsMediansAndSaveData()
                .then(function (result) {
                console.log(result);
            })
                .catch(function (error) {
                //TODO: Implement error handler
                console.log(error);
            });
        });
    };
    return Express;
}());
exports.default = new Express().app;
//# sourceMappingURL=express.js.map