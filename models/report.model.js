const mongoose = require('mongoose');

const ReportSchema = mongoose.Schema({
	requestedUrl: String,
	fetchTime: Date,
	json: String
}, {
	timestamps: true
});

module.exports = mongoose.model('Report', ReportSchema);
