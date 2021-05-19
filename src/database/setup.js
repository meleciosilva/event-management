require("dotenv").config();
// set up mongoose
const mongoose = require("mongoose");

const url = `mongodb+srv://mel-silva:${process.env.DB_PASS}@mycluster.7bu2d.mongodb.net/events?retryWrites=true&w=majority`;

// connect application to database
module.exports = () => {
  mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  }, (err) => {
    if (err) return console.log(err);
    console.log("Database Connection is Successful!");
    }
  );
}