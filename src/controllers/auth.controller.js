const User = require("./../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "suPErSecuRESEcrEt"
const expiry = 3600;

const registerNewUser = (req, res, next) => {
  // fetch user's details from request body
  const { firstName, lastName, email, password } = req.body;
  
  User.findOne({email: req.body.email}, (err, existingUser) => {
    if (err) return next(err);
    // check if user with this email exists
    if (existingUser) return res.json({ message: `User '${existingUser.email}' already exists`});

    // create a new user“
    User.create({firstName, lastName, email }, (err, newUser) => {
      if (err) return next(err);
    
    // hash password
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(password, salt, (err, hashedPassword) => {
        if (err) return next(err);
        // save password to database
        newUser.password = hashedPassword;
        newUser.save((err, savedUser) => {
          if (err) return next(err);
          // create jwt for user
          jwt.sign({
            id: newUser._id,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName
          }, secret, {expiresIn: expiry}, (err, token) => {
              if (err) return next(err);
              // send jwt to user
              res.json({ message: "User registration successful", token })
          })
        })
      })
    })

    });
  })
}

const logInUser = (req, res, next) => {
  // check if user exists
  User.findOne({email: req.body.email}, (err, foundUser) => {
    if (err) return next(err);
    if (!foundUser) return next({ status: 401, message: `Email'${req.body.email}' does not exist` });
    
    // check if password is correct
    bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
      if (err) return next(err);
      if (!isMatch) return next({ status: 401, message: "Invalid Password" });

      // create a token
      jwt.sign({
        id: foundUser._id,
        email: foundUser.email,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
      }, secret, { expiresIn: expiry }, (err, token) => {
        if (err) return next(err);
          // send token to user
          res.json({ message: "User logged-in", token });
      });
    });

  });
}

const deleteUser = (req, res, next) => {
  const { email } = req.body;
  User.findOneAndDelete({email: email}, (err, foundUser) => {
    if (err) return next(err);
    if (!foundUser) return next({ status: 401, message: `Email '${email}' not found` });
    res.json({ message: `User '${foundUser.firstName} ${foundUser.lastName}' was successfully deleted` });
  });
}


module.exports = {
  registerNewUser,
  logInUser,
  deleteUser
}