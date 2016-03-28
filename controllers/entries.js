var Entry = require('../models/entry');

var index = function(req, res, next) {
  Entry
    .find({}).exec()
    .catch(function(err) {
      next(err);
    })
    .then(function(entries) {
      res.json({data: entries});
    });
};

function show(req, res, next) {
  var id = req.params.id;
  console.log("get me that single image!!", id);

  Entry.findById(id, function(err, entry) {
    if (err) {
      return res.status(404).json({message: "404 entry not found."});
    } else {
      res.json({data: entry});
    }
  });
};

var create = function(req, res, next) {
    console.log("ServerSide New Instagram!!", req.body);

var newEntry = new Entry(req.body)

newEntry.save(function(err, savedEntry) {
     if (err || !savedEntry) {
     return res.status(422).json({message: "422 Unprocessable Entity."});
    } else {
      res.json(savedEntry);
  }
 });
}

var like = function(req, res, next) {
  Entry
    .findById(req.params.id).exec()
    .then(
      function(entry) {
        if (!entry) {
          return res.status(404).json({message: "404 entry not found."});
        }
        return entry;
      },
      function(err) {
        return res.status(404).json({message: "404 entry not found."});
      }
    )
    .then(function(entry) {
      entry.likes++;
      return entry.save();
    })
    .catch(function(err) {
      return res.status(500).json(err);
    })
    .then(function(entry) {
      res.json({message: "Liked!", likes: entry.likes, data: entry})
    });
};

module.exports = {
  index:  index,
  show:   show,
  like:   like,
  create: create
};
