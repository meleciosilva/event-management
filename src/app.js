const express = require("express");
const app = express();

const authRouter = require("./routers/auth.router");
const eventsRouter = require("./routers/events.router");
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

app.use(express.json());

app.use("/auth", authRouter);
app.use("/events", eventsRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
