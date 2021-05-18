const router = require("express").Router();
const controller = require("./events.controller");
const methodNotAllowed = require("./../errors/methodNotAllowed");

router
  .route("/:eventId")
  .get(controller.read)
  .put(controller.update)
  .delete(controller.destroy)
  .all(methodNotAllowed);

router 
  .route("/")
  .post(controller.create)
  .get(controller.list)
  .all(methodNotAllowed);

module.exports = router;