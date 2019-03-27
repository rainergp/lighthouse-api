let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express OK' });
});

module.exports = router;
