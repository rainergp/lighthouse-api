let express = require('express');
let router = express.Router();

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const log = require('lighthouse-logger');

router.get('/', (req, res) => {

	function launchChromeAndRunLighthouse(url, opts, config = null) {

		return chromeLauncher.launch({chromeFlags: opts.chromeFlags}).then(chrome => {

			opts.port = chrome.port;

			return lighthouse(url, opts, config).then(results => {
				// use results.lhr for the JS-consumable output
				// use results.report for the HTML/JSON/CSV output as a string
				// use results.artifacts for the trace/screenshots/other specific case you need (rarer)

				return chrome.kill().then(() => results.lhr)
			})
		});
	}

	const opts = {
		logLevel: 'info',
		chromeFlags: ['--headless --no-sandbox --disable-setuid-sandbox'],
		throttlingMethod: 'provided',
		disableDeviceEmulation: true

		// onlyCategories: ['performance']
		// --disable-device-emulation --throttling-method=provided
	};

	/** @type {LH.Config.Json} */
	const config = {
		extends: 'lighthouse:default',
		// settings: {
		// 	maxWaitForLoad: 35 * 1000,
		// 	emulatedFormFactor: 'desktop',
		// 	throttling: {
		// 		rttMs: 40,
		// 		throughputKbps: 10 * 1024,
		// 		cpuSlowdownMultiplier: 1,
		// 	},
		// 	skipAudits: ['uses-http2'],
		// },
		// audits: [
		// 	{path: 'metrics/first-contentful-paint', options: {scorePODR: 800, scoreMedian: 1600}},
		// 	{path: 'metrics/first-meaningful-paint', options: {scorePODR: 800, scoreMedian: 1600}},
		// 	{path: 'metrics/speed-index', options: {scorePODR: 1100, scoreMedian: 2300}},
		// 	{path: 'metrics/interactive', options: {scorePODR: 2000, scoreMedian: 4500}},
		// 	{path: 'metrics/first-cpu-idle', options: {scorePODR: 2000, scoreMedian: 4500}},
		// ],
	};

	log.setLevel(opts.logLevel);

	launchChromeAndRunLighthouse('https://www.new.celebritycruises.com', opts).then(result => {
		res.json(result)
	});

});

module.exports = router;
