const app = require("./app");
const { PORT = 4000 } = process.env;
const dbSetup = require("./database/setup");

dbSetup(); // setup mongoose and connect app to database
const listener = () => console.log(`Server is up and running on port ${PORT}!`);

app.listen(PORT, listener);