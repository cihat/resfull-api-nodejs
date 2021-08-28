const createError = require("http-errors")
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
require("./bootstrap")
const uuid = require("uuid").v4
const session = require("express-session")

const indexRouter = require("./routes/index")
const usersRouter = require("./routes/users")
const subscribersRouter = require("./routes/subscribers")

const app = express()

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

// app.use("/", indexRouter)
app.use("/users", usersRouter)
app.use("/subscribers", subscribersRouter)

app.use(
  session({
    genid: (req) => {
      console.log("Inside the session middleware")
      console.log(req.sessionID)
      return uuid()
    },
    secret: "thisissupposedtobeasecret",
    resave: false,
    saveUninitialized: true,
  })
)

app.get("/", (req, res) => {
  console.log("Inside the homepage callback function")
  console.log(req.sessionID)
  res.send(`You hit home page!\n`)
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

module.exports = app
