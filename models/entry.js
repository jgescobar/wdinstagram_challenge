var mongoose = require('mongoose'),
    debug    = require('debug')('app:models'),
    moment   = require('moment');

var entrySchema = new mongoose.Schema({
  author:    { type: String, required: true },
  dateTaken: {
    type:    Date,
    default: Date.now,
    get:     formatDate
  },
  photoUrl: { type: String, required: true },
  likes:    { type: Number, default: 0 }
});

entrySchema.methods.html_formatted_likes = function() {
  return '<i class="fa fa-heart"></i> ' + this.likes +
         (this.likes === 1 ? ' like' : ' likes');
};

entrySchema.options.toJSON = {
  transform: function(entry, output, options) {
    output.id = output._id; delete output._id;
    output.formattedLikes = entry.html_formatted_likes();
    output.dateTaken = entry.dateTaken;

    return output;
  }
};

function formatDate(dateTaken) {
  return moment(dateTaken).format('MMM D, YYYY');
};

var Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;
