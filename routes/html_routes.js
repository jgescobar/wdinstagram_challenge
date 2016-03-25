var express = require('express'),
    router  = new express.Router();

var pagesController = require('../controllers/pages');

router.get('/', pagesController.home);

module.exports = router;
