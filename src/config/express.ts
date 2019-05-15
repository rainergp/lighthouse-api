import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import * as mongoose from "mongoose";
import Routes from "./routes";

class Express {

    public app: express.Express;
    private envFile = 'src/.env';

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
    }

    // Set env from .env or .env.${NODE_ENV} file using dotenv
    private setEnv() {

        // Add NODE_ENV to path if is not production
        if (process.env.NODE_ENV !== 'production') this.envFile += '.' + process.env.NODE_ENV;

        // Set env from file
        dotenv.config({ path: this.envFile });
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

        // Add logging
        this.app.use(logger("dev"));

        // Add body parser
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        // Add cookie parser
        this.app.use(cookieParser());

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
}

export default new Express().app;
