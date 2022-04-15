const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("morgan");

const bodyParser = require("body-parser");
const app = express();
const User = require("./src/routes/user");
const port = process.env.PORT || 3001;
app.use(logger("dev"));

require("./db");

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/user", User);




app.listen(port, function () {
  console.log("Runnning on " + port);
});


module.exports = app;