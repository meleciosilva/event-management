const jwt = require("jsonwebtoken");
const secret = "suPErSecuRESEcrEt"

const authenticateUser = (req, res, next) => {
  // check if there is an authorization token
  if (!req.headers.authorization) return next({ status: 401, message: "Authorization token required" });
  let splittedHeader = req.headers.authorization.split(' ');
  if (splittedHeader[0] !== "Bearer") return next({ status: 401, message: "Token must be formatted correctly: 'Bearer <token>'" });

  let token = splittedHeader[1];
  // decode token
  jwt.verify(token, secret, (err, decodedToken) => {
    // check if valid
    if (!decodedToken) return next({ status: 401, message: "Invalid authorization token. Please log-in." });
    if (err) return next({ status: 500, message: err });
    req.user = decodedToken;
    // allow user to continue with request
    return next();
  });

}

const checkIfAdmin = (req, res, next) => {
  if (!req.user.role || req.user.role !== 'admin') return next({ status: 401, message: 'This route is restricted to admin users' })
  next();
} 

module.exports = {
  authenticateUser,
  checkIfAdmin
}
