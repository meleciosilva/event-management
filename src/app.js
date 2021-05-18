const express = require("express");
const app = express();

const eventsRouter = require("./events/events.router");
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

app.use(express.json());

app.use("/events", eventsRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
