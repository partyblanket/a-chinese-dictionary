//public database
const mongoose = require('mongoose');

var WordSchema = new mongoose.Schema({
  simp: {
    type: String,
    required: false,
    minlength: 1,
    trim: true
  },
  trad: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
    trim: true
  },
  en: {
    type: String,
    required: false,
    minlength: 1,
    trim: true
  },
  cnpro: {
    type: String,
    required: false,
    minlength: 1,
    trim: true
  },
  twpro: {
    type: String,
    required: false,
    minlength: 1,
    trim: true
  },
  cnexp: {
    type: String,
    required: false,
    minlength: 1,
    trim: true
  }
  }]
});

var Word = mongoose.model('Word', WordSchema);

module.exports = {Word};
