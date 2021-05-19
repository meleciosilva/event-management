require("dotenv").config();
// set up mongoose
const mongoose = require("mongoose");

// const connectionString = "mongodb://localhost:27017/bookstore";

const url = `mongodb+srv://mel-silva:${process.env.DB_PASS}@mycluster.7bu2d.mongodb.net/bookstore?retryWrites=true&w=majority`;

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