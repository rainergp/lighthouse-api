let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(["Tony","Lisa","Michael","Ginger","Food"]);
});

module.exports = router;
