var express = require('express');
var router = express.Router();

const ctrl = require('../controllers/posts_tags')

router.get('/', ctrl.getAll)

module.exports = router;