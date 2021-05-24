const User = require("./../models/users.model");
const bcrypt = require("bcrypt");
let password = "admin123";

exports.seedAdmin = () => {
  User.findOne({role: "admin"}, (err, admin) => {
    if (err) throw err;
    if (admin) return "Admin account already exists";

    User.create({
      firstName: "Mike",
      lastName: "Adamns",
      email: "admin@email.com",
      role: "admin"
    }, (err, user) => {
      if (err) throw err;
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;
          user.password = hash;
          user.save((err, savedUser) => {
            if (err) throw err;
            return "Admin account created"
          })
        })
      })
    })
  })

}