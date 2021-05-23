const Event = require("./../models/events.model");

function create(req, res, next) {
  Event.create({ ...req.body.data }, (err, newEvent) => {
    if (err) return next(err);
    res.status(201).json({ message: "new event created", newEvent })
  });
}

function list(req, res, next) {
  const conditions = {};
  if (req.query.category) {
    conditions.category = req.query.category;
  }
  Event.find(conditions, (err, events) => {
    if (err) return next();
    res.status(200).json({ events });
  });
}

function read(req, res, next) {
  const eventId = req.params.eventId;
  Event.findById(eventId, (err, event) => {
    if (!event) return next({
      status: 404,
      message: `Event id ${eventId} cannot be found`
    });
    if (err) return next();
    res.json({ event });
  });
}

function update(req, res, next) {
  Event.findByIdAndUpdate(req.params.eventId, { ...req.body.data }, (err, event) => {
    if (!event) return next({
      status: 404,
      message: `Event id ${req.params.eventId} cannot be found`
    });
    if (err) return next();
    event.save((err, savedEvent) => {
      if (err) return next({
        status: 400,
        message: err
      });
      res.json({ message: "Event successfaully updated" });
    });
  });
}

function destroy(req, res, next) {
  const eventId = req.params.eventId;
  Event.findByIdAndDelete(eventId, (err, event) => {
    if (!event) return next({
      status: 404,
      message: `Event id ${eventId} cannot be found`
    });
    if (err) return next();
    res.json({ message: `Event id ${eventId} successfully deleted` });
  });
}

module.exports = {
  create,
  list,
  read,
  update,
  destroy
}