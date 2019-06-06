import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import * as mongoose from "mongoose";
import * as cors from "cors";
import * as webPush from "web-push";
import Routes from "./routes";
import {CronJob} from 'cron';
import ReportController from "../controllers/api/report.controller";

class Express {

    public app: express.Express;
    private envFile = 'src/config/env/.env';

    constructor() {

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

        this.setCronJob();
    }

    // Set env from .env or .env.${NODE_ENV} file using dotenv
    private setEnv() {

        // Add NODE_ENV to path if is not production
        if (process.env.NODE_ENV !== 'production') this.envFile += '.' + process.env.NODE_ENV;

        // Set env from file
        dotenv.config({path: this.envFile});
    }

    // Connect to mongo
    private connectToMongo() {

        // Connecting to the database
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true
        }).then(() => {
            console.log("Successfully connected to the database");
        }).catch(err => {
            console.log('Could not connect to the database. Exiting now...', err);
            process.exit();
        });
    }

    // Set view engine
    private setViewEngine() {

        // Configure ejs as view engine
        this.app.set("views", path.join(__dirname, "../../src/views"));
        this.app.set("view engine", "ejs");
    }

    // Set middleware
    private setMiddleware() {

        // Add cors
        this.app.use(cors());

        // Add logging
        this.app.use(logger("dev"));

        // Add body parser
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));

        // Add cookie parser
        this.app.use(cookieParser());

        this.app.use('/reports', express.static(__dirname + '/public/reports'));
    }

    // Set static files
    private setStaticFiles() {

        // Set static route for public folder
        this.app.use(express.static(path.join(__dirname, "../../src/public")));
    }

    // Set routes
    private setRoutes() {

        // Create Routes, and export its configured Express.Router
        new Routes(this.app);
    }

    // Set Vapid Details
    private setVapidDetails() {
        webPush.setVapidDetails('mailto:rainergonzalez@celebrity.com', process.env.VAPID_PUBLIC, process.env.VAPID_PRIVATE);
    }

    private setCronJob() {
        new CronJob('0,15,30,45 * * * *', () => {
            ReportController.runLighthouseAndSaveData()
                .then(result => {
                    console.log(result);
                })
                .catch(error => {
                    //TODO: Implement error handler
                    console.log(error)
                })
        }, null, true, 'UTC', this);
    }
}

export default new Express().app;
