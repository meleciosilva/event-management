// setup mongoose
const mongoose = require("mongoose");
const connectionString = "mongodb://localhost:27017/events";

// connect application to database
module.exports = () => {
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }, (err) => {
    if (err) return console.error(err);
    console.log("Database Connection is Successful!");
  });
}