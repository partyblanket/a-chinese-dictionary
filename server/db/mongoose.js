const mongoose = require('mongoose');

//mongoose.Promise = global.Promise; // - not needed in new version i believe
// mongoose.connect(process.env.MONGODB_URI);

mongoose.connect('mongodb://localhost:27017/dict', { useNewUrlParser: true })

module.exports = {
  mongoose
}
