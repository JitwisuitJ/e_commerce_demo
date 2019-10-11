const mongoose = require('mongoose');
const config = require('config');
const dbUri = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(dbUri, {
      dbName: 'E_Commerce',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.log(error(err.message));
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
