const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const app = express();
const moment = require("moment");

const logger = (req, res, next) => {
  console.log(
    `${req.protocol}://${req.get("host")}${
      req.originalUrl
    }: ${moment().format()}`
  );
  next();
};

//bodyParser

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

//handlebars

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// app.use(logger);

app.use("/api/members", require("./routes/api/members"));

//Static folder

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
