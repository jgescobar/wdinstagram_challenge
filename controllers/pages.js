var Entry = require('../models/entry');

var home = function(req, res, next) {
  Entry
    .find({}).exec()
    .catch(function(err) {
      next(err);
    })
    .then(function(entries) {
      res.render('pages/home', {entries: entries});
    });
};

module.exports = {
  home: home
};
