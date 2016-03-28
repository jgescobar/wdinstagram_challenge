var express = require('express'),
    router  = new express.Router();

var entriesController = require('../controllers/entries');

router.get(  '/entries',           entriesController.index);
router.get(  '/entries/:id',       entriesController.show);
router.post( '/entries/:id/likes', entriesController.like);
router.post( '/entries',           entriesController.create);
module.exports = router;
