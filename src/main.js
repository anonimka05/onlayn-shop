const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const mongoDB = require("./mongo/mongo.js");
const routes = require("./routes/index.js");
const appConfig = require("./config/app.config.js");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", routes);

mongoDB().then(() => console.log("MongoDB connected"));

app.listen(appConfig.port, appConfig.host, () => {
  console.log(`Listening on ${appConfig.port}`);
  mongoDB;
});
