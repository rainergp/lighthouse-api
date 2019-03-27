let createError = require('http-errors');
let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cron =require('node-cron');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let jsonRouter = require('./routes/json');
let auditRouter = require('./routes/audit');

// Database configuration
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
	console.log("Successfully connected to the database");
}).catch(err => {
	console.log('Could not connect to the database. Exiting now...', err);
	process.exit();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/json', jsonRouter);
app.use('/audit', auditRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

app.use(() => {
	cron.schedule('* * * * *', )
});

module.exports = app;
