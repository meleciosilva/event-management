const router = require("express").Router();
const controller = require("./../controllers/events.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const { authenticateUser, checkIfAdmin } = require("./../middleware/authenticate");

router
  .route("/:eventId")
  .get(authenticateUser, controller.read)
  .put(authenticateUser, checkIfAdmin, controller.update)
  .delete(authenticateUser, checkIfAdmin, controller.destroy)
  .all(methodNotAllowed);

router 
  .route("/")
  .post(authenticateUser, controller.create)
  .get(authenticateUser, controller.list)
  .all(methodNotAllowed);

module.exports = router;