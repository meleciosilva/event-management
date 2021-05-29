const Event = require("./../models/events.model");
const axios = require("axios");

function create(req, res, next) {
  if (!req.body.data) return next({ status: 401, message: "Request must have 'data' property. Try Again." });
  const url = `https://imagegen.herokuapp.com/?category=${req.body.data.category}`;

  return axios.get(url)
    .then(result => result.data.image)
    .then(image => Event.create({ ...req.body.data, image }))
    .then(newEvent => res.status(201).json({ message: "New Event Created!", newEvent }))
    .catch(err => {
      console.log(err);
      return next({ status: 500, message: err.message });
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
  if (!req.body.data) return next({ status: 401, message: "Request must have 'data' property. Try Again." })
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
      res.json({ message: "Event successfaully updated", updatedEvent: {...req.body.data} });
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