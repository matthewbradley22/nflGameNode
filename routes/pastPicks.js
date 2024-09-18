const express = require('express');
const router = express.Router();

//Change function to populate a table with past picks
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Past picks here');
});

module.exports = router;
