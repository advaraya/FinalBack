"use strict";

const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var cors = require("cors");
/* jshint ignore:start */
const db = require("./lib/connectMongoose");
/* jshint ignore:end */

// Cargamos las definiciones de todos nuestros modelos
require("./models/Anuncio");
require("./models/Usuario");

const app = express();
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});

// view engine setup --> Esto lo tengo que cambiar no?
//app.set("views", path.join(__dirname, "views"));
//app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Setup i18n
const i18n = require("./lib/i18nConfigure")();
app.use(i18n.init);

// Global Template variables
app.locals.title = "Wallaclone";

// Web

//Hacer diponible el objeto de sesion en las visita
const jwtAuth = require("./lib/jwtAuth");
app.use("/", require("./routes/index"));
app.use("/change-locale", require("./routes/change-locale"));

// API v1
app.use("/api/anuncios", require("./routes/apiv1/anuncios"));
app.use("/api/usuarios", require("./routes/apiv1/usuarios"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  if (err.array) {
    // validation error
    err.status = 422;
    const errInfo = err.array({ onlyFirstError: true })[0];
    err.message = isAPI(req)
      ? { message: "not valid", errors: err.mapped() }
      : `not valid - ${errInfo.param} ${errInfo.msg}`;
  }

  // establezco el status a la respuesta
  err.status = err.status || 500;
  res.status(err.status);

  // si es un 500 lo pinto en el log
  if (err.status && err.status >= 500) console.error(err);

  // si es una petición al API respondo JSON...
  if (isAPI(req)) {
    res.json({ success: false, error: err.message });
    return;
  }

  // ...y si no respondo con HTML...

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.render("error");
});

function isAPI(req) {
  return req.originalUrl.indexOf("/api") === 0;
}

module.exports = app;
