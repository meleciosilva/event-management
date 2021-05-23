const router = require("express").Router();
const controller = require("./../controllers/auth.controller");
const methodNotAllowed = require("./../errors/methodNotAllowed");

router
  .route("/sign-up")
  .post(controller.registerNewUser)
  .all(methodNotAllowed);

router
  .route("/log-in")
  .post(controller.logInUser)
  .all(methodNotAllowed);

module.exports = router;