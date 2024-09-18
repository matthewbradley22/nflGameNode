const express = require('express');
const router = express.Router();
const player_controller = require("../controllers/playerController")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'NFL Pickem' });
});

router.post('/', player_controller.user_create_post);

module.exports = router;
